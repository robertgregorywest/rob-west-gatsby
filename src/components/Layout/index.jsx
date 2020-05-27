import React from 'react'
import Helmet from 'react-helmet'
import Header from '../Header'
import '../../assets/scss/init.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Rob West's website">
          <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        </Helmet>
        <Header />
        {children}
      </div>
    )
  }
}

export default Layout
