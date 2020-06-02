import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Image from 'gatsby-image';
import Layout from '../components/Layout'
import { RichTextElement } from '@kentico/gatsby-kontent-components'
import LinkedItem from '../components/LinkedItem';

const ArticleTemplate = ({ data }) => {
  const title = data.kontentItemArticle.elements.title.value
  const description = data.kontentItemArticle.elements.meta_data__description.value
  const richTextElement = data.kontentItemArticle.elements.body

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <h1>{title}</h1>
      <RichTextElement
        value={richTextElement.value}
        images={richTextElement.images}
        linkedItems={richTextElement.modular_content}

        resolveImage={image => {
          return (
            <Image key={`rt-assets-${image.image_id}`} fluid={image.fluid} />
          )
        }}

        resolveLinkedItem={linkedItem => {
          return (
            <LinkedItem linkedItem={linkedItem} />
          )
        }}
      />
    </Layout >
  )
}

export default ArticleTemplate

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    kontentItemArticle(elements: {article_url_slug: {value: {eq: $slug}}}) {
      elements {
        title {
          value
        }
        article_url_slug {
          value
        }
        article_topics {
          value {
            name
            codename
          }
        }
        body {
          value
          modular_content {
            ... on kontent_item_blockquote {
              id
              elements {
                text {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_code_block {
              id
              elements {
                class {
                  value
                }
                code {
                  value
                }
              }
              system {
                codename
                type
              }
            }
          }
          images {
            image_id
            fluid(maxWidth: 1000) {
                ...KontentAssetFluid
            }
          }
        }
        publish_date {
          value
        }
        meta_data__keywords {
          value
        }
        meta_data__description {
          value
        }
      }
    }
  }
`
