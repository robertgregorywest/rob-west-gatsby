import React from 'react'
import { findDOMNode } from 'react-dom'
import hljs from 'highlight.js'
import hljsDefineCshtmlRazor from 'highlightjs-cshtml-razor'
import './style.scss'

hljsDefineCshtmlRazor(hljs)

class CodeBlock extends React.Component {
  componentDidMount() {
    this.updateCodeSyntaxHighlighting();
  }

  componentDidUpdate() {
    this.updateCodeSyntaxHighlighting();
  }

  updateCodeSyntaxHighlighting = () => {
    hljs.highlightBlock(findDOMNode(this.refs.code))
    // document.querySelectorAll("pre code").forEach(block => {
    //   hljs.highlightBlock(block);
    //});
  };

  render() {
    return (
      <pre>
        <code ref='code' className={this.props.linkedItem.elements.class.value}>
          {this.props.linkedItem.elements.code.value}
        </code>
      </pre>
    )
  }
}

export default CodeBlock