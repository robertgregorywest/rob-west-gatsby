import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import parseNodeToArticle from '../tools/articles';
import { canonicalUrl, pageTitle, type PageContext } from '../tools/pagination';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary';
import Pagination from '../components/Pagination';
import TagListing from '../components/TagListing';
import SEOHead from '../components/Head';

type JournalContext = PageContext;

const JournalTemplate = ({
  data,
  pageContext,
}: PageProps<Queries.ArticlesQueryQuery, JournalContext>) => {
  const { hasNextPage, hasPrevPage, prevPagePath, nextPagePath } = pageContext;

  const items = data.allKontentItemArticle.nodes.map((node) => {
    const article = parseNodeToArticle(node);
    return <ArticleSummary key={article.slug} article={article} />;
  });

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
        />
      </div>
      <div className="sidebar">
        <TagListing />
      </div>
    </Layout>
  );
};

export function Head({
  data,
  pageContext,
}: HeadProps<Queries.ArticlesQueryQuery, JournalContext>) {
  const defaultTitle = data.kontentItemSection?.system.name ?? 'Journal';
  const description =
    data.kontentItemSection?.elements.meta_data__description.value;
  return (
    <SEOHead
      title={pageTitle(defaultTitle, pageContext.currentPage)}
      description={description ?? undefined}
      canonical={canonicalUrl(
        data.site?.siteMetadata?.siteUrl,
        pageContext.basePath,
        pageContext.currentPage
      )}
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
