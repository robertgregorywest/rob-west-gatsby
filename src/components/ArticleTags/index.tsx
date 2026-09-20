import React from 'react';
import { Link } from 'gatsby';
import type { Tag } from '../../tools/articles';
import './style.scss';

type ArticleTagsProps = {
  tags: Tag[];
};

const ArticleTags = ({ tags }: ArticleTagsProps) => (
  <div className="tags">
    <ul className="tags__list">
      {tags.map((tag) => (
        <li className="tags__list-item" key={tag.codename}>
          <Link to={`/tag/${tag.codename}`} className="tags__list-item-link">
            {tag.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ArticleTags;
