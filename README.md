# Rob West's Personal Website

[Personal website](https://robwest.info) built using Kontent and Gatsby.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e45b41a6-9bf1-4096-814f-c5904995bb8c/deploy-status)](https://app.netlify.com/sites/rob-west/deploys)

- **Framework:** [Gatsby 5](https://www.gatsbyjs.com/) with React 18 and Sass
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

The published-content defaults in `.env.template` work as they are, so you only need to edit `.env` to preview drafts.

## Scripts

| Command | What it does |
|---|---|
| `npm run develop` | Start the Gatsby dev server with hot reloading. |
| `npm run build` | Production build into `public/`. |
| `npx gatsby serve` | Serve the production build locally at <http://localhost:9000>. |
| `npm run clean` | Delete Gatsby's `.cache/` and `public/`. Try this first when a build behaves strangely. |
| `npm run lint` | ESLint (Airbnb config + Prettier) over all `.js`/`.jsx` files. |
| `npm run format` | Prettier-format the config files and `src/`. |

ESLint also runs during `develop` and `build` via `gatsby-plugin-eslint`.

## Project structure

```
gatsby-config.js    Plugins, Kontent source, Sass/PostCSS setup, site metadata
gatsby-node.js      Creates article, paginated article list and tag pages from Kontent data
src/pages/          Static pages (home, about, philosophy, 404)
src/templates/      Article, article list ("journal") and tag page templates
src/components/     React components, most with a co-located style.scss
src/assets/         Icons and global Sass
scripts/ncp.js      Copies .env.template to .env on install
```

## Deployment

Netlify builds and deploys automatically:

- **Pushes to `main`** deploy to production at <https://robwest.info>.
- **Pull requests** get a deploy preview at `https://deploy-preview-<PR number>--rob-west.netlify.app`. It's linked from the PR checks and is the best way to test dependency changes before merging.

Netlify settings to be aware of:

- **Build command:** `gatsby build`. Netlify detects npm from `package-lock.json` and installs dependencies first.
- **Node version:** taken from `.node-version`. Without it, Netlify falls back to the version pinned when the site was first built.
- **Environment variables:** the `KONTENT_*` variables above must be set in the Netlify site settings, because `.env` isn't committed.
- **Build cache:** if a deploy fails after a dependency or Node change, use **Deploys → Trigger deploy → Clear cache and deploy site**.

Publishing content in Kontent.ai doesn't change the repo, so new or edited articles only go live on the next Netlify build.

## Dependency notes

- **Security pins.** The `overrides` block in `package.json` forces transitive dependencies to patched versions that Gatsby hasn't picked up yet. Nested entries (for example `"postcss-modules-scope": { "postcss-selector-parser": ... }`) only apply beneath that package. When Gatsby updates a dependency past a pin, remove the pin.
- **Checking pins.** After changing overrides, run `npm ls <package>` to confirm the resolved versions, then `npm audit`. `npm ls` can print spurious `invalid` warnings for versions that satisfy their range; that's a known npm quirk when overrides are in use.
- **Install scripts.** npm 11 blocks dependency install scripts by default. `allowScripts` in `package.json` records them as denied: the native modules (`lmdb`, `msgpackr-extract`, `@parcel/watcher`) use prebuilt binaries, and the rest only print banners or warm caches. If a newly added package needs its install script, run `npm install-scripts approve <package>`.
- **ESLint 7.** The lint toolchain is pinned to ESLint 7. `eslint-webpack-plugin` is held at `^2.7.0` so it matches `gatsby-plugin-eslint`'s peer dependency without needing `legacy-peer-deps`.
- **Accepted alerts.** Dependabot alerts for `file-type` and `@parcel/reporter-dev-server` are dismissed. Gatsby 5 can't take the fixed versions, and neither vulnerable path is used when building a static site.
