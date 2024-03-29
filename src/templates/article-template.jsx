import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { RichTextElement, ImageElement } from '@kontent-ai/gatsby-components';
import { formatArticleDate } from '../tools/articles';
import Layout from '../components/Layout';
import LinkedItem from '../components/LinkedItem';
import ArticleTags from '../components/ArticleTags';

const ArticleTemplate = ({ data }) => {
  const title = data.kontentItemArticle.elements.title.value;
  const description =
    data.kontentItemArticle.elements.meta_data__description.value;
  const body = data.kontentItemArticle.elements.body;
  const tags = data.kontentItemArticle.elements.article_topics.value;
  const published = data.kontentItemArticle.elements.publish_date.value;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <h1>{title}</h1>
      <p className="published">Published {formatArticleDate(published)}</p>
      <ArticleTags tags={tags} />
      <RichTextElement
        value={body.value}
        images={body.images}
        links={body.links}
        linkedItems={body.modular_content}
        resolveImage={(image) => (
          <figure>
            <ImageElement image={image} alt={image.description} />
            <figcaption>{image.description}</figcaption>
          </figure>
        )}
        resolveLink={(link, domNode) => (
          <Link to={`/articles/${link.url_slug}`}>
            {domNode.children[0].data}
          </Link>
        )}
        resolveLinkedItem={(linkedItem) => (
          <LinkedItem linkedItem={linkedItem} />
        )}
      />
    </Layout>
  );
};

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
