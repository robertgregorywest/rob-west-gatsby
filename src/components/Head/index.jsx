import * as React from 'react';

export default function Head({ title, description }) {
  const defaultTitle = "Rob West's Website";
  return (
    <>
      <title>{title ? `${defaultTitle} - ${title}` : defaultTitle}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
