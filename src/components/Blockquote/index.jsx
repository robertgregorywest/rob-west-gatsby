import React from 'react'

const Blockquote = ({ linkedItem }) => (
  <blockquote>{linkedItem.elements.text.value}</blockquote>
)

export default Blockquote