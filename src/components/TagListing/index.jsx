import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const TagListing = () => {
  const data = useStaticQuery(graphql`
  query ArticleQuery {
    allKontentItemArticle {
      group(field: elements___article_topics___value___codename) {
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
`
  )

  const tags = data.allKontentItemArticle.group.map(item => {
    let source = data.allKontentItemTagSummary.nodes.find(summary => {
      return summary.system.codename === item.fieldValue
    })
    return {
      codename: item.fieldValue,
      name: source.system.name,
      summary: source.elements.summary.value,
      count: item.totalCount
    }
  })

  return (
    <div>
      {tags &&
        tags.map(tag => (
          <div key={tag.codename}>
            <h3>
              <Link to={`/tag/${tag.codename}`}>
                {tag.name}
              </Link>
              {' '}
              ({tag.count})
            </h3>
            <p>{tag.summary}</p>
          </div>
        ))}
    </div>
  )
}

export default TagListing