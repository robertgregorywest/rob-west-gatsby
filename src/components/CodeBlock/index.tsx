import React from 'react';
import PropTypes from 'prop-types';
import hljs from './custom-hljs';
import './style.scss';

const CodeBlock = ({ language, code }) => {
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

CodeBlock.propTypes = {
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default CodeBlock;
