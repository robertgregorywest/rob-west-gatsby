import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { RichTextElement } from '@kontent-ai/gatsby-components';
import Layout from '../components/Layout';
import SEOHead from '../components/Head';

const Philosophy = ({ data }: PageProps<Queries.PhilosophyQueryQuery>) => {
  const name = data.kontentItemPhilosophy?.system.name;
  const elements = data.kontentItemPhilosophy?.elements;
  const works = elements?.featured_work.value ?? [];

  return (
    <Layout>
      <div className="content">
        <h1>{name}</h1>
        <RichTextElement value={elements?.introduction.value ?? ''} />
      </div>
      <div className="sidebar">
        <div>
          <h2>Selected Papers (PDF)</h2>
          {works.map((work) => (
            <div key={work.id}>
              <h3>
                <a href={work.elements.asset.value?.[0]?.url}>
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

export function Head({ data }: HeadProps<Queries.PhilosophyQueryQuery>) {
  const name = data.kontentItemPhilosophy?.system.name;
  const description =
    data.kontentItemPhilosophy?.elements?.meta_data__description.value;
  return <SEOHead title={name} description={description ?? undefined} />;
}

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
