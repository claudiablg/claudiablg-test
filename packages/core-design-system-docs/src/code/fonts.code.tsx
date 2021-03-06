import { FontShowcase } from '@newrade/core-gatsby-ui/src';
import { useTreatTheme } from '@newrade/core-react-ui';
import React from 'react';

type Props = {};

export const Fonts: React.FC<Props> = (props) => {
  const { theme, cssTheme } = useTreatTheme();

  return <FontShowcase></FontShowcase>;
};
