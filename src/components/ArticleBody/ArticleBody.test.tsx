import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import ArticleBody from '.';

vi.mock('gatsby', () => {
  return {
    graphql: () => '',
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// The real RichTextElement pulls in its own nested React 18 through a CJS
// require, which vitest can't redirect. This stand-in calls the resolvers the
// way the library does, so the tests cover ArticleBody's own wiring.
vi.mock('@kontent-ai/gatsby-components', () => {
  type Resolvers = {
    value: string;
    linkedItems: Array<{ system: { codename: string } }>;
    links: Array<{ url_slug: string }>;
    resolveLinkedItem: (item: unknown) => React.ReactNode;
    resolveLink: (link: unknown, domNode: unknown) => React.ReactNode;
  };
  return {
    ImageElement: () => null,
    RichTextElement: ({
      value,
      linkedItems,
      links,
      resolveLinkedItem,
      resolveLink,
    }: Resolvers) => (
      <div>
        <p>{value}</p>
        {linkedItems.map((item) => (
          <React.Fragment key={item.system.codename}>
            {resolveLinkedItem(item)}
          </React.Fragment>
        ))}
        {links.map((link) => (
          <React.Fragment key={link.url_slug}>
            {resolveLink(link, { children: [{ data: 'Other' }] })}
          </React.Fragment>
        ))}
      </div>
    ),
  };
});

const body = (
  value: string,
  modular_content: Array<Record<string, unknown>> = [],
  links: Array<Record<string, unknown>> = []
) =>
  ({
    value,
    modular_content,
    links,
    images: [],
  }) as unknown as Queries.ArticleBodyInfoFragment;

const render = (value: Queries.ArticleBodyInfoFragment | null) =>
  renderToStaticMarkup(<ArticleBody body={value} />);

describe('ArticleBody', () => {
  it('renders an empty body when there is no body', () => {
    expect(render(null)).toBe('<div><p></p></div>');
  });

  it('renders paragraphs', () => {
    expect(render(body('Hello'))).toContain('<p>Hello</p>');
  });

  it('renders a plain quote as text', () => {
    const html = render(
      body('', [
        {
          system: { codename: 'q', type: 'blockquote' },
          elements: { text: { value: 'a <b>plain</b> quote' } },
        },
      ])
    );
    expect(html).toContain(
      '<blockquote>a &lt;b&gt;plain&lt;/b&gt; quote</blockquote>'
    );
  });

  it('renders a rich quote as HTML', () => {
    const html = render(
      body('', [
        {
          system: { codename: 'rq', type: 'rich_blockquote' },
          elements: { text: { value: 'a <b>rich</b> quote' } },
        },
      ])
    );
    expect(html).toContain('<blockquote>a <b>rich</b> quote</blockquote>');
  });

  it('renders a code block with highlighting', () => {
    const html = render(
      body('', [
        {
          system: { codename: 'c', type: 'code_block' },
          elements: {
            language: { value: 'javascript' },
            code: { value: 'const a = 1;' },
          },
        },
      ])
    );
    expect(html).toContain('hljs');
    expect(html).toContain('hljs-keyword');
  });

  it('turns links to other articles into internal links', () => {
    const html = render(
      body('', [], [{ link_id: 'l1', url_slug: 'other-article' }])
    );
    expect(html).toContain('<a href="/articles/other-article">Other</a>');
  });
});
