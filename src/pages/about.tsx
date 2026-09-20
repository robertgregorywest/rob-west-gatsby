import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { RichTextElement } from '@kontent-ai/gatsby-components';
import { resolveImage, toImageItems } from '../tools/richText';
import Layout from '../components/Layout';
import SEOHead from '../components/Head';

const About = ({ data }: PageProps<Queries.AboutQueryQuery>) => {
  const title = data.kontentItemSection?.system.name;
  const introduction = data.kontentItemSection?.elements?.introduction;

  return (
    <Layout>
      <h1>{title}</h1>
      <RichTextElement
        value={introduction?.value ?? ''}
        images={toImageItems(introduction?.images)}
        resolveImage={resolveImage}
      />
    </Layout>
  );
};

export function Head({ data }: HeadProps<Queries.AboutQueryQuery>) {
  const title = data.kontentItemSection?.system.name;
  const description =
    data.kontentItemSection?.elements?.meta_data__description?.value;
  return <SEOHead title={title} description={description ?? undefined} />;
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
