const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const articleTemplate = path.resolve('./src/templates/article-template.jsx')

    graphql(`
    {
      allKontentItemArticle(filter: {preferred_language: {eq: "en-GB"}}) {
        nodes {
          elements {
            article_url_slug {
              value
            }
          }
        }
      }
    }
    `).then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      _.each(result.data.allKontentItemArticle.nodes, node => {
        createPage({
          path: `/articles/${node.elements.article_url_slug.value}/`,
          component: slash(articleTemplate),
          context: { slug: `${node.elements.article_url_slug.value}` },
        })
      })

      resolve()
    })
  })
}
