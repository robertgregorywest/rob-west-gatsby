import { describe, expect, it } from 'vitest';
import { canonicalUrl, pageTitle, paginate } from './pagination';

describe('paginate', () => {
  it('creates no pages for no items', () => {
    expect(paginate('/articles', 0, 8)).toEqual([]);
  });

  it('puts page 0 at the base path and later pages under /page/N', () => {
    expect(paginate('/articles', 17, 8).map((page) => page.path)).toEqual([
      '/articles',
      '/articles/page/1',
      '/articles/page/2',
    ]);
  });

  it('gives each page its window, neighbours and edge flags', () => {
    const [first, middle, last] = paginate('/tag/ai', 17, 8);
    expect(first?.context).toEqual({
      basePath: '/tag/ai',
      currentPage: 0,
      limit: 8,
      skip: 0,
      prevPagePath: '/tag/ai',
      nextPagePath: '/tag/ai/page/1',
      hasPrevPage: false,
      hasNextPage: true,
    });
    expect(middle?.context).toMatchObject({
      skip: 8,
      prevPagePath: '/tag/ai',
      nextPagePath: '/tag/ai/page/2',
      hasPrevPage: true,
      hasNextPage: true,
    });
    expect(last?.context).toMatchObject({
      skip: 16,
      prevPagePath: '/tag/ai/page/1',
      hasPrevPage: true,
      hasNextPage: false,
    });
  });

  it('has a single page with no neighbours when everything fits', () => {
    const [only, ...rest] = paginate('/articles', 8, 8);
    expect(rest).toEqual([]);
    expect(only?.context).toMatchObject({
      hasPrevPage: false,
      hasNextPage: false,
    });
  });
});

describe('pageTitle', () => {
  it('leaves the first page untitled by number', () => {
    expect(pageTitle('Journal', 0)).toBe('Journal');
  });

  it('numbers later pages from 1 for readers', () => {
    expect(pageTitle('Journal', 1)).toBe('Journal - Page 2');
  });
});

describe('canonicalUrl', () => {
  it('ends with a slash and tolerates a trailing slash on the site URL', () => {
    expect(canonicalUrl('https://robwest.info/', '/articles', 0)).toBe(
      'https://robwest.info/articles/'
    );
  });

  it('includes the page number after page 0', () => {
    expect(canonicalUrl('https://robwest.info', '/tag/ai', 2)).toBe(
      'https://robwest.info/tag/ai/page/2/'
    );
  });

  it('copes with a missing site URL', () => {
    expect(canonicalUrl(null, '/articles', 0)).toBe('/articles/');
  });
});
