/**
 * Needed so ts-node can find core-types
 * @see https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-
 */
/// <reference types="./types/core-types" />

delete process.env.TS_NODE_PROJECT; // see https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/32

// @ts-ignore
import nodeExternals from 'webpack-node-externals';
import * as core from '@newrade/core-webpack-config';
import dotenv from 'dotenv';
import path from 'path';
import * as tsloader from 'ts-loader';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import WebpackOptions from 'webpack/declarations/WebpackOptions';
dotenv.config();

export const commonConfig: WebpackOptions.WebpackOptions = {
  target: 'node',
  // https://codeburst.io/use-webpack-with-dirname-correctly-4cad3b265a92
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  entry: {
    ['server-express']: path.resolve(__dirname, 'src/server-express.ts'),
  },
  devtool: 'source-map',
  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
  },
  module: {
    rules: [
      // https://www.npmjs.com/package/node-loader
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
        include: [path.resolve('src/**/*'), path.resolve('../**/*')],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
              logLevel: 'WARN',
              projectReferences: true,
            } as Partial<tsloader.Options>,
          },
        ],
      },
      /**
       * @see https://github.com/apollographql/graphql-tag#webpack-loading-and-preprocessing
       */
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  resolve: {
    mainFields: ['main', 'module'],
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      // @ts-ignore
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.build.json',
        logLevel: 'WARN',
      }),
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  plugins: [
    core.getWebpackCleanPlugin(),
    core.getWebpackCopyPlugin({
      patterns: [{ from: 'src/**/*.graphql', to: '' }],
    }),
    // new (webpack as any).DefinePlugin({
    //   NODE_ENV: process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('development'),
    //   NODE_VERSION: process.env.version ? JSON.stringify(process.env.version) : JSON.stringify('unknown'),
    //   GRAPH_CMS_API_URL_MIR: JSON.stringify(process.env.GRAPH_CMS_API_URL_MIR),
    //   GRAPH_CMS_AUTH_TOKEN_MIR: JSON.stringify(process.env.GRAPH_CMS_AUTH_TOKEN_MIR),
    // }),
  ],
};
