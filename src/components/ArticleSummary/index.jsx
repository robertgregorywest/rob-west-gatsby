import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import moment from 'moment';
import ArticleTags from '../ArticleTags';
import './style.scss';

const ArticleSummary = ({ article }) => (
  <div className="featured-article">
    <h2 className="featured-article__title">
      <Link
        className="featured-article__title-link"
        to={`/articles/${article.slug}`}
      >
        {article.title}
      </Link>
    </h2>
    <p className="featured-article__date">
      Published {moment(article.published).format('D MMM YYYY')}
    </p>
    <p className="featured-article__summary">{article.summary}</p>
    <ArticleTags tags={article.tags} />
  </div>
);

ArticleSummary.propTypes = {
  article: PropTypes.shape({
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
  }).isRequired,
};

export default ArticleSummary;
