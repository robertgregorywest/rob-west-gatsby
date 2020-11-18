import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.scss';

const ArticleTags = ({ tags }) => (
  <div className="tags">
    <ul className="tags__list">
      {tags &&
        tags.map((tag) => (
          <li className="tags__list-item" key={tag.codename}>
            <Link to={`/tag/${tag.codename}`} className="tags__list-item-link">
              {tag.name}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

ArticleTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      codename: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArticleTags;
