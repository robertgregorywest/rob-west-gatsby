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

export type TagSummary = Tag & {
  summary: string;
  count: number;
};

type TagGroup = {
  readonly fieldValue: string | null;
  readonly totalCount: number;
};

type TagSummaryNode = {
  readonly elements: { readonly summary: { readonly value: string | null } };
  readonly system: { readonly codename: string; readonly name: string };
};

/** Drops the nulls Kontent's schema allows in a topics list. */
export const toTags = (
  topics: ReadonlyArray<Tag | null> | null | undefined
): Tag[] => (topics ?? []).filter((tag): tag is Tag => tag !== null);

/**
 * Joins per-tag article counts with each tag's summary entry. Tags without a
 * summary entry are left out, and the order of `groups` is kept.
 */
export const toTagSummaries = (
  groups: readonly TagGroup[],
  summaries: readonly TagSummaryNode[]
): TagSummary[] =>
  groups.flatMap(({ fieldValue, totalCount }) => {
    const source = summaries.find(
      (summary) => summary.system.codename === fieldValue
    );
    if (source === undefined || fieldValue === null) {
      return [];
    }
    return [
      {
        codename: fieldValue,
        name: source.system.name,
        summary: source.elements.summary.value ?? '',
        count: totalCount,
      },
    ];
  });

export default function parseNodeToArticle({ elements }: ArticleNode): Article {
  return {
    title: elements.title.value ?? '',
    summary: elements.summary.value ?? '',
    slug: elements.article_url_slug.value ?? '',
    published: elements.publish_date.value ?? '',
    tags: toTags(elements.article_topics.value),
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
