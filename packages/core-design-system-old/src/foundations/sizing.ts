import { VIEWPORT } from './layout';

/**
 * Unique names for each sizing step.
 */
export enum SIZING {
  x0 = 'x0',
  x1 = 'x1',
  x2 = 'x2',
  x3 = 'x3',
  x4 = 'x4',
  x5 = 'x5',
  x6 = 'x6',
  x7 = 'x7',
  x8 = 'x8',
  x9 = 'x9',
  x10 = 'x10',
}

/**
 * Contains CSS variable names for each sizing step
 * @example `--sizing-x1`
 */
export type SizeCSSVarNames = { [key in SIZING]: string };

/**
 * Contains CSS statement to access CSS variables
 * @example `var(--sizing-x1)`
 */
export type SizeCSSVar = { [key in SIZING]: string };

/**
 * Defines in px, rem what a sizing step is.
 *
 * Note: `valueRem` should be used to set CSS variables.
 * Note: variable names should be set according to SizeCSSVarNames.
 *
 * @example
 *  ```css
 *  :root {
 *    --sizing-x1: 9rem
 *  }
 *  ```
 */
export interface SizingStep {
  /**
   * @example 9
   */
  value: number;
  /**
   * @example `9px`
   */
  valuePx: string;
  /**
   * @example `1rem`
   */
  valueRem: string;
}

/**
 * Definition of the sizing steps for each viewport.
 */
export type SizingSteps = { [key in VIEWPORT]: { [key in SIZING]: SizingStep } };

/**
 * A set of predefined sizes from `x1` to `x10`.
 * `x1` usually defines the smallest spacing size to be used and the smallest cap height (text height) (e.g. small label).
 *
 * To optain the next size (e.g. from `x1` -> `x2`), the sizes are multipled by the ratio (e.g. `1.618` the Golden Ratio).
 */
export interface Sizing {
  /**
   * Base font size (in px) to set on the page <html/> element.
   * This defines what `1 rem` is.
   */
  baseFontSize: number;
  baseFontSizePx: string;
  /**
   * The ratio by which we multiply to calculate the next size step.
   * E.g. 1.618 (Golden Ratio)
   * @see https://alistapart.com/article/more-meaningful-typography/
   * @see https://vimeo.com/17079380
   */
  ratio: number;
  /**
   * CSS variable name for each step.
   */
  sizeCSSVarNames: SizeCSSVarNames;
  /**
   * CSS statement to access CSS variables
   */
  sizes: SizeCSSVar;
  /**
   * Size values for each step.
   */
  sizingSteps: SizingSteps;
}
