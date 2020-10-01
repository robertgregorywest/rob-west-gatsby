import React from 'react';
import Layout from '../components/Layout';

const NotFoundRoute = () => (
  <Layout>
    <div>
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">NOT FOUND</h1>
            <div className="page__body">
              <p>Page not found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFoundRoute;
