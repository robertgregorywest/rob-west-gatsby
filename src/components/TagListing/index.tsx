import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

type TagSummary = {
  codename: string;
  name: string;
  summary: string;
  count: number;
};

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

  const tags = data.allKontentItemArticle.group.reduce<TagSummary[]>(
    (result, item) => {
      const source = data.allKontentItemTagSummary.nodes.find(
        (summary) => summary.system.codename === item.fieldValue
      );
      if (source !== undefined && item.fieldValue !== null) {
        result.push({
          codename: item.fieldValue,
          name: source.system.name,
          summary: source.elements.summary.value ?? '',
          count: item.totalCount,
        });
      }
      return result;
    },
    []
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
