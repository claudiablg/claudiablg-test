import { SizeType } from '../types';
import { ContentMargins, ContentWidths } from './content-width';
import { MediaQueries } from './media-queries';

/**
 * Viewport names.
 */
export enum VIEWPORT {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

/**
 * Breakpoint names
 */
export enum BREAKPOINT {
  //
  // mobile
  //
  mobileXSmall = 'mobileXSmall',
  mobileSmall = 'mobileSmall',
  mobileMedium = 'mobileMedium',
  //
  // tablet
  //
  tabletPortrait = 'tabletPortrait',
  tabletLandscape = 'tabletLandscape',
  //
  // desktop
  //
  desktopSmall = 'desktopSmall',
  desktopMedium = 'desktopMedium',
  desktopLarge = 'desktopLarge',
  desktopXLarge = 'desktopXLarge',
}

/**
 * Representation of a breakpoint in px
 */
export type Breakpoint = number;

/**
 * Breakpoints values in pixel
 */
export type Breakpoints<Override extends undefined | string = undefined> = {
  [key in BREAKPOINT]: Override extends string ? string : Breakpoint;
};

export type PartialLayout<Override extends undefined | string = undefined> = Omit<
  Layout<Override>,
  'var' | 'varNames' | 'media' | 'zIndex'
>;

/**
 * Breakpoints, commonly used content margins and max widths.
 */
export interface Layout<Override extends undefined | string = undefined> {
  breakpoints: Breakpoints<Override>;
  contentMargins: ContentMargins<Override>;
  contentWidth: ContentWidths;
  sidebarWidth: {
    [key in VIEWPORT]: SizeType<Override>;
  };
  navbarHeight: {
    [key in VIEWPORT]: SizeType<Override>;
  };
  asideWidth: SizeType<Override>;
  footerHeight: {
    [key in VIEWPORT]: SizeType<Override>;
  };
  media: MediaQueries<Override>;
  /**
   * One place to define the different z indexes
   */
  zIndex: {
    chatBubble: number;
    notifications: number;
    navBar: number;
    sideBarMobile: number;
    sideBarDesktop: number;
    dialog: number;
    content: number;
  };
}
