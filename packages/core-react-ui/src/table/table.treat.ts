import { style } from 'treat';
import { Theme } from '../design-system';

export const styles = {
  table: style(({ theme, cssTheme }: Theme) => ({
    minWidth: '100%',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderColor: cssTheme.colors?.colors.grey['100'],
  })),
};
