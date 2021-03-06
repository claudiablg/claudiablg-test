import { AppError, ERROR_TYPE } from '@newrade/core-common';
import { CapsizeTextStyle, TextDecoration, TextStyle } from '@newrade/core-design-system';
import capsize, { CapsizeStyles, getCapHeight } from 'capsize';
import { Property } from 'csstype';
// @ts-ignore
import GithubSlugger from 'github-slugger';
import { Style } from 'treat';
import { pxStringToNumber, pxStringToRem } from './utilities';

/**
 * Create a TextStyle using the Capsize utility.
 * @see https://seek-oss.github.io/capsize/
 */
type TextStyleOptions = { baseFontSize: number } & TextStyle;

export function createCSSTextStyle({
  baseFontSize,
  fontWeight,
  fontStyle,
  letterSpacing,
  textTransform,
  textDecoration,
}: TextStyleOptions): TextStyle<string> {
  return {
    fontWeight,
    fontStyle,
    letterSpacing: letterSpacing ? `${letterSpacing / 100}em` : '0px',
    textTransform,
    textDecoration: getCSSTextDecoration(textDecoration),
    // textDecoration: getCSSTextDecoration(),
  };
}

export function createCSSCapsizeTextStyle({
  baseFontSize,
  font,
  fontFamily,
  fontWeight,
  fontStyle,
  letterSpacing,
  textTransform,
  textDecoration,
  capHeight,
  fontSize,
  lineGap,
}: CapsizeTextStyleOptions): TextStyle<string> & CapsizeTextStyle<string> {
  const compatibleCapHeight: number | undefined = capHeight;
  if (!font) {
    throw new AppError({
      name: ERROR_TYPE.LIB_ERROR,
      message: 'a text style requires a font to be set',
    });
  }
  const { fontMetrics } = font[0];

  const capsizePx = capsize(
    fontSize
      ? ({ fontSize: fontSize, lineGap: lineGap, fontMetrics } as any)
      : { capHeight: compatibleCapHeight, lineGap, fontMetrics }
  );

  // when fontSize is used instead of capHeight, we get
  // the cap height based on the font size and metrics
  const capHeightNumber = capHeight
    ? capHeight
    : fontSize !== undefined && fontSize > 0
    ? (getCapHeight({ fontSize, fontMetrics }) as number)
    : 16;

  return {
    ...createCSSTextStyle({
      baseFontSize,
      font,
      fontFamily,
      fontWeight,
      fontStyle,
      letterSpacing,
      textTransform,
      textDecoration,
    }),
    font,
    fontFamily: fontFamily ? fontFamily : font.map((font) => font.name).join(','),
    fontSize,
    capHeight: capHeightNumber,
    lineGap,
    capsize: capsizePx,
  };
}

type CapsizeTextStyleOptions = { baseFontSize: number } & TextStyle & CapsizeTextStyle;

/**
 * Converts capsize styles from px to rem.
 */
export function convertLetterSpacingToPercent({
  letterSpacing,
  fontSize,
}: {
  letterSpacing: number | undefined;
  fontSize: string;
}): string {
  if (letterSpacing === undefined) {
    return `0px`;
  }

  const fontSizeNumber = pxStringToNumber({ value: fontSize });

  if (fontSizeNumber === undefined) {
    return `0px`;
  }
  const percent = (letterSpacing / 100) * fontSizeNumber;
  return `${percent}px`;
}

/**
 * Converts capsize styles from px to rem.
 */
export function convertCapsizeValuesToRem({
  baseFontSize,
  capsizePx,
}: {
  baseFontSize: number;
  capsizePx: CapsizeStyles;
}): CapsizeStyles {
  return {
    ...capsizePx,
    fontSize: pxStringToRem({ value: capsizePx.fontSize, baseFontSize }),
    lineHeight: pxStringToRem({ value: capsizePx.lineHeight, baseFontSize }),
  };
}

/**
 * Converts capsize styles from px to rem.
 */
export function convertLetterSpacingToEM({
  value,
  fontSize,
}: {
  value: string;
  fontSize: string;
}): string | undefined {
  const exp = /(^\d+(\.\d+)?)/;

  const match = exp.exec(value);
  if (!match) {
    console.warn(`${value}, did not match`);
    return undefined;
  }

  const numbericValue = match[0];
  if (!numbericValue) {
    return undefined;
  }

  const convertedValue = Number(numbericValue);
  if (!convertedValue) {
    return undefined;
  }

  const numericFontSize = pxStringToNumber({ value: fontSize });

  if (!numericFontSize) {
    return undefined;
  }

  return `${convertedValue / 100}em`;
}

/**
 * Return a Treat compatible style object from a theme text style
 */
export function getCSSTextStyles(
  textStyle?: Partial<TextStyle<string> & CapsizeTextStyle<string>>,
  options?: CSSTextStyleOptions
): Style {
  if (!textStyle) {
    return {};
  }
  return {
    ...getCSSFontTextStyles(textStyle),
    ...getCSSSizeTextStyles(textStyle, options),
  };
}

export function getCSSFontTextStyles(
  textStyle?: Partial<TextStyle<string> & CapsizeTextStyle<string>>,
  options?: CSSTextStyleOptions
): Style {
  if (!textStyle) {
    return {};
  }
  return {
    fontWeight: textStyle.fontWeight as number,
    textTransform: textStyle.textTransform as Property.TextTransform,
    fontFamily: textStyle.fontFamily as string,
    fontStyle: textStyle.fontStyle as string,
    letterSpacing: textStyle.letterSpacing as string,
    textDecoration: textStyle.textDecoration as string,
  };
}

type CSSTextStyleOptions = {
  disablePseudo?: boolean;
  stylePseudoElements?: {
    display: Property.Display;
  };
};

export function getCSSSizeTextStyles(
  textStyle?: Partial<TextStyle<string> & CapsizeTextStyle<string>>,
  options?: CSSTextStyleOptions
): Style {
  if (!textStyle) {
    return {};
  }

  if (options?.disablePseudo) {
    return {
      ...textStyle.capsize,
      padding: 'inherit',
      '::before': {},
      '::after': {},
    };
  }

  if (options?.stylePseudoElements) {
    return {
      ...textStyle.capsize,
      '::before': {
        ...textStyle.capsize?.['::before'],
        ...options.stylePseudoElements,
      },
      '::after': {
        ...textStyle.capsize?.['::after'],
        ...options.stylePseudoElements,
      },
    };
  }

  return {
    ...textStyle.capsize,
  };
}

/**
 * Return a Treat compatible style object from a theme text style
 */
export function getCSSTextDecoration(textDecoration?: TextDecoration): string | undefined {
  if (!textDecoration) {
    return undefined;
  }
  // text-decoration: underline dotted red;
  return `${textDecoration.line} ${textDecoration.style} ${textDecoration.color}`;
}

export function formatAnchorId(value?: string | null): string {
  return GithubSlugger.slug(value || '');
}
