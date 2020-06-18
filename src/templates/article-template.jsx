import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import { RichTextElement } from '@kentico/gatsby-kontent-components';
import moment from 'moment';
import Layout from '../components/Layout';
import LinkedItem from '../components/LinkedItem';
import ArticleTags from '../components/ArticleTags';

const ArticleTemplate = ({ data }) => {
  const title = data.kontentItemArticle.elements.title.value;
  const description = data.kontentItemArticle.elements.meta_data__description.value;
  const richTextElement = data.kontentItemArticle.elements.body;
  const tags = data.kontentItemArticle.elements.article_topics.value;
  const published = data.kontentItemArticle.elements.publish_date.value;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <h1>{title}</h1>
      <p className="published">
        Published
        {' '}
        {moment(published).format('D MMM YYYY')}
      </p>
      <ArticleTags tags={tags} />
      <RichTextElement
        value={richTextElement.value}
        images={richTextElement.images}
        links={richTextElement.links}
        linkedItems={richTextElement.modular_content}
        resolveImage={image => (
          <figure>
            <Image
              fluid={image.fluid}
              title={image.description}
              alt={image.description}
            />
            <figcaption>{image.description}</figcaption>
          </figure>
        )}
        resolveLink={(link, domNode) => (
          <Link to={`/articles/${link.url_slug}`}>
            {domNode.children[0].data}
          </Link>
        )}
        resolveLinkedItem={linkedItem => (
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
            fluid(maxWidth: 1000) {
              ...KontentAssetFluid
            }
            description
          }
        }
        publish_date {
          value
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
