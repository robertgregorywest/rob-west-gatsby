import React from 'react';
import Blockquote from '../Blockquote';
import RichBlockquote from '../RichBlockquote';
import CodeBlock from '../CodeBlock';

type QuoteItem = {
  system: { type: 'blockquote' | 'rich_blockquote' };
  elements: { text: { value: string } };
};

type CodeItem = {
  system: { type: 'code_block' };
  elements: { language: { value: string }; code: { value: string } };
};

export type LinkedItemData = QuoteItem | CodeItem;

type LinkedItemProps = {
  linkedItem: LinkedItemData;
};

// TypeScript can't narrow a union on the nested `system.type`, so narrow with guards.
const isQuote = (item: LinkedItemData): item is QuoteItem =>
  item.system.type === 'blockquote' || item.system.type === 'rich_blockquote';

const isCode = (item: LinkedItemData): item is CodeItem =>
  item.system.type === 'code_block';

const LinkedItem = ({ linkedItem }: LinkedItemProps) => {
  if (isQuote(linkedItem)) {
    const quote = linkedItem.elements.text.value;
    return linkedItem.system.type === 'blockquote' ? (
      <Blockquote quote={quote} />
    ) : (
      <RichBlockquote quote={quote} />
    );
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

export default LinkedItem;
