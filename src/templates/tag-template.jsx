import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import parseNodeToArticle from '../tools/articles';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary';
import Pagination from '../components/Pagination';
import TagListing from '../components/TagListing';

const TagTemplate = ({ data, pageContext }) => {
  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext;

  const tagName = data.kontentItemTagSummary.system.name;

  const title = currentPage > 0 ? `${tagName} - Page ${currentPage}` : tagName;
  const description = data.kontentItemTagSummary.elements.summary.value;

  const items = [];
  data.allKontentItemArticle.nodes.forEach((node) => {
    const article = parseNodeToArticle(node);
    items.push(<ArticleSummary key={article.slug} article={article} />);
  });

  const baseUrl = data.site.siteMetadata.siteUrl;
  const canoncial =
    currentPage > 0
      ? `${baseUrl}tag/${pageContext.codename}/page/${currentPage}/`
      : `${baseUrl}tag/${pageContext.codename}/`;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canoncial" href={canoncial} />
      </Helmet>
      <div className="content">
        <h1>{title}</h1>
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
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagsQuery($codename: String!, $limit: Int!, $skip: Int!) {
    kontentItemTagSummary(system: { codename: { eq: $codename } }) {
      elements {
        summary {
          value
        }
      }
      system {
        name
      }
    }
    allKontentItemArticle(
      filter: {
        elements: {
          article_topics: {
            value: { elemMatch: { codename: { eq: $codename } } }
          }
        }
      }
      sort: { fields: elements___publish_date___value, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        ...ArticleSummaryInfo
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
