import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import parseNodeToArticle from '../tools/articles';
import { canonicalUrl, pageTitle, type PageContext } from '../tools/pagination';
import Layout from '../components/Layout';
import ArticleSummary from '../components/ArticleSummary';
import Pagination from '../components/Pagination';
import TagListing from '../components/TagListing';
import SEOHead from '../components/Head';

type TagContext = PageContext & { codename: string };

const TagTemplate = ({
  data,
  pageContext,
}: PageProps<Queries.TagsQueryQuery, TagContext>) => {
  const { currentPage, hasNextPage, hasPrevPage, prevPagePath, nextPagePath } =
    pageContext;

  const tagName = data.kontentItemTagSummary?.system.name ?? '';

  const title = pageTitle(tagName, currentPage);

  const items = data.allKontentItemArticle.nodes.map((node) => {
    const article = parseNodeToArticle(node);
    return <ArticleSummary key={article.slug} article={article} />;
  });

  return (
    <Layout>
      <div className="content">
        <h1>{title}</h1>
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
}: HeadProps<Queries.TagsQueryQuery, TagContext>) {
  const tagName = data.kontentItemTagSummary?.system.name ?? '';
  const description = data.kontentItemTagSummary?.elements.summary.value;
  return (
    <SEOHead
      title={pageTitle(tagName, pageContext.currentPage)}
      description={description ?? undefined}
      canonical={canonicalUrl(
        data.site?.siteMetadata?.siteUrl,
        pageContext.basePath,
        pageContext.currentPage
      )}
    />
  );
}

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
