# Agent instructions

Personal website ([robwest.info](https://robwest.info)) built with Gatsby 5, React 19 and Sass, sourcing content from Kontent.ai. See [README.md](README.md) for setup, scripts and project structure.

## Ground rules

- Use npm. Don't reintroduce a `yarn.lock`.
- After changing code, run `npm run lint` and `npm run format:check`. Neither runs as part of `develop` or `build`.
- `.env` holds Kontent credentials and is git-ignored. Never commit it or print its contents.
- There is no automated test suite (`npm test` is a placeholder). Verify UI work in a real browser, as described below.

## Testing UI changes

Any change that affects what the site renders or how it behaves (components, templates, pages, styles, `gatsby-*.js`, or dependency upgrades such as React, Gatsby or plugins) must be checked in a browser with `playwright-cli` before you call it done. Passing lint and a successful build aren't enough: hydration errors and runtime problems only show up in the browser.

Follow the [playwright-cli skill](.agents/skills/playwright-cli/SKILL.md) for the command reference.

`playwright-cli` is installed globally, not as a project dependency. If it fails with `Executable doesn't exist`, its browser build hasn't been downloaded. Install it once with the CLI's own bundled Playwright, so the version matches:

```sh
node "$(npm root -g)/@playwright/cli/node_modules/playwright-core/cli.js" install chromium chromium-headless-shell
```

### Workflow

1. Build and serve the **production build**. It's what ships, and hydration problems show up there and not in `develop`.

   ```sh
   npm run build
   npx gatsby serve -p 9000 &   # http://localhost:9000
   ```

   Use `npm run develop` (http://localhost:8000) only when you need hot reloading while iterating.

2. Drive the site with `playwright-cli`:

   ```sh
   playwright-cli open http://localhost:9000/
   playwright-cli console          # expect: Errors: 0, Warnings: 0
   playwright-cli snapshot         # inspect structure; use refs (e5) to interact
   playwright-cli screenshot --filename=/tmp/home.png
   ```

3. Check the pages your change touches, plus the basics:

   | Page | URL |
   |---|---|
   | Home | `/` |
   | Article list, paginated | `/articles/`, `/articles/page/1` |
   | An article, ideally one with code blocks | `/articles/<slug>/` |
   | A tag page | `/tag/<codename>/` |
   | Static pages | `/about/`, `/philosophy/` |

   For each page, read `playwright-cli console` and confirm there are **no errors or warnings**. A missing page (`/nonexistent/`) legitimately logs 404 network errors; nothing else should.

4. Exercise behaviour, not just load:
   - **Theme toggle:** click the "Activate dark mode" button. `document.body.className` should become `dark-theme` and `localStorage` `theme` should be `dark`, and both should survive `playwright-cli reload`.
   - **Code blocks:** highlight.js spans (`pre code [class*=hljs-]`) are present on articles with code.
   - **Kontent rich text:** paragraphs, headings and lists render, and no images are broken (`[...document.images].filter(i => i.complete && i.naturalWidth === 0)` is empty).
   - **Layout:** for CSS or layout changes, take screenshots at desktop and mobile widths (`playwright-cli resize 1280 800`, `playwright-cli open --mobile`) and look at them.

5. Clean up when finished:

   ```sh
   playwright-cli close
   pkill -f "gatsby serve"
   ```

### Reporting

When you finish a UI-affecting task, say which pages you checked and what you observed (console clean, behaviour confirmed), and say what you did **not** check, for example if you only tested the production build and not `gatsby develop`. For visual changes, attach a screenshot to the PR (see the skill's PR attachments section).

## Skills

Project skills live in `.claude/skills/` and are symlinked into `.agents/skills/` so other agents can discover them. Add new skills under `.claude/skills/<name>/` and add a matching symlink:

```sh
ln -s ../../.claude/skills/<name> .agents/skills/<name>
```
