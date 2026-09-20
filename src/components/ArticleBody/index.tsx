import React, { type ComponentType } from 'react';
import { graphql, Link } from 'gatsby';
import { RichTextElement } from '@kontent-ai/gatsby-components';
import { getLinkText, resolveImage, toImageItems } from '../../tools/richText';
import CodeBlock from '../CodeBlock';

type QuoteItem = {
  system: { type: 'blockquote' | 'rich_blockquote' };
  elements: { text: { value: string } };
};

type CodeItem = {
  system: { type: 'code_block' };
  elements: { language: { value: string }; code: { value: string } };
};

type LinkedItemData = QuoteItem | CodeItem;

const Blockquote = ({ quote }: { quote: string }) => (
  <blockquote>{quote}</blockquote>
);

// Rich quotes hold trusted HTML authored in Kontent.
const RichBlockquote = ({ quote }: { quote: string }) => (
  <blockquote dangerouslySetInnerHTML={{ __html: quote }} />
);

const QUOTE_COMPONENTS: Record<
  QuoteItem['system']['type'],
  ComponentType<{ quote: string }>
> = {
  blockquote: Blockquote,
  rich_blockquote: RichBlockquote,
};

// TypeScript can't narrow a union on the nested `system.type`, so narrow with guards.
const isQuote = (item: LinkedItemData): item is QuoteItem =>
  item.system.type === 'blockquote' || item.system.type === 'rich_blockquote';

const isCode = (item: LinkedItemData): item is CodeItem =>
  item.system.type === 'code_block';

const renderLinkedItem = (linkedItem: LinkedItemData) => {
  if (isQuote(linkedItem)) {
    const QuoteComponent = QUOTE_COMPONENTS[linkedItem.system.type];
    return <QuoteComponent quote={linkedItem.elements.text.value} />;
  }
  if (isCode(linkedItem)) {
    const {
      elements: {
        language: { value: language },
        code: { value: code },
      },
    } = linkedItem;
    return <CodeBlock language={language} code={code} />;
  }
  return null;
};

const renderLink = (
  link: { url_slug: string },
  domNode: { children?: unknown[] }
) => <Link to={`/articles/${link.url_slug}`}>{getLinkText(domNode)}</Link>;

type ArticleBodyProps = {
  body: Queries.ArticleBodyInfoFragment | null | undefined;
};

/** Renders an article's Kontent rich-text body: images, article links, quotes and code. */
const ArticleBody = ({ body }: ArticleBodyProps) => (
  <RichTextElement
    value={body?.value ?? ''}
    images={toImageItems(body?.images)}
    links={[...(body?.links ?? [])]}
    linkedItems={[...(body?.modular_content ?? [])]}
    resolveImage={resolveImage}
    resolveLink={renderLink}
    resolveLinkedItem={renderLinkedItem}
  />
);

export const bodyFragment = graphql`
  fragment ArticleBodyInfo on kontent_item_article_body_element {
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
`;

export default ArticleBody;
