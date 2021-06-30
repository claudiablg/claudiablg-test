import { style } from 'treat';
import { Theme } from '@newrade/core-react-ui/lib/design-system';

export const base = style(({ theme, cssTheme }: Theme) => ({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  columnGap: cssTheme.sizing.var.x6,
  rowGap: cssTheme.sizing.var.x5,
}));


export const socialLinks = style(({ theme, cssTheme }: Theme) => ({
  alignContent: 'center',
  justifyContent: 'flex-start',
}));


export const copyright = style(({ cssTheme, theme }: Theme) => ({
  textAlign: 'left',
  alignSelf: 'center',
  alignContent: 'center',
  justifyContent: 'flex-start',
  color: cssTheme.colors.colors.grey[600],
}));
