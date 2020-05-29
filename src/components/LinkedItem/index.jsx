import React from 'react'
import Blockquote from '../Blockquote'
import CodeBlock from '../CodeBlock'

const LinkedItem = ({ linkedItem }) => {
  const type = linkedItem.system.type;

  switch (type) {
    case 'blockquote': {
      return <Blockquote linkedItem={linkedItem} />;
    }

    case 'code_block': {
      return <CodeBlock linkedItem={linkedItem} />;
    }

    default:
      return null
  }
}

export default LinkedItem
