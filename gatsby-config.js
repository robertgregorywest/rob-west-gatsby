const lost = require('lost');
const pxtorem = require('postcss-pxtorem');

const url = 'https://robwest.info/';

require('dotenv').config();

module.exports = {
  // These properties are used by gatsby-plugin-sitemap
  // https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#how-to-use
  siteMetadata: {
    url,
    siteUrl: url,
  },
  plugins: [
    {
      resolve: '@kentico/gatsby-source-kontent',
      options: {
        projectId: process.env.KONTENT_PROJECT_ID,
        usePreviewUrl: process.env.KONTENT_PREVIEW_ENABLED && process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true',
        authorizationKey: process.env.KONTENT_PREVIEW_ENABLED && process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true'
          ? process.env.KONTENT_PREVIEW_KEY
          : undefined,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(',').map(lang => lang.trim()),
        includeTaxonomies: true,
      },
    },
    {
      resolve: '@rshackleton/gatsby-transformer-kontent-image',
      options: {
        remote: true,
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: { trackingId: 'UA-7143106-1' },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['IBM Plex Sans:400,500'],
        display: 'swap',
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Rob West\'s Website',
        short_name: 'Rob West',
        start_url: '/',
        background_color: '#fafafa',
        theme_color: '#222',
        display: 'standalone',
        icon: 'src/assets/icons/icon.png',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          lost(),
          pxtorem({
            rootValue: 16,
            unitPrecision: 5,
            propList: [
              'font',
              'font-size',
              'line-height',
              'letter-spacing',
              'margin',
              'margin-top',
              'margin-left',
              'margin-bottom',
              'margin-right',
              'padding',
              'padding-top',
              'padding-left',
              'padding-bottom',
              'padding-right',
              'border-radius',
              'width',
              'max-width',
            ],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
          }),
        ],
        precision: 8,
      },
    },
    'gatsby-plugin-eslint',
  ],
};
