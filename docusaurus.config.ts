// import {themes as prismThemes} from 'prism-react-renderer';
// import type {Config} from '@docusaurus/types';
// import type * as Preset from '@docusaurus/preset-classic';

// // This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// const config: Config = {
//   title: 'Physical AI & Humanoid Robotics',
//   tagline: 'Essentials of Physical AI and Humanoid Robotics',
//   favicon: 'img/logo.png',

//   // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
//   future: {
//     v4: true, // Improve compatibility with the upcoming Docusaurus v4
//   },

//   // Set the production url of your site here
//   url: 'https://your-docusaurus-site.example.com',
//   // Set the /<baseUrl>/ pathname under which your site is served
//   // For GitHub pages deployment, it is often '/<projectName>/'
//   baseUrl: '/',

//   // GitHub pages deployment config.
//   // If you aren't using GitHub pages, you don't need these.
//   organizationName: 'zarinext', // Usually your GitHub org/user name.
//   projectName: 'ai-native-book', // Usually your repo name.

//  onBrokenLinks: 'warn',
// onBrokenMarkdownLinks: 'warn',


//   // Even if you don't use internationalization, you can use this field to set
//   // useful metadata like html lang. For example, if your site is Chinese, you
//   // may want to replace "en" with "zh-Hans".
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en'],
//   },

//   presets: [
//     [
//       'classic',
//       {
//         docs: {
//           sidebarPath: './sidebars.ts',
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             'https://github.com/zarinext/ai-native-book/tree/main/docusurus-site/',
//         },
//         blog: {
//           showReadingTime: true,
//           feedOptions: {
//             type: ['rss', 'atom'],
//             xslt: true,
//           },
//           // Please change this to your repo.
//           // Remove this to remove the "edit this page" links.
//           editUrl:
//             'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
//           // Useful options to enforce blogging best practices
//           onInlineTags: 'warn',
//           onInlineAuthors: 'warn',
//           onUntruncatedBlogPosts: 'warn',
//         },
//         theme: {
//           customCss: './src/css/custom.css',
//         },
//       } satisfies Preset.Options,
//     ],
//   ],

//   themeConfig: {
//     // Replace with your project's social card
//     image: 'img/docusaurus-social-card.jpg',
//     colorMode: {
//       respectPrefersColorScheme: true,
//     },
//     navbar: {
//       title: 'Physical AI & Humanoid Robotics',
//       logo: {
//         alt: 'Physical AI & Humanoid Robotics Logo',
//         src: 'img/logo.png',
//       },
//       items: [
//         {
//           type: 'docSidebar',
//           sidebarId: 'bookSidebar',
//           position: 'left',
//           label: 'Book',
//         },
       
//         {
//           href: 'https://github.com/ZARMAIN-AHMED/Physical-AI---Humanoid-Robotics-Course',
//           label: 'GitHub',
//           position: 'right',
//         },

//       ],
//     },
//     footer: {
//       style: 'light',
//       links: [
//         {
//           title: 'Docs',
//           items: [
//             {
//               label: 'Book',
//               to: '/docs/book/course-overview',
//             },
//           ],
//         },
//         {
//           title: 'Community',
//           items: [
//             {
//               label: 'GitHub',
//               href: 'https://github.com/ZARMAIN-AHMED/Physical-AI---Humanoid-Robotics-Course',
//             },
//           ],
//         },
//       ],
//       copyright: `Copyright © ${new Date().getFullYear()} Trion AI. Built with Docusaurus.`,
//     },
//     prism: {
//       theme: prismThemes.github,
//       darkTheme: prismThemes.dracula,
//     },
//   } satisfies Preset.ThemeConfig,

// };

// export default config;

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Essentials of Physical AI and Humanoid Robotics',
  favicon: 'img/rob.png',

  future: {
    v4: true,
  },

  url: 'https://ai-textbook-six.vercel.app',
  baseUrl: '/',

  // trailingSlash: false,

  organizationName: 'zarinext',
  projectName: 'ai-native-book',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
  defaultLocale: 'en',
  locales: ['en', 'ur'],
  localeConfigs: {
    en: {
      label: 'English',
      direction: 'ltr',
    },
    ur: {
      label: 'اردو',
      direction: 'rtl',
    },
  },
},

// i18n: {
//   defaultLocale: 'en',
//   locales: ['en', 'ur'],
//   localeConfigs: {
//     ur: {
//       label: 'اردو',
//       direction: 'rtl',
//     },
//   },
// },


// docs: {
//   routeBasePath: 'docs',
//   sidebarPath: './sidebars.ts',
// },









  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/zarinext/ai-native-book/tree/main/docusurus-site/',
        },

        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },

        theme: {
          customCss: './src/css/custom.css',
        },

        sitemap: {
          changefreq: 'weekly',
          priority: 0.8,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI & Humanoid Robotics Logo',
        src: 'img/rob.png',
      },
      style: 'dark', // using dark mode as base
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: 'Book',
        },
        {
          to: '/login',
          label: 'Login',
          position: 'right',
          className: 'custom-auth-btn',
        },
        {
          href: 'https://github.com/Shereensheer/AI-BOOK',
          label: 'GitHub',
          position: 'right',
        },

        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Book',
              to: '/docs/book/course-overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href:
                'https://github.com/Shereensheer/AI-BOOK',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Trion AI. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

  } satisfies Preset.ThemeConfig,

  

  
  
};

export default config;
