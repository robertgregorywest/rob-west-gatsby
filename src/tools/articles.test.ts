import { afterEach, describe, expect, it } from 'vitest';
import parseNodeToArticle, {
  formatArticleDate,
  toTagSummaries,
  toTags,
  type ArticleNode,
} from './articles';

const node = (
  overrides: Partial<ArticleNode['elements']> = {}
): ArticleNode => {
  return {
    elements: {
      title: { value: 'A title' },
      summary: { value: 'A summary' },
      article_url_slug: { value: 'a-title' },
      publish_date: { value: '2020-06-12T00:00:00Z' },
      article_topics: {
        value: [
          { codename: 'dotnet', name: '.NET' },
          { codename: 'ai', name: 'AI' },
        ],
      },
      ...overrides,
    },
  };
};

describe('parseNodeToArticle', () => {
  it('maps element values onto an article', () => {
    expect(parseNodeToArticle(node())).toEqual({
      title: 'A title',
      summary: 'A summary',
      slug: 'a-title',
      published: '2020-06-12T00:00:00Z',
      tags: [
        { codename: 'dotnet', name: '.NET' },
        { codename: 'ai', name: 'AI' },
      ],
    });
  });

  it('falls back to empty values when elements are null', () => {
    expect(
      parseNodeToArticle(
        node({
          title: { value: null },
          summary: { value: null },
          article_url_slug: { value: null },
          publish_date: { value: null },
          article_topics: { value: null },
        })
      )
    ).toEqual({ title: '', summary: '', slug: '', published: '', tags: [] });
  });

  it('drops null tags', () => {
    const { tags } = parseNodeToArticle(
      node({
        article_topics: { value: [null, { codename: 'ai', name: 'AI' }] },
      })
    );
    expect(tags).toEqual([{ codename: 'ai', name: 'AI' }]);
  });
});

describe('toTags', () => {
  it('treats a missing topics list as no tags', () => {
    expect(toTags(null)).toEqual([]);
    expect(toTags(undefined)).toEqual([]);
  });

  it('drops null entries and keeps order', () => {
    expect(
      toTags([{ codename: 'b', name: 'B' }, null, { codename: 'a', name: 'A' }])
    ).toEqual([
      { codename: 'b', name: 'B' },
      { codename: 'a', name: 'A' },
    ]);
  });
});

describe('toTagSummaries', () => {
  const summary = (codename: string, name: string, text: string | null) => {
    return {
      system: { codename, name },
      elements: { summary: { value: text } },
    };
  };

  it('joins counts with summaries in group order', () => {
    expect(
      toTagSummaries(
        [
          { fieldValue: 'ai', totalCount: 3 },
          { fieldValue: 'dotnet', totalCount: 5 },
        ],
        [
          summary('dotnet', '.NET', 'About .NET'),
          summary('ai', 'AI', 'About AI'),
        ]
      )
    ).toEqual([
      { codename: 'ai', name: 'AI', summary: 'About AI', count: 3 },
      { codename: 'dotnet', name: '.NET', summary: 'About .NET', count: 5 },
    ]);
  });

  it('skips tags with no summary entry or no codename', () => {
    expect(
      toTagSummaries(
        [
          { fieldValue: 'orphan', totalCount: 1 },
          { fieldValue: null, totalCount: 2 },
        ],
        [summary('ai', 'AI', 'About AI')]
      )
    ).toEqual([]);
  });

  it('defaults a null summary to an empty string', () => {
    expect(
      toTagSummaries(
        [{ fieldValue: 'ai', totalCount: 1 }],
        [summary('ai', 'AI', null)]
      )
    ).toEqual([{ codename: 'ai', name: 'AI', summary: '', count: 1 }]);
  });
});

describe('formatArticleDate', () => {
  const originalTz = process.env.TZ;
  afterEach(() => {
    if (originalTz === undefined) delete process.env.TZ;
    else process.env.TZ = originalTz;
  });

  it('formats as day, short month, year in en-GB', () => {
    expect(formatArticleDate('2020-06-12T00:00:00Z')).toBe('12 Jun 2020');
  });

  // Kontent publish dates are UTC midnight. Formatting in the viewer's local
  // timezone shows the previous day west of UTC and makes the client render
  // differ from the HTML built in UTC.
  it.each(['UTC', 'America/Los_Angeles', 'Pacific/Auckland'])(
    'shows the same calendar day in %s',
    (tz) => {
      process.env.TZ = tz;
      expect(formatArticleDate('2019-08-05T00:00:00Z')).toBe('5 Aug 2019');
    }
  );
});
