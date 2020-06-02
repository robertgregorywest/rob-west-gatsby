const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const articleTemplate = path.resolve('./src/templates/article-template.jsx')
    const journalTemplate = path.resolve('./src/templates/journal-template.jsx')
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx')

    graphql(`
    {
      allArticles: allKontentItemArticle(sort: {fields: elements___publish_date___value, order: DESC}) {
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
        group(field: elements___article_topics___value___codename) {
          totalCount
          fieldValue
        }
      }
    }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      _.each(result.data.allArticles.nodes, node => {
        createPage({
          path: `/articles/${node.elements.article_url_slug.value}/`,
          component: slash(articleTemplate),
          context: { slug: `${node.elements.article_url_slug.value}` },
        })
      })

      const postsPerPage = 8
      const numPages = Math.ceil(result.data.allArticles.totalCount / postsPerPage)

      for (let i = 0; i < numPages; i += 1) {
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
            hasNextPage: i !== numPages - 1
          }
        });
      }

      _.each(result.data.allTags.group, (tag) => {
        const numPages = Math.ceil(tag.totalCount / postsPerPage);
        const tagSlug = `/tag/${tag.fieldValue}`;

        for (let i = 0; i < numPages; i += 1) {
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
              hasNextPage: i !== numPages - 1
            }
          });
        }
      })

      resolve()
    })
  })
}
