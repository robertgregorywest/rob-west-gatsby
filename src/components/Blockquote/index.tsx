import React from 'react';
import PropTypes from 'prop-types';

const Blockquote = ({ quote }) => <blockquote>{quote}</blockquote>;

Blockquote.propTypes = {
  quote: PropTypes.string.isRequired,
};

export default Blockquote;
