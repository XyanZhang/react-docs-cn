import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'fe7'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '8b4'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '5e6'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '61e'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '6dc'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'f2d'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '5de'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'ea9'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', 'c18'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', 'c49'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '881'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '640'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'dd6'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '49d'),
    routes: [
      {
        path: '/docs/安装/',
        component: ComponentCreator('/docs/安装/', '9f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/',
        component: ComponentCreator('/docs/快速开始/', '5b8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/congratulations',
        component: ComponentCreator('/docs/快速开始/congratulations', '752'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/create-a-blog-post',
        component: ComponentCreator('/docs/快速开始/create-a-blog-post', '6f0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/create-a-document',
        component: ComponentCreator('/docs/快速开始/create-a-document', 'c8d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/create-a-page',
        component: ComponentCreator('/docs/快速开始/create-a-page', 'dae'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/deploy-your-site',
        component: ComponentCreator('/docs/快速开始/deploy-your-site', '46f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/快速开始/markdown-features',
        component: ComponentCreator('/docs/快速开始/markdown-features', 'f1e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---extras',
        component: ComponentCreator('/docs/category/tutorial---extras', 'f09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', 'fdd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/tutorial-extras/translate-your-site', '2d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2dc'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
