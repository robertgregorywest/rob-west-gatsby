/* eslint-disable react/no-danger */
import React from 'react';
import hljs from './custom-hljs';
import './style.scss';

const CodeBlock = ({ linkedItem }) => {
  const {
    elements: {
      class: { value: language },
      code: { value: code },
    },
  } = linkedItem;

  const { value: formattedCode } = hljs.highlight(language, code);

  return (
    <pre>
      <code className={`hljs ${language}`} dangerouslySetInnerHTML={{ __html: formattedCode }} />
    </pre>
  );
};

export default CodeBlock;
