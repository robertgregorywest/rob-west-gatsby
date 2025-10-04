import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '../../assets/scss/init.scss';

const Layout = (props) => {
  const { children } = props;
  return (
    <div className="layout">
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
