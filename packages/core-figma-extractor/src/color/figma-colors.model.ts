export type FigmaColor = {
  id: string | number;
  colorType: string;
  colorLevel: string;
  r: number;
  g: number;
  b: number;
  a: number;
};

/**
 * Raw / Unformatted color tokens
 */
export type ColorTokens = {
  [key: string]: FigmaColor;
};
