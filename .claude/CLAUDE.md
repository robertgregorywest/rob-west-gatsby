# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

yarn develop     # Dev server at localhost:8000 (GraphQL: localhost:8000/___graphql)
yarn build       # Production build
yarn clean       # Clear .cache and public/
yarn lint        # ESLint with cache
yarn format      # Prettier on src/
yarn deploy      # Build + gh-pages deploy

## Environment Setup

Copy `.env.template` to `.env` (auto-copied on `yarn install`). Required:
- KONTENT_PROJECT_ID: Kontent AI project ID
- KONTENT_LANGUAGE_CODENAMES: e.g., "en-US"

## Architecture

**Stack**: Gatsby 5, React 18, Kontent AI headless CMS

**Page Generation** (gatsby-node.js):
- Articles from Kontent → `article-template.jsx`
- Journal pages (paginated, 8/page) → `journal-template.jsx`
- Tags (paginated) → `tag-template.jsx`

**Key Directories**:
- `src/components/` - React components (Layout wrapper, ThemeToggle, etc.)
- `src/pages/` - Static pages (index, about, 404)
- `src/templates/` - Dynamic page templates

**Styling**: Sass + PostCSS plugins (lost grid, postcss-pxtorem)

**Dark Mode**: Theme persisted via localStorage, injected in gatsby-ssr.js

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.
