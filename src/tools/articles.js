export default function parseNodeToArticle(node) {
  const {
    elements: {
      title: { value: title },
      summary: { value: summary },
      article_url_slug: { value: slug },
      publish_date: { value: published },
      article_topics: { value: tags },
    },
  } = node;
  return {
    title,
    summary,
    slug,
    published,
    tags,
  };
}
