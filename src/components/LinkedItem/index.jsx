import React from 'react';
import Blockquote from '../Blockquote';
import CodeBlock from '../CodeBlock';

const LinkedItem = ({ linkedItem }) => {
  const type = linkedItem.system.type;

  switch (type) {
    case 'blockquote': {
      return <Blockquote quote={linkedItem.elements.text.value} />;
    }

    case 'code_block': {
      const {
        elements: {
          language: { value: language },
          code: { value: code },
        },
      } = linkedItem;
      return <CodeBlock language={language} code={code} />;
    }

    default:
      return null;
  }
};

export default LinkedItem;
