import { Value } from '../utilities/value';

/**
 * Viewport names.
 */
export enum VIEWPORT {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

/**
 * Breakpoint names.
 */
export enum BREAKPOINT {
  mobileXSmall = 'mobileXSmall', // mobile
  mobileSmall = 'mobileSmall',
  mobileMedium = 'mobileMedium',
  tabletPortrait = 'tabletPortrait', // tablet
  tabletLandscape = 'tabletLandscape',
  desktopSmall = 'desktopSmall',
  desktopMedium = 'desktopMedium', // desktop
  desktopLarge = 'desktopLarge',
  desktopXLarge = 'desktopXLarge',
}

/**
 * Representation of a breakpoint, including its value
 * in pixel
 */
export type Breakpoint = Value;

/**
 * Breakpoints values in pixel.
 */
export type Breakpoints = { [key in BREAKPOINT]: Breakpoint };

/**
 * Breakpoint names.
 */
export enum MEDIA_QUERIES {
  mobileXSmall = 'mobileXSmall', // mobile
  mobileSmall = 'mobileSmall',
  mobileMedium = 'mobileMedium',
  tabletPortrait = 'tabletPortrait', // tablet
  tabletLandscape = 'tabletLandscape',
  desktopSmall = 'desktopSmall',
  desktopMedium = 'desktopMedium', // desktop
  desktopLarge = 'desktopLarge',
  desktopXLarge = 'desktopXLarge',
}

/**
 * Representation of a media query.
 * @example `screen and (min-width: ... and (max-width: ...)`
 */
export type MediaQuery = string;

/**
 * Breakpoints values in pixel.
 */
export type MediaQueries = { [key in VIEWPORT]: MediaQuery } & {
  tabletPlus: MediaQuery;
};

/**
 * Content margins for different device formats.
 */
export type ContentMargins = { [key in VIEWPORT]: Value };

/**
 * Content max width for larger viewports.
 */
export interface ContentWidths {
  desktopMaxWidth: Value;
}

/**
 * Breakpoints, commonly used content margins and max widths.
 */
export interface Layout {
  breakpoints: Breakpoints;
  media: MediaQueries;
  contentMargins: ContentMargins;
  contentWidth: ContentWidths;
}
