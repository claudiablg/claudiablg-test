import { Color } from '../primitives/color';
import { ColorType, NumberType } from '../types';

/**
 * Representation of a box shadow.
 */
export type BoxShadow = {
  /**
   * Blur value in px.
   */
  blur?: number;
  /**
   * Spread value in px.
   */
  spread?: number;
  /**
   * TODO
   */
  offsetX?: number;
  /**
   * TODO
   */
  offsetY?: number;
  /**
   * The box shadow's color.
   */
  color?: Color;
};

/**
 * Levels of shadows in the system.
 */
export type Shadows<Override extends undefined | string = undefined> = {
  light: Override extends string ? string : BoxShadow;
  medium: Override extends string ? string : BoxShadow;
  heavy: Override extends string ? string : BoxShadow;
} & { [key: string]: Override extends string ? string : BoxShadow };

/**
 * Representation of a background, either a plain background with a color
 * or a transparent background with a blurring effect.
 */
export type OverlayBackground<Override extends undefined | string = undefined> = {
  color: ColorType<Override>;
  blur?: NumberType<Override>;
};

/**
 * Levels of overlays in the system.
 */
export type Overlays = {
  light: OverlayBackground;
  medium: OverlayBackground;
  heavy: OverlayBackground;
} & { [key: string]: string };

/**
 * Shadows, elevation, blurs and other visual effects.
 */
export interface Effects<Override extends undefined | string = undefined> {
  shadows: Shadows<Override>;
  innerShadows: Shadows<Override>;
  // TODO
  // textShadows
  // overlays: Overlays;
}
