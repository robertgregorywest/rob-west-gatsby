const path = require('path');
const slash = require('slash');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const articleTemplate = path.resolve('./src/templates/article-template.jsx');
  const journalTemplate = path.resolve('./src/templates/journal-template.jsx');
  const tagTemplate = path.resolve('./src/templates/tag-template.jsx');

  const result = await graphql(`
    {
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

  if (result.errors) {
    reporter.panicOnBuild('Error loading articles from Kontent', result.errors);
    return;
  }

  result.data.allArticles.nodes.forEach((node) => {
    createPage({
      path: `/articles/${node.elements.article_url_slug.value}/`,
      component: slash(articleTemplate),
      context: { slug: `${node.elements.article_url_slug.value}` },
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
