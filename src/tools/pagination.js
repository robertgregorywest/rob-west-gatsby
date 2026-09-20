/**
 * Numbering scheme for paginated listings (journal, tags): which pages exist,
 * where they live, and how each one is titled and canonicalised.
 *
 * Plain CommonJS so `gatsby-node.js` can require it (Gatsby doesn't compile a
 * `.ts` gatsby-node reliably on Netlify) while the templates import it through
 * `pagination.d.ts`. Page numbers are zero-based; page 0 lives at `basePath`.
 */

/** @param {string} basePath @param {number} page */
const pagePath = (basePath, page) =>
  page === 0 ? basePath : `${basePath}/page/${page}`;

/**
 * One entry per page needed to list `totalCount` items, ready for `createPage`.
 *
 * @param {string} basePath e.g. `/articles` or `/tag/dotnet`
 * @param {number} totalCount
 * @param {number} perPage
 */
const paginate = (basePath, totalCount, perPage) => {
  const numPages = Math.ceil(totalCount / perPage);
  return Array.from({ length: numPages }, (_, i) => {
    return {
      path: pagePath(basePath, i),
      context: {
        basePath,
        currentPage: i,
        limit: perPage,
        skip: i * perPage,
        prevPagePath: pagePath(basePath, Math.max(i - 1, 0)),
        nextPagePath: pagePath(basePath, i + 1),
        hasPrevPage: i !== 0,
        hasNextPage: i !== numPages - 1,
      },
    };
  });
};

/** "Journal" on page 0, "Journal - Page 2" on the page after. */
const pageTitle = (title, currentPage) =>
  currentPage > 0 ? `${title} - Page ${currentPage + 1}` : title;

/** @param {string | null | undefined} siteUrl @param {string} basePath @param {number} currentPage */
const canonicalUrl = (siteUrl, basePath, currentPage) =>
  `${(siteUrl ?? '').replace(/\/$/, '')}${pagePath(basePath, currentPage)}/`;

module.exports = { paginate, pageTitle, canonicalUrl };
