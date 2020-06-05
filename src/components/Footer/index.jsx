import React from 'react'
import './style.scss'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      &copy; {year} Rob West. All Rights Reserved. Built using <a href="https://kontent.ai/">Kentico Kontent</a> and <a href="https://www.gatsbyjs.org/">Gatsby</a>.
    </footer>
  )
}

export default Footer