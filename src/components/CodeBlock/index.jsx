/* eslint-disable react/no-danger */
import React from 'react';
import hljs from './custom-hljs';
import './style.scss';

class CodeBlock extends React.Component {
  render() {
    const {
      linkedItem: {
        elements: {
          class: { value: language },
          code: { value: code },
        },
      },
    } = this.props;

    const { value: formattedCode } = hljs.highlight(language, code);

    return (
      <pre>
        <code className={`hljs ${language}`} dangerouslySetInnerHTML={{ __html: formattedCode }} />
      </pre>
    );
  }
}

export default CodeBlock;
