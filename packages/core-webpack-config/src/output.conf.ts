import { OutputOptions } from 'webpack/declarations/WebpackOptions';

export const output: { [key in 'dev' | 'prod']: OutputOptions } = {
  dev: {
    filename: '[name].bundle.js',
    pathinfo: true,
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[file].map',
    globalObject: 'this',
  },
  prod: {
    filename: '[name].bundle.[hash].js',
    pathinfo: true,
    chunkFilename: '[id].[hash].chunk.js',
    sourceMapFilename: '[file].map',
    globalObject: 'this',
  },
};
