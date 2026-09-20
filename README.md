# Rob West's Personal Website

[Personal website](https://robwest.info) built using Kontent and Gatsby.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e45b41a6-9bf1-4096-814f-c5904995bb8c/deploy-status)](https://app.netlify.com/sites/rob-west/deploys)

- **Framework:** [Gatsby 5](https://www.gatsbyjs.com/) with React 19, TypeScript and Sass
- **Content:** [Kontent.ai](https://kontent.ai/) headless CMS, via `@kontent-ai/gatsby-source`
- **Hosting:** [Netlify](https://app.netlify.com/sites/rob-west), deployed from `main`
- **Package manager:** npm (the project moved off Yarn Classic in 2026; don't reintroduce a `yarn.lock`)

## Prerequisites

- **Node 24 (LTS).** The version is pinned in [`.node-version`](.node-version), which Netlify also reads. Gatsby 5.16 declares support for Node `<26`, so newer versions print engine warnings.
- **npm 11**, which ships with Node 24.

The easiest way to get the right Node version is [fnm](https://github.com/Schniz/fnm):

```sh
brew install fnm
echo 'eval "$(fnm env --use-on-cd --version-file-strategy=recursive --shell zsh)"' >> ~/.zshrc
# open a new terminal, then in the project folder:
fnm install
```

With `--use-on-cd`, fnm switches to the project's Node version whenever you `cd` into the folder.

## Getting started

```sh
npm ci
npm run develop
```

The site runs at <http://localhost:8000>, with the GraphiQL explorer at <http://localhost:8000/___graphql>.

`npm ci` installs exactly what's in `package-lock.json`. Use `npm install <package>` only when adding or changing dependencies.

### Environment variables

Installing runs the `prepare` script, which copies `.env.template` to `.env` if `.env` doesn't already exist. `.env` is git-ignored.

| Variable | Purpose |
|---|---|
| `KONTENT_PROJECT_ID` | Kontent.ai project (environment) ID. |
| `KONTENT_LANGUAGE_CODENAMES` | Comma-separated language codenames to source. |
| `KONTENT_PREVIEW_ENABLED` | `true` to source unpublished content from the Preview API. |
| `KONTENT_PREVIEW_KEY` | Preview API key. Required when preview is enabled; never commit it. |

The `KONTENT_PROJECT_ID` in `.env.template` is a placeholder that Kontent returns a 404 for, so set `KONTENT_PROJECT_ID` and `KONTENT_LANGUAGE_CODENAMES` in `.env` to the site's real values before building. Only add the preview variables to preview drafts.

## Scripts

| Command | What it does |
|---|---|
| `npm run develop` | Start the Gatsby dev server with hot reloading. |
| `npm run build` | Production build into `public/`. |
| `npx gatsby serve` | Serve the production build locally at <http://localhost:9000>. |
| `npm run clean` | Delete Gatsby's `.cache/` and `public/`. Try this first when a build behaves strangely. |
| `npm run check` | Typecheck, lint and format check in one go. CI runs the same command. |
| `npm test` | Unit tests, then the end-to-end smoke tests. Build first (`npm run build`). |
| `npm run test:unit` | Vitest unit tests (`src/**/*.test.ts(x)`). No build needed. |
| `npm run test:e2e` | Playwright smoke tests against the production build, on desktop and mobile viewports. Serves `public/` itself; run `npm run build` first. |
| `npm run verify:build` | After a build, check `public/` has every article, journal and tag page Kontent calls for. |
| `npm run typecheck` | Type-check the project with `tsc --noEmit`. Needs `src/gatsby-types.d.ts`, so run `develop` or `build` once on a fresh checkout. |
| `npm run lint` | ESLint (flat config in `eslint.config.js`) over all `.js`, `.ts` and `.tsx` files. |
| `npm run format` | Prettier-format the config files and `src/`. |
| `npm run format:check` | Check formatting without writing changes. |

Type checking and linting don't run inside `develop` or `build`; run `npm run check` (or its parts) separately. A pre-commit hook (husky and lint-staged) runs ESLint and Prettier on staged files, and CI on GitHub Actions runs the build, `verify:build`, `check`, the unit tests and the smoke tests on every pull request.

`src/gatsby-types.d.ts` holds the types generated from the site's GraphQL queries (the `Queries` namespace). Gatsby writes it on `develop` and `build` (`graphqlTypegen` in `gatsby-config.js`), and it's git-ignored.

## Project structure

```
gatsby-config.js    Plugins, Kontent source, Sass/PostCSS setup, site metadata
gatsby-node.js      Creates article, paginated article list and tag pages from Kontent data
gatsby-ssr.tsx      Injects the theme script before the body to avoid a flash of the wrong theme
src/pages/          Static pages (home, about, philosophy, 404)
src/templates/      Article, article list ("journal") and tag page templates
src/components/     React components, most with a co-located style.scss
src/tools/          Helpers for parsing Kontent article data and rich text
src/types/          Ambient declarations for Sass, image and untyped modules
src/assets/         Icons and global Sass
scripts/copy-env.js Copies .env.template to .env on install
scripts/verify-build.js Checks public/ has every article, journal and tag page after a build
e2e/                Playwright smoke tests (unit tests live next to the code as *.test.ts(x))
netlify.toml        Netlify build command and security headers
```

## Deployment

Netlify builds and deploys automatically:

- **Pushes to `main`** deploy to production at <https://robwest.info>.
- **Pull requests** get a deploy preview at `https://deploy-preview-<PR number>--rob-west.netlify.app`. It's linked from the PR checks and is the best way to test dependency changes before merging.

Build settings live in [`netlify.toml`](netlify.toml), which overrides the Netlify UI, so changes to them go through a pull request and show up in its deploy preview. Other things to be aware of:

- **Build command:** `npm run build && npm run verify:build`. The second half fails the deploy if the build produced no article, journal or tag pages (see the `gatsby-node.js` note in AGENTS.md), instead of publishing a site without them. Netlify detects npm from `package-lock.json` and installs dependencies first.
- **Node version:** taken from `.node-version`. Without it, Netlify falls back to the version pinned when the site was first built.
- **Environment variables:** the `KONTENT_*` variables above must be set in the Netlify site settings, because `.env` isn't committed. `verify:build` reads them too.
- **Build cache:** if a deploy fails after a dependency or Node change, use **Deploys → Trigger deploy → Clear cache and deploy site**.
- **Merging:** `main` is protected and the `check` CI job must pass before a pull request can merge, because Netlify deploys whatever lands on `main`.

Publishing content in Kontent.ai doesn't change the repo, so new or edited articles only go live on the next Netlify build.

## Dependency notes

- **Security pins.** The `overrides` block in `package.json` forces transitive dependencies to patched versions that Gatsby hasn't picked up yet. Nested entries (for example `"postcss-modules-scope": { "postcss-selector-parser": ... }`) only apply beneath that package. When Gatsby updates a dependency past a pin, remove the pin.
- **Checking pins.** After changing overrides, run `npm ls <package>` to confirm the resolved versions, then `npm audit`. `npm ls` can print spurious `invalid` warnings for versions that satisfy their range; that's a known npm quirk when overrides are in use.
- **Install scripts.** npm 11 blocks dependency install scripts by default. `allowScripts` in `package.json` records them as denied: the native modules (`lmdb`, `msgpackr-extract`, `@parcel/watcher`) use prebuilt binaries, and the rest only print banners or warm caches. If a newly added package needs its install script, run `npm install-scripts approve <package>`.
- **ESLint 9.** ESLint is held at 9 because `eslint-plugin-jsx-a11y` doesn't yet declare support for ESLint 10. Gatsby bundles its own older ESLint for its internal use, which is separate from the one used by `npm run lint`.
- **Accepted alerts.** Dependabot alerts for `file-type` and `@parcel/reporter-dev-server` are dismissed. Gatsby 5 can't take the fixed versions, and neither vulnerable path is used when building a static site.
