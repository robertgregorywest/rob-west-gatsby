import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import ArticleTags from '../ArticleTags';

import './style.scss';

class ArticleSummary extends React.Component {
  render() {
    const {
      data: {
        elements: {
          title: { value: title },
          summary: { value: summary },
          article_url_slug: { value: slug },
          publish_date: { value: published },
          article_topics: { value: tags },
        },
      },
    } = this.props;

    return (
      <div className="featured-article">
        <h2 className="featured-article__title">
          <Link
            className="featured-article__title-link"
            to={`/articles/${slug}`}
          >
            {title}
          </Link>
        </h2>
        <p className="featured-article__date">
          Published
          {moment(published).format('D MMM YYYY')}
        </p>
        <p className="featured-article__summary">{summary}</p>
        <ArticleTags tags={tags} />
      </div>
    );
  }
}

export default ArticleSummary;
