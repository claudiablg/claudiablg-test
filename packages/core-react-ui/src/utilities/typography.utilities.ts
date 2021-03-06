import {
  CapsizeTextStyle,
  TextStyle,
  TextVariantStyles,
  Titles,
  Typography,
  VIEWPORT,
} from '@newrade/core-design-system';
import { CSSTypography } from '../design-system';
import { defaultFontVars } from '../default-theme/default-typography';
import { cssVar } from './css-variable.utilities';
import { createCSSCapsizeTextStyle, createCSSTextStyle } from './text.utilities';
import { keys } from './utilities';

export function getCSSTypography({
  baseFontSize,
  fonts,
  titles,
  headings,
  paragraphs,
  labels,
}: Typography & { baseFontSize: number }): CSSTypography {
  // take each text styles and convert it to CSS format

  const titlesStyles = createCSSVariantTextStyles({ variant: titles, baseFontSize });
  const headingsStyles = createCSSVariantTextStyles({ variant: headings, baseFontSize });
  const paragraphsStyles = createCSSVariantTextStyles({ variant: paragraphs, baseFontSize });
  const labelsStyles = createCSSVariantTextStyles({ variant: labels, baseFontSize });

  return {
    fonts: {
      ...fonts,
      var: defaultFontVars,
      varNames: defaultFontVars.map((varName) => cssVar(varName)),
    },
    titles: {
      font: titles.font ? titles.font : fonts.sans, // fallback to sans font
      ...(titlesStyles as Typography<string>['titles']),
    },
    headings: {
      font: titles.font ? titles.font : fonts.sans, // fallback to sans font
      ...(headingsStyles as Typography<string>['headings']),
    },
    paragraphs: {
      font: titles.font ? titles.font : fonts.sans, // fallback to sans font
      ...(paragraphsStyles as Typography<string>['paragraphs']),
    },
    labels: {
      font: titles.font ? titles.font : fonts.sans, // fallback to sans font
      ...(labelsStyles as Typography<string>['labels']),
    },
  };
}

function createCSSVariantTextStyles({
  variant,
  baseFontSize,
}: {
  variant:
    | Typography['titles']
    | Typography['headings']
    | Typography['paragraphs']
    | Typography['labels'];
  baseFontSize: number;
}) {
  const parentTextStyles = keys(variant)
    .filter((viewport) => !Object.values(VIEWPORT).includes(viewport as VIEWPORT))
    .reduce((previous, prop) => {
      const styles = variant[prop] as Omit<Typography['titles'], 'desktop' | 'tablet' | 'mobile'>;
      (previous as any)[prop] = styles;
      return previous;
    }, {} as Omit<Typography['titles'], 'desktop' | 'tablet' | 'mobile'>);

  const variantStyles = keys(variant)
    .filter((viewport) => Object.values(VIEWPORT).includes(viewport as VIEWPORT))
    .reduce((previous, viewport) => {
      const styles = variant[viewport] as Titles;
      const viewportStyle = keys(styles).reduce((previous, title) => {
        // merge styles set on parent with specific styles
        const textStyle: TextStyle & CapsizeTextStyle = {
          ...parentTextStyles,
          ...styles[title],
        };
        const cssTextStyle = createCSSCapsizeTextStyle({ ...textStyle, baseFontSize });
        (previous as any)[title] = cssTextStyle;
        return previous;
      }, {} as Titles<string>);
      (previous as any)[viewport] = viewportStyle;
      return previous;
    }, {} as Typography<string>['titles'] | Typography<string>['headings'] | Typography<string>['paragraphs'] | Typography<string>['labels']);

  if (parentTextStyles && (parentTextStyles as Typography['paragraphs']).styles) {
    const variantStylesStyles = (parentTextStyles as Typography['paragraphs']).styles;
    return {
      ...variantStyles,
      styles: keys(variantStylesStyles).reduce((previous, current) => {
        previous[current] = createCSSTextStyle({ ...variantStylesStyles[current], baseFontSize });
        return previous;
      }, {} as TextVariantStyles<string>),
    };
  }

  return variantStyles;
}
