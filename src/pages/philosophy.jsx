import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { RichTextElement } from '@kontent-ai/gatsby-components';
import Layout from '../components/Layout';

const Philosophy = ({ data }) => {
  const {
    kontentItemPhilosophy: {
      system: { name },
      elements: {
        meta_data__description: { value: description },
        introduction,
        featured_work: { value: works },
      },
    },
  } = data;

  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="content">
        <h1>{name}</h1>
        <RichTextElement value={introduction.value} />
      </div>
      <div className="sidebar">
        <div>
          <h2>Selected Papers (PDF)</h2>
          {works &&
            works.map((work) => (
              <div key={work.id}>
                <h3>
                  <a href={work.elements.asset.value[0].url}>
                    {work.elements.title.value}
                  </a>
                </h3>
                <p>{work.elements.summary.value}</p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Philosophy;

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
`;
