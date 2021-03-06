import { style } from 'treat';
import { Theme } from '../design-system';
import { getCSSColor } from '../utilities/colors.utilities';

export const styles = {
  wrapper: style(({ cssTheme, theme }: Theme) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: cssTheme.layout.var.navbarHeight,
    maxHeight: cssTheme.layout.var.navbarHeight,
    color: cssTheme.colors.colorIntents.primaryText,

    backgroundColor: getCSSColor({ h: 0, s: 0, l: 100, a: 100 }),
    boxShadow: `rgba(33, 33, 33, 0.15) 0px 1px 2px`,

    zIndex: cssTheme.layout.zIndex.navBar,
  })),
  content: style(({ cssTheme, theme }: Theme) => ({
    height: `100%`,
  })),
  mobileWrapper: style(({ cssTheme, theme }: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    height: '100%',
  })),
  desktopMenu: style(({ cssTheme, theme }: Theme) => ({
    display: 'none',
    '@media': {
      [cssTheme.layout.media.desktopSmall]: {
        display: 'grid',
      },
    },
  })),
  mobileMenu: style(({ cssTheme, theme }: Theme) => ({
    '@media': {
      [cssTheme.layout.media.desktopSmall]: {
        display: 'none',
      },
    },
  })),

  icon: style(({ cssTheme, theme }: Theme) => ({
    height: 28,
    width: 28,
  })),
  logoMobile: style(({ cssTheme, theme }: Theme) => ({
    maxHeight: `100%`,
  })),
  logoDesktop: style(({ cssTheme, theme }: Theme) => ({
    maxHeight: `100%`,
  })),
  logoWrapper: style(({ cssTheme, theme }: Theme) => ({
    height: cssTheme.layout.var.navbarHeight,
    justifyContent: 'center',
  })),
};
