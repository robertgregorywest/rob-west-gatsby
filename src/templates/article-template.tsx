import * as React from 'react';
import { graphql, type PageProps, type HeadProps } from 'gatsby';
import { formatArticleDate, toTags } from '../tools/articles';
import Layout from '../components/Layout';
import ArticleBody from '../components/ArticleBody';
import ArticleTags from '../components/ArticleTags';
import SEOHead from '../components/Head';

const ArticleTemplate = ({ data }: PageProps<Queries.ArticleBySlugQuery>) => {
  const elements = data.kontentItemArticle?.elements;
  const title = elements?.title.value;
  const tags = toTags(elements?.article_topics.value);
  const published = elements?.publish_date.value;

  return (
    <Layout>
      <h1>{title}</h1>
      {published && (
        <p className="published">Published {formatArticleDate(published)}</p>
      )}
      <ArticleTags tags={tags} />
      <ArticleBody body={elements?.body} />
    </Layout>
  );
};

export function Head({ data }: HeadProps<Queries.ArticleBySlugQuery>) {
  const title = data.kontentItemArticle?.elements.title.value;
  const description =
    data.kontentItemArticle?.elements.meta_data__description.value;
  return (
    <SEOHead
      title={title ?? undefined}
      description={description ?? undefined}
    />
  );
}

export default ArticleTemplate;

export const pageQuery = graphql`
  query ArticleBySlug($slug: String!) {
    kontentItemArticle(
      elements: { article_url_slug: { value: { eq: $slug } } }
    ) {
      elements {
        title {
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
        body {
          ...ArticleBodyInfo
        }
        meta_data__keywords {
          value
        }
        meta_data__description {
          value
        }
      }
    }
  }
`;
