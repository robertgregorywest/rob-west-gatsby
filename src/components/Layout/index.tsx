import React, { type ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '../../assets/scss/init.scss';

type LayoutProps = {
  children?: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className="layout">
    <Header />
    <div className="container">{children}</div>
    <Footer />
  </div>
);

export default Layout;
