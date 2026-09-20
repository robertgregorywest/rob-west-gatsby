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
    readonly title: { readonly value: string | null } | null;
    readonly summary: { readonly value: string | null } | null;
    readonly article_url_slug: { readonly value: string | null } | null;
    readonly publish_date: { readonly value: string | null } | null;
    readonly article_topics: {
      readonly value: ReadonlyArray<Tag | null> | null;
    } | null;
  } | null;
};

export const isArticleNode = (node: object | null): node is ArticleNode =>
  node !== null && 'elements' in node;

export default function parseNodeToArticle(node: ArticleNode): Article {
  const elements = node.elements;
  return {
    title: elements?.title?.value ?? '',
    summary: elements?.summary?.value ?? '',
    slug: elements?.article_url_slug?.value ?? '',
    published: elements?.publish_date?.value ?? '',
    tags: (elements?.article_topics?.value ?? []).filter(
      (tag): tag is Tag => tag !== null
    ),
  };
}

export const formatArticleDate = (date: string) =>
  new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
