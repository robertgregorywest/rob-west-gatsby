import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import ArticleSummary from '../components/ArticleSummary'

class IndexRoute extends React.Component {
  render() {
    const routeData = this.props
    const items = []
    const title = routeData.data.kontentItemHome.system.name
    const description = routeData.data.kontentItemHome.elements.meta_data__description.value
    const introduction = routeData.data.kontentItemHome.elements.introduction.value
    const featuredArticles = routeData.data.kontentItemHome.elements.featured_articles.value
    featuredArticles.forEach(article => {
      items.push(
        <div className="home-feature-grid__item" key={article.elements.article_url_slug.value}>
          <ArticleSummary data={article}/>
        </div>
      )
    })
    return (
      <Layout>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        <div className="bio"
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
        <div className="home-feature-grid">
          {items}
        </div>
        <div className="home-feature-grid">
          <div className="home-feature-grid__item">
            <div className="contact-details">
              <h2 className="contact-details__title">Contact Details</h2>
              <p>
                Phone: + 44 (0) 7818 646286<br />
                  E-mail: rob at robwest.info
                </p>
            </div>
          </div>
          <div className="home-feature-grid__item">
            <div className="contact-details">
              <h2 className="contact-details__title">Other Platforms</h2>
            </div>
          </div>
        </div>
      </Layout >
    )
  }
}

export default IndexRoute

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
`
