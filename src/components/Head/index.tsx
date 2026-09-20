import * as React from 'react';

type HeadProps = {
  title?: string;
  description?: string;
  canonical?: string;
};

export default function Head({ title, description, canonical }: HeadProps) {
  const defaultTitle = "Rob West's Website";
  return (
    <>
      <title>{title ? `${defaultTitle} - ${title}` : defaultTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
}
