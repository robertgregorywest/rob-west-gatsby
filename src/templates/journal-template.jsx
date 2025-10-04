import React from 'react';
import { graphql } from 'gatsby';
import parseNodeToArticle from '../tools/articles';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary';
import Pagination from '../components/Pagination';
import TagListing from '../components/TagListing';
import SEOHead from '../components/Head';

const JournalTemplate = ({ data, pageContext }) => {
  const { hasNextPage, hasPrevPage, prevPagePath, nextPagePath } = pageContext;

  const items = [];
  data.allKontentItemArticle.nodes.forEach((node) => {
    const article = parseNodeToArticle(node);
    items.push(<ArticleSummary key={article.slug} article={article} />);
  });

  const baseUrl = data.site.siteMetadata.siteUrl;

  return (
    <Layout>
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
  );
};

export function Head({ data, pageContext }) {
  const defaultTitle = data.kontentItemSection.system.name;
  const journalTitle =
    pageContext.currentPage > 0
      ? `${defaultTitle} - Page ${pageContext.currentPage + 1}`
      : defaultTitle;
  const description =
    data.kontentItemSection.elements.meta_data__description.value;
  const baseUrl = data.site.siteMetadata.siteUrl;
  const canoncialUrl =
    pageContext.currentPage > 0
      ? `${baseUrl}articles/page/${pageContext.currentPage}/`
      : `${baseUrl}articles/`;
  return (
    <SEOHead
      title={journalTitle}
      description={description}
      canonical={canoncialUrl}
    />
  );
}

export default JournalTemplate;

export const pageQuery = graphql`
  query ArticlesQuery($limit: Int!, $skip: Int!) {
    kontentItemSection(system: { codename: { eq: "journal" } }) {
      elements {
        meta_data__description {
          value
        }
      }
      system {
        name
      }
    }
    allKontentItemArticle(
      sort: { elements: { publish_date: { value: DESC } } }
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
