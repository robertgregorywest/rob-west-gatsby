import React from 'react'
import { Link } from 'gatsby'
import * as _ from 'lodash'
import moment from 'moment'
import ArticleTags from '../ArticleTags'

import './style.scss'

class ArticleSummary extends React.Component {
  render() {
    const title = _.get(this.props, 'data.elements.title.value', 'N/A')
    const summary = _.get(this.props, 'data.elements.summary.value', 'N/A')
    const slug = `/articles/${_.get(this.props, 'data.elements.article_url_slug.value', 'N/A')}`
    const published = _.get(this.props, 'data.elements.publish_date.value', 'N/A')
    const tags = this.props.data.elements.article_topics.value

    return (
      <div className="featured-article">
        <h2 className="featured-article__title">
          <Link className="featured-article__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="featured-article__date">Published {moment(published).format('D MMM YYYY')}</p>
        <p className="featured-article__summary">{summary}</p>
        <ArticleTags tags={tags} />
      </div>
    )
  }
}

export default ArticleSummary
