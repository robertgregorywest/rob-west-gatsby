const path = require('path');

const slash = (filePath) => filePath.replace(/\\/g, '/');

/** @type {import('gatsby').GatsbyNode['createPages']} */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const articleTemplate = path.resolve('./src/templates/article-template.tsx');
  const journalTemplate = path.resolve('./src/templates/journal-template.tsx');
  const tagTemplate = path.resolve('./src/templates/tag-template.tsx');

  const result = await graphql(`
    query CreatePages {
      allArticles: allKontentItemArticle(
        sort: { elements: { publish_date: { value: DESC } } }
      ) {
        nodes {
          elements {
            article_url_slug {
              value
            }
          }
        }
        totalCount
      }
      allTags: allKontentItemArticle {
        group(
          field: {
            elements: { article_topics: { value: { codename: SELECT } } }
          }
        ) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild('Error loading articles from Kontent', result.errors);
    return;
  }

  result.data.allArticles.nodes.forEach((node) => {
    const slug = node.elements?.article_url_slug?.value;
    if (!slug) {
      return;
    }
    createPage({
      path: `/articles/${slug}/`,
      component: slash(articleTemplate),
      context: { slug },
    });
  });

  const postsPerPage = 8;

  const numArticlePages = Math.ceil(
    result.data.allArticles.totalCount / postsPerPage
  );

  for (let i = 0; i < numArticlePages; i += 1) {
    createPage({
      path: i === 0 ? '/articles' : `/articles/page/${i}`,
      component: slash(journalTemplate),
      context: {
        currentPage: i,
        limit: postsPerPage,
        skip: i * postsPerPage,
        prevPagePath: i <= 1 ? '/articles' : `/articles/page/${i - 1}`,
        nextPagePath: `/articles/page/${i + 1}`,
        hasPrevPage: i !== 0,
        hasNextPage: i !== numArticlePages - 1,
      },
    });
  }

  result.data.allTags.group.forEach((tag) => {
    if (tag.fieldValue === null) {
      return;
    }
    const numTagPages = Math.ceil(tag.totalCount / postsPerPage);
    const tagSlug = `/tag/${tag.fieldValue}`;

    for (let i = 0; i < numTagPages; i += 1) {
      createPage({
        path: i === 0 ? tagSlug : `${tagSlug}/page/${i}`,
        component: slash(tagTemplate),
        context: {
          codename: tag.fieldValue,
          currentPage: i,
          limit: postsPerPage,
          skip: i * postsPerPage,
          prevPagePath: i <= 1 ? tagSlug : `${tagSlug}/page/${i - 1}`,
          nextPagePath: `${tagSlug}/page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numTagPages - 1,
        },
      });
    }
  });
};
