const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Crossverse Wiki',
      link: {
        type: 'doc',
        id: 'index',
      },
      items: [
        'crossverse-wiki/general-overview',
        {
          type: 'category',
          label: 'Platform Entities',
          link: {
            type: 'doc',
            id: 'crossverse-wiki/platform-entities',
          },
          items: [
            'crossverse-wiki/platform-entities/hyp-0',
            'crossverse-wiki/platform-entities/qbits',
            'crossverse-wiki/platform-entities/crossverse-api',
          ],
        },
        'crossverse-wiki/usecases',
        'crossverse-wiki/faq',
        'crossverse-wiki/project-backstory-philosophy',
        'crossverse-wiki/links',
        {
          type: 'category',
          label: 'Partnerships',
          link: {
            type: 'doc',
            id: 'crossverse-wiki/partnerships',
          },
          items: [
            'crossverse-wiki/partnerships/decentraland',
          ],
        },
        {
          type: 'category',
          label: 'Alpha Tests',
          link: {
            type: 'doc',
            id: 'crossverse-wiki/alpha-tests',
          },
          items: [
            'crossverse-wiki/alpha-tests/alpha-1-stage',
            'crossverse-wiki/alpha-tests/alpha-2-stage',
            'crossverse-wiki/alpha-tests/alpha-dcl-retro-testing-tuesdays',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
