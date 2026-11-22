import React from 'react';
import './style.scss';

type AttributedQuoteProps = {
  text: string;
  author: string;
};

/** A pull quote with its author credited underneath. */
const AttributedQuote = ({ text, author }: AttributedQuoteProps) => (
  <figure className="attributed-quote">
    <blockquote className="attributed-quote__text">{text}</blockquote>
    {author && (
      <figcaption className="attributed-quote__author">{author}</figcaption>
    )}
  </figure>
);

export default AttributedQuote;
