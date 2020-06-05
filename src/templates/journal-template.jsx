import React from 'react';
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary'
import Pagination from '../components/Pagination'
import TagListing from '../components/TagListing'

const JournalTemplate = ({ data, pageContext }) => {

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath
  } = pageContext;

  const defaultTitle = data.kontentItemSection.system.name

  const title = currentPage > 0 ? `${defaultTitle} - Page ${currentPage}` : defaultTitle;
  const description = data.kontentItemSection.elements.meta_data__description.value

  const items = []
  data.allKontentItemArticle.nodes.forEach(article => {
    items.push(
      <ArticleSummary data={article} key={article.elements.article_url_slug.value} />
    )
  })

  const baseUrl = data.site.siteMetadata.siteUrl;
  const canoncial = currentPage > 0 ? `${baseUrl}articles/page/${currentPage}/` : `${baseUrl}articles/`;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canoncial" href={canoncial} />
      </Helmet>
      <div className="content">
        <h1>Journal</h1>
        {items}
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          baseUrl={baseUrl}
        />
      </div>
      <div className="sidebar">
        <TagListing />
      </div>
    </Layout>
  )
}

export default JournalTemplate

export const pageQuery = graphql`
  query ArticlesQuery($limit: Int!, $skip: Int!) {
    kontentItemSection(system: {codename: {eq: "journal"}}) {
      elements {
        meta_data__description {
          value
        }
      }
      system {
        name
      }
    }
    allKontentItemArticle(sort: {fields: elements___publish_date___value, order: DESC}, limit: $limit, skip: $skip) {
      nodes {
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
