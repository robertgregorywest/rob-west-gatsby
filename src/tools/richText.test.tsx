import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { getLinkText, resolveImage, toImageItems } from './richText';

vi.mock('@kontent-ai/gatsby-components', () => {
  return {
    ImageElement: ({
      image,
      alt,
    }: {
      image: { url: string };
      alt?: string;
    }) => <img src={image.url} alt={alt} />,
  };
});

const image = {
  image_id: 'id-1',
  url: 'https://example.com/a.png',
  width: 800,
  height: 600,
  description: 'A picture',
};

describe('toImageItems', () => {
  it('returns an empty list for null or undefined', () => {
    expect(toImageItems(null)).toEqual([]);
    expect(toImageItems(undefined)).toEqual([]);
  });

  it('keeps images that have dimensions', () => {
    expect(toImageItems([image])).toEqual([image]);
  });

  it('drops null images and images missing a width or height', () => {
    expect(
      toImageItems([
        null,
        { ...image, width: null },
        { ...image, height: null },
        image,
      ])
    ).toEqual([image]);
  });
});

describe('resolveImage', () => {
  it('renders an empty fragment when there is no image', () => {
    expect(renderToStaticMarkup(resolveImage())).toBe('');
  });

  it('renders the image with its description as alt text and caption', () => {
    // React 19 may hoist an image preload <link> ahead of the figure.
    expect(renderToStaticMarkup(resolveImage(image))).toContain(
      '<figure><img src="https://example.com/a.png" alt="A picture"/>' +
        '<figcaption>A picture</figcaption></figure>'
    );
  });

  it('omits alt text when the image has no description', () => {
    const html = renderToStaticMarkup(
      resolveImage({ ...image, description: null })
    );
    expect(html).not.toContain('alt=');
  });
});

describe('getLinkText', () => {
  it('returns the text of the first child node', () => {
    expect(getLinkText({ children: [{ data: 'link text' }] })).toBe(
      'link text'
    );
  });

  it('returns null when there are no children', () => {
    expect(getLinkText({})).toBeNull();
    expect(getLinkText({ children: [] })).toBeNull();
  });

  it('returns null when the first child is not a text node', () => {
    expect(getLinkText({ children: [{ name: 'img' }] })).toBeNull();
    expect(getLinkText({ children: [null] })).toBeNull();
    expect(getLinkText({ children: [{ data: 42 }] })).toBeNull();
  });
});
