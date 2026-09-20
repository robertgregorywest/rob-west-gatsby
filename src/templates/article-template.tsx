import * as React from 'react';
import { graphql, Link, type PageProps, type HeadProps } from 'gatsby';
import { RichTextElement } from '@kontent-ai/gatsby-components';
import { formatArticleDate, type Tag } from '../tools/articles';
import { getLinkText, resolveImage, toImageItems } from '../tools/richText';
import Layout from '../components/Layout';
import LinkedItem, { type LinkedItemData } from '../components/LinkedItem';
import ArticleTags from '../components/ArticleTags';
import SEOHead from '../components/Head';

const ArticleTemplate = ({ data }: PageProps<Queries.ArticleBySlugQuery>) => {
  const elements = data.kontentItemArticle?.elements;
  const title = elements?.title.value;
  const body = elements?.body;
  const tags = (elements?.article_topics.value ?? []).filter(
    (tag): tag is Tag => tag !== null
  );
  const published = elements?.publish_date.value;

  return (
    <Layout>
      <h1>{title}</h1>
      {published && (
        <p className="published">Published {formatArticleDate(published)}</p>
      )}
      <ArticleTags tags={tags} />
      <RichTextElement
        value={body?.value ?? ''}
        images={toImageItems(body?.images)}
        links={[...(body?.links ?? [])]}
        linkedItems={[...(body?.modular_content ?? [])]}
        resolveImage={resolveImage}
        resolveLink={(
          link: { url_slug: string },
          domNode: { children?: unknown[] }
        ) => (
          <Link to={`/articles/${link.url_slug}`}>{getLinkText(domNode)}</Link>
        )}
        resolveLinkedItem={(linkedItem: LinkedItemData) => (
          <LinkedItem linkedItem={linkedItem} />
        )}
      />
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
          value
          modular_content {
            ... on kontent_item_blockquote {
              id
              elements {
                text {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_rich_blockquote {
              id
              elements {
                text {
                  value
                }
              }
              system {
                codename
                type
              }
            }
            ... on kontent_item_code_block {
              id
              elements {
                language {
                  value
                }
                code {
                  value
                }
              }
              system {
                codename
                type
              }
            }
          }
          links {
            url_slug
            link_id
          }
          images {
            image_id
            url
            width
            height
            description
          }
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
