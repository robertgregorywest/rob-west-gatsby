import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

const ArticleTags = ({ tags }) => (
  <div className="tags">
    <ul className="tags__list">
      {tags &&
        tags.map(tag => (
          <li className="tags__list-item" key={tag.codename}>
            <Link to={`/tag/${tag.codename}`} className="tags__list-item-link">
              {tag.name}
            </Link>
          </li>
        ))}
    </ul>
  </div>
)

export default ArticleTags