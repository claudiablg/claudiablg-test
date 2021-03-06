import { globalStyle, style } from 'treat';
import { Theme } from '../design-system';

export const wrapper = style((theme: Theme) => ({
  display: 'inherit',
}));

globalStyle(`${wrapper}`, ({ theme, cssTheme }: Theme) => {
  const { colors } = cssTheme;
  return {
    /**
     * Color intents variables
     */
    [colors.varNames.colorIntents.accessibilityColor]: colors.colorIntents.accessibilityColor,
    [colors.varNames.colorIntents.current]: colors.colorIntents.current,
    [colors.varNames.colorIntents.transparent]: colors.colorIntents.transparent,
    [colors.varNames.colorIntents.primary]: colors.colorIntents.primary,
    [colors.varNames.colorIntents.primaryReversed]: colors.colorIntents.primaryReversed,
    [colors.varNames.colorIntents.secondary]: colors.colorIntents.secondary,
    [colors.varNames.colorIntents.secondaryReversed]: colors.colorIntents.secondaryReversed,
    [colors.varNames.colorIntents.primaryText]: colors.colorIntents.primaryText,
    [colors.varNames.colorIntents.primaryTextReversed]: colors.colorIntents.primaryTextReversed,
    [colors.varNames.colorIntents.secondaryText]: colors.colorIntents.secondaryText,
    [colors.varNames.colorIntents.secondaryTextReversed]: colors.colorIntents.secondaryTextReversed,
    [colors.varNames.colorIntents.tertiaryText]: colors.colorIntents.tertiaryText,
    [colors.varNames.colorIntents.tertiaryTextReversed]: colors.colorIntents.tertiaryTextReversed,
    [colors.varNames.colorIntents.disabledText]: colors.colorIntents.disabledText,
    [colors.varNames.colorIntents.disabledTextReversed]: colors.colorIntents.disabledTextReversed,
    [colors.varNames.colorIntents.successText]: colors.colorIntents.successText,
    [colors.varNames.colorIntents.successAction]: colors.colorIntents.successAction,
    [colors.varNames.colorIntents.successBackground]: colors.colorIntents.successBackground,
    [colors.varNames.colorIntents.warningText]: colors.colorIntents.warningText,
    [colors.varNames.colorIntents.warningAction]: colors.colorIntents.warningAction,
    [colors.varNames.colorIntents.warningBackground]: colors.colorIntents.warningBackground,
    [colors.varNames.colorIntents.dangerText]: colors.colorIntents.dangerText,
    [colors.varNames.colorIntents.dangerAction]: colors.colorIntents.dangerAction,
    [colors.varNames.colorIntents.dangerBackground]: colors.colorIntents.dangerBackground,
    [colors.varNames.colorIntents.background0]: colors.colorIntents.background0,
    [colors.varNames.colorIntents.background1]: colors.colorIntents.background1,
    [colors.varNames.colorIntents.background2]: colors.colorIntents.background2,
    [colors.varNames.colorIntents.backgroundDisabled]: colors.colorIntents.backgroundDisabled,

    /**
     * Color variables
     */
    [colors.varNames.colors.transparent || 'undefined']: colors.colors.transparent,
    [colors.varNames.colors.current || 'undefined']: colors.colors.current,
    [colors.varNames.colors.primary.baseHue || 'undefined']: colors.colors.primary.baseHue,
    [colors.varNames.colors.primary.baseSat || 'undefined']: colors.colors.primary.baseSat,
    [colors.varNames.colors.primary[100]]: colors.colors.primary[100],
    [colors.varNames.colors.primary[300]]: colors.colors.primary[300],
    [colors.varNames.colors.primary[500]]: colors.colors.primary[500],
    [colors.varNames.colors.primary[700]]: colors.colors.primary[700],
    [colors.varNames.colors.primary[900]]: colors.colors.primary[900],
    [colors.varNames.colors.accent1.baseSat || 'undefined']: colors.colors.accent1.baseSat,
    [colors.varNames.colors.accent1.baseHue || 'undefined']: colors.colors.accent1.baseHue,
    [colors.varNames.colors.accent1[100]]: colors.colors.accent1[100],
    [colors.varNames.colors.accent1[300]]: colors.colors.accent1[300],
    [colors.varNames.colors.accent1[500]]: colors.colors.accent1[500],
    [colors.varNames.colors.accent1[700]]: colors.colors.accent1[700],
    [colors.varNames.colors.accent1[900]]: colors.colors.accent1[900],
    [colors.varNames.colors.accent2.baseSat || 'undefined']: colors.colors.accent2.baseSat,
    [colors.varNames.colors.accent2.baseHue || 'undefined']: colors.colors.accent2.baseHue,
    [colors.varNames.colors.accent2[100]]: colors.colors.accent2[100],
    [colors.varNames.colors.accent2[300]]: colors.colors.accent2[300],
    [colors.varNames.colors.accent2[500]]: colors.colors.accent2[500],
    [colors.varNames.colors.accent2[700]]: colors.colors.accent2[700],
    [colors.varNames.colors.accent2[900]]: colors.colors.accent2[900],
    [colors.varNames.colors.accent3.baseSat || 'undefined']: colors.colors.accent3.baseSat,
    [colors.varNames.colors.accent3.baseHue || 'undefined']: colors.colors.accent3.baseHue,
    [colors.varNames.colors.accent3[100]]: colors.colors.accent3[100],
    [colors.varNames.colors.accent3[300]]: colors.colors.accent3[300],
    [colors.varNames.colors.accent3[500]]: colors.colors.accent3[500],
    [colors.varNames.colors.accent3[700]]: colors.colors.accent3[700],
    [colors.varNames.colors.accent3[900]]: colors.colors.accent3[900],
    [colors.varNames.colors.grey.baseSat || 'undefined']: colors.colors.grey.baseSat,
    [colors.varNames.colors.grey.baseHue || 'undefined']: colors.colors.grey.baseHue,
    [colors.varNames.colors.grey[0]]: colors.colors.grey[0],
    [colors.varNames.colors.grey[25]]: colors.colors.grey[25],
    [colors.varNames.colors.grey[50]]: colors.colors.grey[50],
    [colors.varNames.colors.grey['0-reversed']]: colors.colors.grey['0-reversed'],
    [colors.varNames.colors.grey[100]]: colors.colors.grey[100],
    [colors.varNames.colors.grey['100-reversed']]: colors.colors.grey['100-reversed'],
    [colors.varNames.colors.grey[200]]: colors.colors.grey[200],
    [colors.varNames.colors.grey['200-reversed']]: colors.colors.grey['200-reversed'],
    [colors.varNames.colors.grey[300]]: colors.colors.grey[300],
    [colors.varNames.colors.grey[400]]: colors.colors.grey[400],
    [colors.varNames.colors.grey[500]]: colors.colors.grey[500],
    [colors.varNames.colors.grey[600]]: colors.colors.grey[600],
    [colors.varNames.colors.grey[700]]: colors.colors.grey[700],
    [colors.varNames.colors.grey[800]]: colors.colors.grey[800],
    [colors.varNames.colors.grey[900]]: colors.colors.grey[900],
    [colors.varNames.colors.grey[1000]]: colors.colors.grey[1000],
    [colors.varNames.colors.utilityGreen.baseHue || 'undefined']:
      colors.colors.utilityGreen.baseHue,
    [colors.varNames.colors.utilityGreen.baseSat || 'undefined']:
      colors.colors.utilityGreen.baseSat,
    [colors.varNames.colors.utilityGreen[100]]: colors.colors.utilityGreen[100],
    [colors.varNames.colors.utilityGreen[300]]: colors.colors.utilityGreen[300],
    [colors.varNames.colors.utilityGreen[500]]: colors.colors.utilityGreen[500],
    [colors.varNames.colors.utilityGreen[700]]: colors.colors.utilityGreen[700],
    [colors.varNames.colors.utilityGreen[900]]: colors.colors.utilityGreen[900],
    [colors.varNames.colors.utilityYellow.baseHue || 'undefined']:
      colors.colors.utilityYellow.baseHue,
    [colors.varNames.colors.utilityYellow.baseSat || 'undefined']:
      colors.colors.utilityYellow.baseSat,
    [colors.varNames.colors.utilityYellow[100]]: colors.colors.utilityYellow[100],
    [colors.varNames.colors.utilityYellow[300]]: colors.colors.utilityYellow[300],
    [colors.varNames.colors.utilityYellow[500]]: colors.colors.utilityYellow[500],
    [colors.varNames.colors.utilityYellow[700]]: colors.colors.utilityYellow[700],
    [colors.varNames.colors.utilityYellow[900]]: colors.colors.utilityYellow[900],
    [colors.varNames.colors.utilityRed.baseHue || 'undefined']: colors.colors.utilityRed.baseHue,
    [colors.varNames.colors.utilityRed.baseSat || 'undefined']: colors.colors.utilityRed.baseSat,
    [colors.varNames.colors.utilityRed[100]]: colors.colors.utilityRed[100],
    [colors.varNames.colors.utilityRed[300]]: colors.colors.utilityRed[300],
    [colors.varNames.colors.utilityRed[500]]: colors.colors.utilityRed[500],
    [colors.varNames.colors.utilityRed[700]]: colors.colors.utilityRed[700],
    [colors.varNames.colors.utilityRed[900]]: colors.colors.utilityRed[900],
  };
});
