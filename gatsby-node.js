const path = require('path');
const { paginate } = require('./src/tools/pagination');

const slash = (filePath) => filePath.replace(/\\/g, '/');

/**
 * Explicit Kontent schema. The source plugin already declares these types with
 * inference off, but marks every element and `elements` itself as nullable and
 * types linked items as the `kontent_item` interface. Redeclare them here with
 * the guarantees the content model gives us so the generated `Queries` types
 * are tighter.
 *
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type kontent_item_home_featured_articles_element {
      name: String!
      type: String!
      value: [kontent_item_article!]! @kontent_item_language_link
    }

    type kontent_item_philosophy_featured_work_element {
      name: String!
      type: String!
      value: [kontent_item_document!]! @kontent_item_language_link
    }

    union kontent_item_article_body_linked_item =
        kontent_item_blockquote
      | kontent_item_rich_blockquote
      | kontent_item_code_block

    type kontent_item_article_body_element {
      name: String!
      type: String!
      value: String
      images: [kontent_item_rich_text_element_image!]!
      links: [kontent_item_rich_text_element_link!]!
      modular_content: [kontent_item_article_body_linked_item!]!
        @kontent_item_language_link
    }

    type kontent_item_article_elements {
      article_topics: kontent_item_taxonomy_element_value!
      article_url_slug: kontent_item_url_slug_element_value!
      body: kontent_item_article_body_element!
      meta_data__description: kontent_item_text_element_value!
      meta_data__keywords: kontent_item_text_element_value!
      publish_date: kontent_item_date_time_element_value!
      summary: kontent_item_text_element_value!
      title: kontent_item_text_element_value!
    }
    type kontent_item_article implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_article_elements!
      preferred_language: String!
    }

    type kontent_item_home_elements {
      featured_articles: kontent_item_home_featured_articles_element!
      introduction: kontent_item_rich_text_element_value!
      meta_data__description: kontent_item_text_element_value!
      meta_data__keywords: kontent_item_text_element_value!
    }
    type kontent_item_home implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_home_elements!
      preferred_language: String!
    }

    type kontent_item_philosophy_elements {
      featured_work: kontent_item_philosophy_featured_work_element!
      introduction: kontent_item_rich_text_element_value!
      meta_data__description: kontent_item_text_element_value!
      meta_data__keywords: kontent_item_text_element_value!
    }
    type kontent_item_philosophy implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_philosophy_elements!
      preferred_language: String!
    }

    type kontent_item_section_elements {
      introduction: kontent_item_rich_text_element_value!
      meta_data__description: kontent_item_text_element_value!
      meta_data__keywords: kontent_item_text_element_value!
    }
    type kontent_item_section implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_section_elements!
      preferred_language: String!
    }

    type kontent_item_tag_summary_elements {
      summary: kontent_item_text_element_value!
    }
    type kontent_item_tag_summary implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_tag_summary_elements!
      preferred_language: String!
    }

    type kontent_item_document_elements {
      asset: kontent_item_asset_element_value!
      summary: kontent_item_text_element_value!
      title: kontent_item_text_element_value!
    }
    type kontent_item_document implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_document_elements!
      preferred_language: String!
    }

    type kontent_item_blockquote_elements {
      text: kontent_item_text_element_value!
    }
    type kontent_item_blockquote implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_blockquote_elements!
      preferred_language: String!
    }

    type kontent_item_rich_blockquote_elements {
      text: kontent_item_rich_text_element_value!
    }
    type kontent_item_rich_blockquote implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_rich_blockquote_elements!
      preferred_language: String!
    }

    type kontent_item_code_block_elements {
      code: kontent_item_text_element_value!
      language: kontent_item_text_element_value!
    }
    type kontent_item_code_block implements Node & kontent_item @dontInfer {
      system: kontent_item_system!
      elements: kontent_item_code_block_elements!
      preferred_language: String!
    }
  `);
};

/** @type {import('gatsby').GatsbyNode['createPages']} */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const articleTemplate = path.resolve('./src/templates/article-template.tsx');
  const journalTemplate = path.resolve('./src/templates/journal-template.tsx');
  const tagTemplate = path.resolve('./src/templates/tag-template.tsx');

  const result = await graphql(`
    query CreatePages {
      allArticles: allKontentItemArticle(
        sort: { elements: { publish_date: { value: DESC } } }
      ) {
        nodes {
          elements {
            article_url_slug {
              value
            }
          }
        }
        totalCount
      }
      allTags: allKontentItemArticle {
        group(
          field: {
            elements: { article_topics: { value: { codename: SELECT } } }
          }
        ) {
          totalCount
          fieldValue
        }
      }
    }
  `);

  if (result.errors || !result.data) {
    reporter.panicOnBuild('Error loading articles from Kontent', result.errors);
    return;
  }

  result.data.allArticles.nodes.forEach((node) => {
    const slug = node.elements?.article_url_slug?.value;
    if (!slug) {
      return;
    }
    createPage({
      path: `/articles/${slug}/`,
      component: slash(articleTemplate),
      context: { slug },
    });
  });

  const postsPerPage = 8;

  paginate(
    '/articles',
    result.data.allArticles.totalCount,
    postsPerPage
  ).forEach(({ path: pagePath, context }) => {
    createPage({
      path: pagePath,
      component: slash(journalTemplate),
      context,
    });
  });

  result.data.allTags.group.forEach((tag) => {
    if (tag.fieldValue === null) {
      return;
    }
    paginate(`/tag/${tag.fieldValue}`, tag.totalCount, postsPerPage).forEach(
      ({ path: pagePath, context }) => {
        createPage({
          path: pagePath,
          component: slash(tagTemplate),
          context: { ...context, codename: tag.fieldValue },
        });
      }
    );
  });
};
