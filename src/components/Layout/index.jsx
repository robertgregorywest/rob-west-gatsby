import React from 'react'
import {Helmet} from 'react-helmet'
import Header from '../Header'
import Footer from '../Footer'
import InitialiseTheme from '../InitialiseTheme'
import '../../assets/scss/init.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Rob West's website">
          <html lang="en" />
          <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        </Helmet>
        <InitialiseTheme />
        <Header />
        <div className="container">
        {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout
