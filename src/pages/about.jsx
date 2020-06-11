import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { RichTextElement } from '@kentico/gatsby-kontent-components';
import Layout from '../components/Layout';

class About extends React.Component {
  render() {
    const {
      data: {
        kontentItemSection: {
          system: { name: title },
          elements: {
            meta_data__description: { value: description },
            introduction: richTextElement,
          },
        },
      },
    } = this.props;

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
          resolveImage={image => (
            <figure>
              <Image
                key={`rt-assets-${image.image_id}`}
                fluid={image.fluid}
                title={image.description}
                alt={image.description}
              />
              <figcaption>{image.description}</figcaption>
            </figure>
          )}
        />
      </Layout>
    );
  }
}

export default About;

export const pageQuery = graphql`
  query AboutQuery {
    kontentItemSection(system: { codename: { eq: "about_me" } }) {
      elements {
        introduction {
          value
          images {
            image_id
            fluid(maxWidth: 1000) {
              ...KontentAssetFluid
            }
            description
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
`;
