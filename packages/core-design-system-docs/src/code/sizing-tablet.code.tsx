import { ScaleSteps } from '@newrade/core-gatsby-ui/src/docs-components/scale-steps';
import { useTreatTheme } from '@newrade/core-react-ui';
import React from 'react';

type Props = {};

export const SizingTablet: React.FC<Props> = (props) => {
  const { theme, cssTheme } = useTreatTheme();

  return <ScaleSteps steps={theme.sizing.sizes.tablet} />;
};
