import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import parseNodeToArticle from '../tools/articles';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary';

const Index = ({ data }) => {
  const description =
    data.kontentItemHome.elements.meta_data__description.value;
  const introduction = data.kontentItemHome.elements.introduction.value;

  const items = [];
  data.kontentItemHome.elements.featured_articles.value.forEach((node) => {
    const article = parseNodeToArticle(node);
    items.push(
      <div className="home-feature-grid__item" key={article.slug}>
        <ArticleSummary article={article} />
      </div>
    );
  });

  return (
    <Layout>
      <Helmet>
        <meta name="description" content={description} />
      </Helmet>
      <div
        className="bio"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: introduction }}
      />
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
            <a
              href="https://www.instagram.com/robertgregorywest/"
              className="fc-webicon instagram large"
            >
              Instagram
            </a>
            <a
              href="http://www.facebook.com/robgwest"
              className="fc-webicon facebook large"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/robgwest"
              className="fc-webicon twitter large"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    kontentItemHome {
      elements {
        featured_articles {
          value {
            ... on kontent_item_article {
              elements {
                title {
                  value
                }
                summary {
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
                publish_date {
                  value
                }
              }
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
