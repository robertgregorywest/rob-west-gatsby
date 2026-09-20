import React from 'react';

type BlockquoteProps = {
  quote: string;
};

const Blockquote = ({ quote }: BlockquoteProps) => (
  <blockquote>{quote}</blockquote>
);

export default Blockquote;
