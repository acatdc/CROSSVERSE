// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CROSSVERSE Wiki',
  tagline: 'Open platform for WEB3 metaverses',
  favicon: 'img/favicon.ico',

  url: 'https://wiki.crossverse.tech',
  baseUrl: '/',

  organizationName: 'crossverse',
  projectName: 'wiki',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CROSSVERSE Wiki',
        items: [
          {
            href: 'https://crossverse.tech',
            label: 'Main Site',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `CROSSVERSE ${new Date().getFullYear()}`,
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
