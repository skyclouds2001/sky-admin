import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SkyAdmin',
  description: 'A background management system developed by skyclouds2001.',
  lang: 'en-US',
  base: '/',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Document',
        link: '/docs',
      },
    ],
    sidebar: {},
    editLink: {
      pattern: 'https://github.com/skyclouds2001/SkyAdmin/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/skyclouds2001/SkyAdmin',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present skyclouds2001',
    },
  },
})
