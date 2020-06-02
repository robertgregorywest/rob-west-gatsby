import React from 'react';
import { Link } from 'gatsby';
import './style.scss'

const Pagination = ({ prevPagePath, nextPagePath, hasNextPage, hasPrevPage }) => {

  const paginationText = {
      Previous: '← PREV',
      Next: '→ NEXT'
  }

  return (
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
  )
}

export default Pagination
