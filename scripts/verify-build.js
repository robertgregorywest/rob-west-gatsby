/**
 * Checks that `public/` contains the article, journal and tag pages the
 * Kontent content calls for. If `createPages` in gatsby-node.js silently does
 * nothing (see AGENTS.md), the build still succeeds but those pages are
 * missing. The expected article count comes straight from the Kontent Delivery
 * API, independent of gatsby-node.js.
 *
 * Run after `npm run build`.
 */
const fs = require('fs');
const path = require('path');

require('dotenv').config({ quiet: true });

// Keep in sync with `postsPerPage` in gatsby-node.js.
const POSTS_PER_PAGE = 8;

const publicDir = path.join(__dirname, '..', 'public');
const previewEnabled =
  process.env.KONTENT_PREVIEW_ENABLED?.toLowerCase() === 'true';

const subdirectories = (dir) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : [];

const hasPage = (dir) => fs.existsSync(path.join(dir, 'index.html'));

const fetchArticleCount = async () => {
  const host = previewEnabled
    ? 'https://preview-deliver.kontent.ai'
    : 'https://deliver.kontent.ai';
  const languages = (process.env.KONTENT_LANGUAGE_CODENAMES ?? '')
    .split(',')
    .map((lang) => lang.trim())
    .filter(Boolean);
  const url = new URL(`${host}/${process.env.KONTENT_PROJECT_ID}/items`);
  url.searchParams.set('system.type', 'article');
  url.searchParams.set('language', languages[0]);
  url.searchParams.set('depth', '0');
  url.searchParams.set('limit', '1');
  url.searchParams.set('includeTotalCount', 'true');
  const response = await fetch(url, {
    headers: previewEnabled
      ? { Authorization: `Bearer ${process.env.KONTENT_PREVIEW_KEY}` }
      : {},
  });
  if (!response.ok) {
    throw new Error(
      `Kontent returned ${response.status} for the article count`
    );
  }
  const { pagination } = await response.json();
  return pagination.total_count;
};

const main = async () => {
  const expectedArticles = await fetchArticleCount();
  const expectedJournalPages = Math.ceil(expectedArticles / POSTS_PER_PAGE);

  const articlesDir = path.join(publicDir, 'articles');
  const articles = subdirectories(articlesDir).filter(
    (name) => name !== 'page' && hasPage(path.join(articlesDir, name))
  );
  // /articles is page 0; /articles/page/N covers the rest.
  const journalPages =
    (hasPage(articlesDir) ? 1 : 0) +
    subdirectories(path.join(articlesDir, 'page')).filter((name) =>
      hasPage(path.join(articlesDir, 'page', name))
    ).length;
  const tagsDir = path.join(publicDir, 'tag');
  const tags = subdirectories(tagsDir).filter(
    (name) => name !== 'page' && hasPage(path.join(tagsDir, name))
  );

  const failures = [];
  if (expectedArticles === 0) {
    failures.push('Kontent returned no articles, so there is nothing to check');
  }
  if (articles.length !== expectedArticles) {
    failures.push(
      `article pages: expected ${expectedArticles}, found ${articles.length}`
    );
  }
  if (journalPages !== expectedJournalPages) {
    failures.push(
      `journal pages: expected ${expectedJournalPages}, found ${journalPages}`
    );
  }
  if (tags.length === 0) {
    failures.push('tag pages: expected at least one, found none');
  }

  console.log(
    `articles ${articles.length}/${expectedArticles}, ` +
      `journal pages ${journalPages}/${expectedJournalPages}, ` +
      `tag pages ${tags.length}`
  );
  if (failures.length > 0) {
    failures.forEach((failure) => console.error(`FAIL ${failure}`));
    process.exit(1);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
