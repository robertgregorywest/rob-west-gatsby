import React from 'react';
import { graphql } from 'gatsby';
import { RichTextElement, ImageElement } from '@kontent-ai/gatsby-components';
import Layout from '../components/Layout';
import SEOHead from '../components/Head';

const About = ({ data }) => {
  const {
    kontentItemSection: {
      system: { name: title },
      elements: { introduction },
    },
  } = data;

  return (
    <Layout>
      <h1>{title}</h1>
      <RichTextElement
        value={introduction.value}
        images={introduction.images}
        resolveImage={(image) => (
          <figure>
            <ImageElement image={image} alt={image.description} />
            <figcaption>{image.description}</figcaption>
          </figure>
        )}
      />
    </Layout>
  );
};

export function Head({ data }) {
  const {
    kontentItemSection: {
      system: { name: title },
      elements: {
        meta_data__description: { value: description },
      },
    },
  } = data;
  return <SEOHead title={title} description={description} />;
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
            url
            width
            height
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
