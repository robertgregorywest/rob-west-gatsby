export type Tag = {
  codename: string;
  name: string;
};

export type Article = {
  title: string;
  summary: string;
  slug: string;
  published: string;
  tags: Tag[];
};

export type ArticleNode = {
  readonly elements: {
    readonly title: { readonly value: string | null };
    readonly summary: { readonly value: string | null };
    readonly article_url_slug: { readonly value: string | null };
    readonly publish_date: { readonly value: string | null };
    readonly article_topics: {
      readonly value: ReadonlyArray<Tag | null> | null;
    };
  };
};

export default function parseNodeToArticle({ elements }: ArticleNode): Article {
  return {
    title: elements.title.value ?? '',
    summary: elements.summary.value ?? '',
    slug: elements.article_url_slug.value ?? '',
    published: elements.publish_date.value ?? '',
    tags: (elements.article_topics.value ?? []).filter(
      (tag): tag is Tag => tag !== null
    ),
  };
}

export const formatArticleDate = (date: string) =>
  new Date(date).toLocaleDateString('en-gb', {
    // Kontent dates are UTC midnight; don't shift them into the viewer's zone.
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
