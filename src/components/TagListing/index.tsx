import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { toTagSummaries } from '../../tools/articles';

const TagListing = () => {
  const data = useStaticQuery<Queries.ArticleQueryQuery>(graphql`
    query ArticleQuery {
      allKontentItemArticle {
        group(
          field: {
            elements: { article_topics: { value: { codename: SELECT } } }
          }
        ) {
          fieldValue
          totalCount
        }
      }
      allKontentItemTagSummary {
        nodes {
          elements {
            summary {
              value
            }
          }
          system {
            codename
            name
          }
        }
      }
    }
  `);

  const tags = toTagSummaries(
    data.allKontentItemArticle.group,
    data.allKontentItemTagSummary.nodes
  );

  return (
    <div>
      <h2>Tags</h2>
      {tags.map((tag) => (
        <div key={tag.codename}>
          <h3>
            <Link to={`/tag/${tag.codename}`}>{tag.name}</Link> ({tag.count})
          </h3>
          <p>{tag.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default TagListing;
