import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Image from 'gatsby-image';
import Layout from '../components/Layout'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

class Philosophy extends React.Component {
  render() {
    const title = this.props.data.kontentItemPhilosophy.system.name
    const description = this.props.data.kontentItemPhilosophy.elements.meta_data__description.value
    const richTextElement = this.props.data.kontentItemPhilosophy.elements.introduction
    const works = this.props.data.kontentItemPhilosophy.elements.featured_work.value

    const worksBlock = (
      <div>
        <h2>Selected Papers (PDF)</h2>
        {works &&
          works.map(work => (
            <div key={work.id}>
              <h3><a href={work.elements.asset.value[0].url}>{work.elements.title.value}</a></h3>
              <p>{work.elements.summary.value}</p>
            </div>
          ))}
      </div>
    )

    return (
      <Layout>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <div className="content">
          <h1>{title}</h1>
          <RichTextElement
            value={richTextElement.value}
            images={richTextElement.images}
            resolveImage={image => {
              return (
                <Image key={`rt-assets-${image.image_id}`} fluid={image.fluid} />
              )
            }}
          />
        </div>
        <div className="sidebar">
          {worksBlock}
        </div>
      </Layout >
    )
  }
}

export default Philosophy

export const pageQuery = graphql`
  query PhilosophyQuery {
    kontentItemPhilosophy {
      system {
        name
      }
      elements {
        introduction {
          value
        }
        meta_data__description {
          value
        }
        meta_data__keywords {
          value
        }
        featured_work {
          value {
            ... on kontent_item_document {
              id
              elements {
                asset {
                  value {
                    url
                  }
                }
                summary {
                  value
                }
                title {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`
