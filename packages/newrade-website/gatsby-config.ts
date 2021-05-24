import * as common from '@newrade/core-common';
import * as core from '@newrade/core-gatsby-config';
import { loadDotEnv, logEnvVariables, toBoolean } from '@newrade/core-utils';
import path from 'path';
import packageJson from './package.json';
import { Env, ENV } from './types/dot-env';

const env = loadDotEnv<ENV>({
  schema: Env,
  dotEnvPath: path.resolve(__dirname, '.env'),
  packageName: packageJson.name,
});
logEnvVariables<ENV>({ packageName: packageJson.name, env });

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const config: core.GastbySiteConfig = {
  flags: {
    PRESERVE_WEBPACK_CACHE: toBoolean(env.GATSBY_PRESERVE_WEBPACK_CACHE),
    PRESERVE_FILE_DOWNLOAD_CACHE: toBoolean(env.GATSBY_PRESERVE_FILE_DOWNLOAD_CACHE),
    QUERY_ON_DEMAND: toBoolean(env.GATSBY_QUERY_ON_DEMAND),
    LAZY_IMAGES: toBoolean(env.GATSBY_LAZY_IMAGES),
    PARALLEL_SOURCING: toBoolean(env.GATSBY_PARALLEL_SOURCING),
    DEV_SSR: toBoolean(env.GATSBY_DEV_SSR),
    FAST_DEV: toBoolean(env.GATSBY_FAST_DEV),
    FAST_REFRESH: toBoolean(env.GATSBY_FAST_REFRESH),
    ENABLE_GATSBY_REFRESH_ENDPOINT: toBoolean(env.ENABLE_GATSBY_REFRESH_ENDPOINT),
  },
  siteMetadata: {
    title: `Newrade Website`,
    description: `Newrade's main website`,
    siteUrl: `${env.APP_PROTOCOL}://${env.APP_HOST}${+env.APP_PORT === 443 || ':' + env.APP_PORT}`,
    siteEnv: env.APP_ENV,
    languages: {
      langs: [common.SITE_LANGUAGES.EN_CA, common.SITE_LANGUAGES.FR_CA],
      defaultLangKey: common.SITE_LANGUAGES.EN_CA,
    },
  },
  plugins: [
    /**
     * Project Specific Plugins
     */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Newrade`,
        short_name: `Newrade`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#6061EC`,
        display: `standalone`,
        icon: `src/images/favicon.svg`,
      },
    },
    {
      /**
       * @see https://www.gatsbyjs.com/plugins/gatsby-source-contentful/
       */
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: env.CONTENTFUL_SPACEID_NEWRADE,
        accessToken: env.CONTENTFUL_DELIVERY_TOKEN_NEWRADE,
        environment: env.CONTENTFUL_ENV,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-load-script',
    //   options: {
    //     id: `hs-script-loader`,
    //     async: 'true',
    //     defer: 'true',
    //     src: 'https://js.hs-scripts.com/7954462.js',
    //   },
    // },
    /**
     * Core Plugins
     */
    core.getGatsbyPluginLoadableComponents(),
    ...core.getGatsbyPluginTypeScriptConfig({
      documentPaths: [
        '../core-gatsby-ui/src/fragments/gatsby/**/*.{ts,tsx}',
        '../core-gatsby-ui/src/fragments/contentful/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
      ],
    }),
    core.getGatsbyPluginCatchLinks(),
    core.getGatsbyReactSvgConfig(),
    ...core.getGastbyPluginPageCreatorConfig(),
    core.getGastbyPluginTreatConfig(),
    core.getGatsbyPluginPostCSS(),
    core.getGatsbyTransformerSharp(),
    core.getGatsbyPluginSharp(),
    ...core.getGatsbyPluginMdx(),
    ...core.getGatsbyImageFolder({
      pathImgDir: path.join(__dirname, `/src/images`),
    }),
    core.getGatsbyPluginReactHelmet(),
    core.getGatsbyPluginSitemap(),
    core.getGatsbyPluginRobotsTxt({ env }),
    core.getGatsbyNetlifyPlugin(),
    core.getGastbyCoreContentfulPluginConfig({
      packageName: packageJson.name,
      locales: ['fr-CA', 'en-CA'],
      features: {
        renderPages: true,
        renderBlogPosts: false,
        renderPortfolio: false,
      },
    }),
    core.getGastbyCorePluginConfig({
      packageName: packageJson.name,
      features: {
        renderDesignSystemPages: true,
        renderDocsPages: true,
      },
    }),
    core.getGatsbyPluginPreloadFonts(),
  ],
};

export default config;
