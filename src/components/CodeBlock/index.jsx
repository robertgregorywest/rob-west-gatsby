import React from 'react';
import hljs from './custom-hljs';
import './style.scss';

class CodeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.codeNode = React.createRef();
  }

  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    hljs.highlightBlock(this.codeNode.current);
  };

  render() {
    const {
      linkedItem: {
        elements: {
          class: { value: className },
          code: { value: code },
        },
      },
    } = this.props;
    return (
      <pre>
        <code ref={this.codeNode} className={className}>
          {code}
        </code>
      </pre>
    );
  }
}

export default CodeBlock;
