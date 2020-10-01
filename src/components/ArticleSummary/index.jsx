import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import moment from 'moment';
import ArticleTags from '../ArticleTags';
import './style.scss';

const ArticleSummary = ({ title, summary, slug, published, tags }) => (
  <div className="featured-article">
    <h2 className="featured-article__title">
      <Link className="featured-article__title-link" to={`/articles/${slug}`}>
        {title}
      </Link>
    </h2>
    <p className="featured-article__date">
      Published {moment(published).format('D MMM YYYY')}
    </p>
    <p className="featured-article__summary">{summary}</p>
    <ArticleTags tags={tags} />
  </div>
);

ArticleSummary.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  published: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      codename: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ArticleSummary;
