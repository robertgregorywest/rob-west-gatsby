import React from 'react';
import hljs from './custom-hljs';
import './style.scss';

const CodeBlock = ({ language, code }) => {
  const { value: formattedCode } = hljs.highlight(language, code);
  return (
    <pre>
      <code
        className={`${language} hljs`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: formattedCode }}
      />
    </pre>
  );
};

export default CodeBlock;
