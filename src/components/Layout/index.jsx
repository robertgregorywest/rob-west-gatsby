import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Footer from '../Footer';
import '../../assets/scss/init.scss';

const Layout = (props) => {
  const { children } = props;
  return (
    <div className="layout">
      <Helmet
        defaultTitle="Rob West's Website"
        titleTemplate="Rob West's Website - %s"
      >
        <html lang="en" />
      </Helmet>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
