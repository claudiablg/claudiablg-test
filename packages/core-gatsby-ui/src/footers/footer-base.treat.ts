import { Theme } from '@newrade/core-react-ui/lib/design-system';
import { globalThemeReversedSelector } from '@newrade/core-react-ui/lib/global/global-theme-classnames';
import { globalStyle, style } from 'treat';

export const wrapper = style(({ theme, cssTheme }: Theme) => ({
  width: '100%',
  padding: `${cssTheme.sizing.var.x5} 0`,
}));

/**
 *
 * Variants
 *
 */

export const primary = style(({ theme, cssTheme }: Theme) => ({
  backgroundColor: cssTheme.colors.colorIntents.background0,
}));
export const primaryReversed = style(({ theme, cssTheme }: Theme) => ({}));
globalStyle(
  `${globalThemeReversedSelector} ${primary}, ${primaryReversed}`,
  ({ theme, cssTheme }: Theme) => ({
    backgroundColor: cssTheme.colors.colors.grey[900],
  })
);

export const secondary = style(({ theme, cssTheme }: Theme) => ({
  backgroundColor: cssTheme.colors.colorIntents.background1,
}));
export const secondaryReversed = style(({ theme, cssTheme }: Theme) => ({}));
globalStyle(
  `${globalThemeReversedSelector} ${secondary}, ${secondaryReversed}`,
  ({ theme, cssTheme }: Theme) => ({
    backgroundColor: cssTheme.colors.colors.grey[900],
  })
);

export const tertiary = style(({ theme, cssTheme }: Theme) => ({
  backgroundColor: cssTheme.colors.colorIntents.background2,
}));
export const tertiaryReversed = style(({ theme, cssTheme }: Theme) => ({}));
globalStyle(
  `${globalThemeReversedSelector} ${secondary}, ${tertiaryReversed}`,
  ({ theme, cssTheme }: Theme) => ({
    backgroundColor: cssTheme.colors.colors.grey[900],
  })
);
