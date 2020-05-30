import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Image from 'gatsby-image';
import Layout from '../components/Layout'
import { RichTextElement } from '@kentico/gatsby-kontent-components'

class Philosophy extends React.Component {
  render() {
    const title = this.props.data.kontentItemSection.system.name
    const description = this.props.data.kontentItemSection.elements.meta_data__description.value
    const richTextElement = this.props.data.kontentItemSection.elements.introduction

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
          resolveImage={image => {
            return (
              <Image key={`rt-assets-${image.image_id}`} fluid={image.fluid} />
            )
          }}
        />
      </Layout >
    )
  }
}

export default Philosophy

export const pageQuery = graphql`
  query PhilosophyQuery {
    kontentItemSection(system: {codename: {eq: "about_me"}}) {
        elements {
            introduction {
                value
                images {
                    image_id
                    fluid(maxWidth: 1000) {
                        ...KontentAssetFluid
                    }
                }
                links {
                    codename
                    link_id
                    type
                    url_slug
                }
            }
            meta_data__description {
                value
            }
            meta_data__keywords {
                value
            }
        }
        system {
            name
        }
    }
  }
`
