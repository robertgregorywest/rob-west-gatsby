import React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet'
import './style.scss'

const Pagination = ({ prevPagePath, nextPagePath, hasNextPage, hasPrevPage, baseUrl }) => {

  const paginationText = {
    Previous: '← PREV',
    Next: '→ NEXT'
  }

  return (
    <>
      <Helmet>
        {hasPrevPage &&
          <link rel="prev" href={baseUrl + prevPagePath.substr(1)} />
        }
        {hasNextPage &&
          <link rel="next" href={baseUrl + nextPagePath.substr(1)} />
        }
      </Helmet>
      <div className="pagination">
        <div className="pagination__prev">
          {hasPrevPage &&
            <Link rel="prev" to={prevPagePath} className="prevClassName">{paginationText.Previous}</Link>
          }
        </div>
        <div className="pagination__next">
          {hasNextPage &&
            <Link rel="next" to={nextPagePath} className="nextClassName">{paginationText.Next}</Link>
          }
        </div>
      </div>
    </>
  )
}

export default Pagination
