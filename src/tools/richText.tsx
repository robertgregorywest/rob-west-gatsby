import * as React from 'react';
import { ImageElement } from '@kontent-ai/gatsby-components';

type ImageItem = React.ComponentProps<typeof ImageElement>['image'];

type QueryImage = {
  readonly image_id: string;
  readonly url: string;
  readonly width: number | null;
  readonly height: number | null;
  readonly description: string | null;
};

export const toImageItems = (
  images: ReadonlyArray<QueryImage | null> | null | undefined
): ImageItem[] =>
  (images ?? []).flatMap((image) => {
    if (image === null) {
      return [];
    }
    if (image.width === null || image.height === null) {
      return [];
    }
    return [{ ...image, width: image.width, height: image.height }];
  });

export const resolveImage = (image?: ImageItem) =>
  image ? (
    <figure>
      <ImageElement image={image} alt={image.description ?? undefined} />
      <figcaption>{image.description}</figcaption>
    </figure>
  ) : (
    <></>
  );

type TextNode = { data: string };

const isTextNode = (node: unknown): node is TextNode =>
  typeof node === 'object' &&
  node !== null &&
  typeof (node as TextNode).data === 'string';

export const getLinkText = (domNode: { children?: unknown[] }) => {
  const first = domNode.children?.[0];
  return isTextNode(first) ? first.data : null;
};
