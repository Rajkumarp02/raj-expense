// Layout.js
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Layout = ({ children, pageTitle, pageDescription,url}) => {
  useEffect(() => {
    document.title = `${pageTitle} - Your App Name`;
  }, [pageTitle]);

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - Your App Name`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="yovi:app_id" content="113869198637480"></meta>
        <meta property="og:title" content={`${pageTitle} - Your App Name`} />
        <meta name="og:type" content={`${pageTitle} - Your App Name`} ></meta>
        <meta name="og:url" content={url}></meta>
        <meta name="description" content={pageDescription} />
        <meta property="og:description" content={pageDescription} />
        {/* Add other meta tags as needed */}
      </Helmet>
      {children}
    </>
  );
};

export default Layout;
