import * as core from '@newrade/core-gatsby-config';
import { SOURCE_INSTANCE_NAME } from '@newrade/core-gatsby-config';
import { loadDotEnv, logEnvVariables } from '@newrade/core-utils';
import path from 'path';
import packageJson from './package.json';
import { Env, ENV } from './types/dot-env';

// Set options as a parameter, environment variable, or rc file.

/**
 * Gatsby Config API
 *
 * @see https://www.gatsbyjs.org/docs/gatsby-config/
 * @see https://www.gatsbyjs.com/docs/api-files-gatsby-config/
 */

const env = loadDotEnv<ENV>({
  schema: Env,
  dotEnvPath: path.resolve(__dirname, '.env'),
  packageName: packageJson.name,
});
logEnvVariables({ packageName: packageJson.name, env });

const config: core.GastbySiteConfig = {
  siteMetadata: {
    title: `Core Gatsby Website`,
    description: `Gatsby powered MIR website`,
    siteUrl: env.APP_URL,
    siteEnv: env.APP_ENV,
    languages: {
      langs: [core.SITE_LANGUAGES.FR, core.SITE_LANGUAGES.EN],
      defaultLangKey: core.SITE_LANGUAGES.FR,
    },
  },
  plugins: [
    /**
     * Project Specific Plugins
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: SOURCE_INSTANCE_NAME.DOCS,
        path: path.resolve('..', '..', 'docs'),
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: path.resolve('..', '..', 'docs'),
        ignore: [`**/*.treat.ts`, `**/*.tsx`],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: env.CONTENTFUL_SPACEID_NEWRADE,
        accessToken: env.CONTENTFUL_DELIVERY_TOKEN_NEWRADE,
        environment: env.CONTENTFUL_ENV,
      },
    },
    /**
     * Core Plugins
     */
    core.getGatsbyTsPluginConfig({
      documentPaths: ['./gatsby-*.{ts,tsx}', './src/**/*.{ts,tsx}', './src/**/*.{js,jsx}'],
    }),
    core.getGatsbyReactSvgConfig(),
    ...core.getGastbyPluginPageCreatorConfig(),
    core.getGastbyPluginTreatConfig(),
    core.getGatsbyTransformerSharp(),
    core.getGatsbyPluginSharp(),
    core.getGastbyPluginTreatConfig(),
    core.getGatsbyPluginMdx(),
    core.getGatsbyImageFolder(),
    core.getGatsbyPluginReactHelmet(),
    core.getGatsbyPluginSitemap(),
    core.getGatsbyPluginRobotsTxt({ env }),
    core.getGatsbyNetlifyPlugin(),
    core.getGastbyCorePluginConfig({
      packageName: packageJson.name,
    }),
    // core.getGatsbyPluginPreloadFonts(),
  ],
};

export default config;
