import React from 'react';
import PropTypes from 'prop-types';

const RichBlockquote = ({ quote }) => (
  <blockquote dangerouslySetInnerHTML={{ __html: quote }} />
);

RichBlockquote.propTypes = {
  quote: PropTypes.string.isRequired,
};

export default RichBlockquote;
