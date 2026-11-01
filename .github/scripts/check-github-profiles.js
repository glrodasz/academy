// Warns when the Semana 1 gallery list and the student folders drift apart.
// Usage: node check-github-profiles.js <path to exercises/semana-1/github-profiles>
const fs = require("fs");
const path = require("path");

const dir = process.argv[2];
const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
const start = html.indexOf("const profiles = [");
const block = html.slice(start, html.indexOf("];", start));
const listed = new Set([...block.matchAll(/^\s*\["([^"]+)",/gm)].map(m => m[1]));

const folders = fs.readdirSync(dir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

const problems = [
  ...folders.filter(f => !listed.has(f)).map(f => `"${f}" has a folder but is missing from the gallery list`),
  ...[...listed].filter(f => !folders.includes(f)).map(f => `"${f}" is in the gallery list but has no folder`),
  ...folders.filter(f => !fs.existsSync(path.join(dir, f, "index.html"))).map(f => `"${f}" has no index.html`),
];

problems.forEach(p => console.log(`::warning title=GitHub profiles gallery::${p}`));
console.log(`${listed.size} listed, ${folders.length} folders, ${problems.length} warnings`);
