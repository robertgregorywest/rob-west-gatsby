import React from 'react';
import { graphql, Link } from 'gatsby';
import { formatArticleDate, type Article } from '../../tools/articles';
import ArticleTags from '../ArticleTags';
import './style.scss';

type ArticleSummaryProps = {
  article: Article;
};

const ArticleSummary = ({ article }: ArticleSummaryProps) => (
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
      Published {formatArticleDate(article.published)}
    </p>
    <p className="featured-article__summary">{article.summary}</p>
    <ArticleTags tags={article.tags} />
  </div>
);

export const pageQuery = graphql`
  fragment ArticleSummaryInfo on kontent_item_article {
    elements {
      title {
        value
      }
      summary {
        value
      }
      article_url_slug {
        value
      }
      article_topics {
        value {
          name
          codename
        }
      }
      publish_date {
        value
      }
    }
  }
`;

export default ArticleSummary;
