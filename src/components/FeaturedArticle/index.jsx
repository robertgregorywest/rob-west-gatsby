import React from 'react'
import { Link } from 'gatsby'
import * as _ from 'lodash'
import './style.scss'

class Article extends React.Component {
  render() {
    const title = _.get(this.props, 'data.elements.title.value', 'N/A')
    const summary = _.get(this.props, 'data.elements.summary.value', 'N/A')
    const slug = `/articles/${_.get(this.props, 'data.elements.article_url_slug.value', 'N/A')}`

    return (
      <div className="featured-article">
        <h2 className="featured-article__title">
          <Link className="featured-article__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="featured-article__summary">{summary}</p>
      </div>
    )
  }
}

export default Article
