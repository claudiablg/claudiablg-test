import { DesignSystem } from '@newrade/core-design-system';
import { CSSDesignSystem } from '../design-system/css-design-system';
import { getCSSColors } from './colors.utilities';
import { getCSSEffects } from './effects.utilities';
import { getCSSSizing } from './sizing.utilities';

export function createCSSTheme(theme: DesignSystem): Partial<CSSDesignSystem> {
  return {
    name: theme.name,
    variation: theme.variation,
    colors: getCSSColors(theme.colors),
    effects: getCSSEffects(theme.effects),
    sizing: getCSSSizing(theme.sizing),
    // iconography,
    // typography,
    // layout
  };
}
