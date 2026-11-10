# Agent instructions

## Student work is read-only

Everything students submitted under `exercises/` is their original work and must be preserved as written. This covers each student's folder, for example:

- `exercises/semana-1/github-profiles/<student>/`
- `exercises/semana-*/student-cvs/<student>/`, `student-blogs/<student>/`, `student-forms/<student>/`
- any other per-student folder in `exercises/semana-*/` (`react-blogs`, `nextjs`, `express`, `databases`, …)

**Do not** refactor, reformat, restyle, rename, lint-fix, translate, "improve" or delete student code or content, even when it has bugs, typos or bad practices.

### Allowed exceptions

Change student files only for one of these reasons, and keep the change to the minimum needed:

1. **Really broken** — the site does not load at all, or its images do not load (e.g. a wrong path or case-sensitive filename). Fix only the broken reference, not the surrounding code.
2. **Security patches** — dependency bumps for known vulnerabilities. Prefer an override in the root `package.json` (see *Dependencies* below) over editing a student's `package.json`. No unrelated upgrades.
3. **Media optimization** — compress images and other media to reduce repo and page weight. Keep the same filename, format and visible result; if a format change is unavoidable, update only the references to that file.

In the commit message, say which exception applies.

### Dependencies

Every project under `exercises/` and `content/` belongs to one pnpm workspace (`pnpm-workspace.yaml` at the root) and shares one root `pnpm-lock.yaml`. Student folders do **not** keep their own lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`); if a new submission brings one, delete it and run `pnpm install --lockfile-only` at the root. `website/` is outside the workspace and keeps its own `package-lock.json`.

To patch a vulnerability for all projects at once:

1. Add an entry to `pnpm.overrides` in the root `package.json`, staying within the same major version when possible, e.g. `"vite@>=4 <4.5.14": "^4.5.14"`.
2. Run `pnpm install --lockfile-only` and check with `pnpm audit`.
3. Commit `package.json` and `pnpm-lock.yaml` only; student `package.json` files stay untouched.

To run one project: `pnpm install --filter ./exercises/semana-4/student-cvs/<student>`, then use its scripts from its folder.

### Not student work

Maintainer files in `exercises/` may be edited normally: the shared index/gallery pages (e.g. `exercises/semana-1/github-profiles/index.html`), week `README.md` files, tests, cleanup scripts, workflows and config.
