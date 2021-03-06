import { style } from 'treat';
import { Theme } from '@newrade/core-react-ui/lib/design-system';

export const base = style(({ theme, cssTheme }: Theme) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: cssTheme.sizing.var.x3,
}));

export const socialLinks = style(({ theme, cssTheme }: Theme) => ({
  alignContent: 'center',
  justifyContent: 'center',
}));

export const navLinks = style(({ theme, cssTheme }: Theme) => ({
  display: 'flex',
  gap: cssTheme.sizing.var.x1,
  alignContent: 'center',
  justifyContent: 'center',
}));
export const copyright = style(({ cssTheme, theme }: Theme) => ({
  textAlign: 'center',
  justifyContent: 'center',
  color: cssTheme.colors.colors.grey[600],
}));