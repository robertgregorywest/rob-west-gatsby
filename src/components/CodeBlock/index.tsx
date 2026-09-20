import React from 'react';
import hljs from './custom-hljs';
import './style.scss';

type CodeBlockProps = {
  language: string;
  code: string;
};

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const { value: formattedCode } = hljs.highlight(code, { language });
  return (
    <pre>
      <code
        className={`${language} hljs`}

        dangerouslySetInnerHTML={{ __html: formattedCode }}
      />
    </pre>
  );
};

export default CodeBlock;
