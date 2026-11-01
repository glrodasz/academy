// Rewrites root-absolute URLs ("/main.css") in the published copy of each
// student site so they resolve inside that student's folder.
//
// Students built their sites with the folder as the server root (Live Server),
// but on GitHub Pages every site lives under
// /academy/semana-1/github-profiles/<student>/, so "/main.css" points at
// https://glrodasz.github.io/main.css. This runs on the _site copy at publish
// time; student files in the repo stay untouched (see AGENTS.md).
//
// Usage: node fix-root-paths.js <gallery dir in _site>
const fs = require("fs");
const path = require("path");

const galleryDir = path.resolve(process.argv[2]);

const ATTR_RE = /(\s(?:href|src|action|poster|data)\s*=\s*)(["'])(\/(?!\/)[^"']*)\2/gi;
const SRCSET_RE = /(\ssrcset\s*=\s*)(["'])([^"']*)\2/gi;
const CSS_URL_RE = /(url\(\s*)(["']?)(\/(?!\/)[^"')]*)\2(\s*\))/gi;
const CSS_IMPORT_RE = /(@import\s+)(["'])(\/(?!\/)[^"']*)\2/gi;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function existsUnder(root, urlPath) {
  const clean = urlPath.split(/[?#]/)[0];
  let decoded = clean;
  try { decoded = decodeURIComponent(clean); } catch {}
  const target = path.join(root, decoded);
  return target.startsWith(root) && fs.existsSync(target);
}

// Maps a root-absolute URL to one relative to the file that contains it.
function rewrite(url, fileDir, studentDir, studentName) {
  let root = studentDir;
  let rest = url.slice(1);

  // "/<student>/styles.css": written as if the gallery folder were the root.
  const [first, ...others] = rest.split("/");
  let firstDecoded = first;
  try { firstDecoded = decodeURIComponent(first); } catch {}
  if (!existsUnder(studentDir, rest) && firstDecoded === studentName && existsUnder(studentDir, others.join("/"))) {
    rest = others.join("/");
  } else if (!existsUnder(studentDir, rest) && existsUnder(galleryDir, rest)) {
    root = galleryDir;
  }

  const rel = path.relative(fileDir, root).split(path.sep).join("/");
  return (rel ? `${rel}/` : "./") + rest;
}

let filesChanged = 0;
let urlsChanged = 0;

const students = fs.readdirSync(galleryDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

for (const studentName of students) {
  const studentDir = path.join(galleryDir, studentName);
  for (const file of walk(studentDir)) {
    const ext = path.extname(file).toLowerCase();
    if (![".html", ".htm", ".css"].includes(ext)) continue;

    const fileDir = path.dirname(file);
    const fix = url => { urlsChanged++; return rewrite(url, fileDir, studentDir, studentName); };
    const original = fs.readFileSync(file, "utf8");
    let text = original
      .replace(CSS_URL_RE, (m, pre, q, url, post) => pre + q + fix(url) + q + post)
      .replace(CSS_IMPORT_RE, (m, pre, q, url) => pre + q + fix(url) + q);

    if (ext !== ".css") {
      text = text
        .replace(ATTR_RE, (m, pre, q, url) => pre + q + fix(url) + q)
        .replace(SRCSET_RE, (m, pre, q, list) => pre + q + list.replace(/(^|,)(\s*)(\/(?!\/)\S*)/g,
          (c, sep, space, url) => sep + space + fix(url)) + q);
    }

    if (text !== original) {
      fs.writeFileSync(file, text);
      filesChanged++;
    }
  }
}

console.log(`Rewrote ${urlsChanged} root-absolute URLs in ${filesChanged} files`);
