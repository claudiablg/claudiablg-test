import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import { RuleSetUseItem } from 'webpack/declarations/WebpackOptions';
import { cssNanoConfig } from './css-nano.config';

export const postCssLoader: RuleSetUseItem = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    ident: 'postcss',
    plugins: [autoprefixer({ grid: true }), cssnano(cssNanoConfig), postcssPresetEnv()],
  },
};
