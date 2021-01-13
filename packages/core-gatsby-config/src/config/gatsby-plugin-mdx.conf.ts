import * as coreWebpackConfig from '@newrade/core-webpack-config';
import Gatsby from 'gatsby';

/**
 * gatsby-plugin-mdx
 * @see https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx#readme
 */
export function getGatsbyPluginMdx(): Gatsby.PluginRef[] {
  return [
    /**
     * @see https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx#gatsby-remark-plugins
     */
    {
      resolve: `gatsby-remark-images`,
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          /**
           * @see https://www.gatsbyjs.com/plugins/gatsby-remark-copy-linked-files
           */
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'markdown-assets',
              ignoreFileExtensions: [],
            },
          },
          /**
           * gatsby-remark-prismjs
           * @see https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-prismjs
           */
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          // {
          //   resolve: `gatsby-remark-abbr`,
          // },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
        ],
        // see https://github.com/remarkjs/remark/blob/master/doc/plugins.md#list-of-plugins
        remarkPlugins: [
          coreWebpackConfig.remarkExternalLinksPlugin,
          coreWebpackConfig.remarkUnwrapImagesPlugin,
          coreWebpackConfig.remarkHtmlPlugin,
        ],
        // see https://github.com/rehypejs/rehype/blob/master/doc/plugins.md#list-of-plugins
        rehypePlugins: [coreWebpackConfig.rehypeSlugPlugin, coreWebpackConfig.rehypeAutoLinkHeadingsPlugin],
      },
    },
  ];
}
