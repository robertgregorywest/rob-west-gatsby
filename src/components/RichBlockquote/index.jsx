import React from 'react';

const RichBlockquote = ({ quote }) => (
  <blockquote
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: quote }}
  />
);

export default RichBlockquote;
