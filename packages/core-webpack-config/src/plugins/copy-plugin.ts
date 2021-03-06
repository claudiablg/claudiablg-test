import { WebpackPluginInstance } from 'webpack/declarations/WebpackOptions';
import CopyWebpackPlugin from 'copy-webpack-plugin';

type CopyWebpackPluginPattern = {
  from: string;
  to: string;
};

type CopyWebpackPluginOptions = {
  patterns: CopyWebpackPluginPattern[];
};

/**
 * @see https://webpack.js.org/plugins/copy-webpack-plugin/
 */
export const getWebpackCopyPlugin: (options: CopyWebpackPluginOptions) => WebpackPluginInstance = (
  options
) => new CopyWebpackPlugin(options);
