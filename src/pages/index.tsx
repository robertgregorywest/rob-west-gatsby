import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import parseNodeToArticle, { isArticleNode } from '../tools/articles';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary';
import SEOHead from '../components/Head';

const Index = ({ data }: PageProps<Queries.IndexQueryQuery>) => {
  const elements = data.kontentItemHome?.elements;
  const introduction = elements?.introduction?.value ?? '';

  const items: React.ReactNode[] = [];
  elements?.featured_articles?.value?.forEach((node) => {
    if (!node || !isArticleNode(node)) {
      return;
    }
    const article = parseNodeToArticle(node);
    items.push(
      <div className="home-feature-grid__item" key={article.slug}>
        <ArticleSummary article={article} />
      </div>
    );
  });

  return (
    <Layout>
      <div className="bio" dangerouslySetInnerHTML={{ __html: introduction }} />
      <div className="home-feature-grid">{items}</div>
      <div className="home-feature-grid">
        <div className="home-feature-grid__item">
          <div className="contact-details">
            <h2 className="contact-details__title">Contact Details</h2>
            <p className="contact-details__content">
              Phone: + 44 (0) 7818 646286
              <br />
              E-mail: rob at robwest.info
            </p>
          </div>
        </div>
        <div className="home-feature-grid__item">
          <div className="contact-details">
            <h2 className="contact-details__title">Other Platforms</h2>
            <a
              href="http://uk.linkedin.com/in/robertgregorywest"
              className="fc-webicon linkedin large"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/robertgregorywest"
              className="fc-webicon github large"
            >
              GitHub
            </a>
            <a
              href="http://stackoverflow.com/users/79419/rob-west"
              className="fc-webicon stackoverflow large"
            >
              Stack Overflow
            </a>
            <a
              href="http://strava.com/athletes/robgwest"
              className="fc-webicon strava large"
            >
              Strava
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export function Head({ data }: HeadProps<Queries.IndexQueryQuery>) {
  const description =
    data.kontentItemHome?.elements?.meta_data__description?.value;
  return <SEOHead description={description ?? undefined} />;
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    kontentItemHome {
      elements {
        featured_articles {
          value {
            ... on kontent_item_article {
              ...ArticleSummaryInfo
            }
          }
        }
        introduction {
          value
        }
        meta_data__keywords {
          value
        }
        meta_data__description {
          value
        }
      }
      system {
        name
      }
    }
  }
`;
