import React from 'react';

type RichBlockquoteProps = {
  quote: string;
};

const RichBlockquote = ({ quote }: RichBlockquoteProps) => (
  <blockquote dangerouslySetInnerHTML={{ __html: quote }} />
);

export default RichBlockquote;
