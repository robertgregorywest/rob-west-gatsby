import React from 'react';
import PropTypes from 'prop-types';
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

CodeBlock.propTypes = {
  language: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default CodeBlock;
