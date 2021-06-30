import { FooterSocialOnly } from '@newrade/core-gatsby-ui/src';
import { useTreatTheme } from '@newrade/core-react-ui';
import React from 'react';

type Props = {};

export const FootersSocialOnly: React.FC<Props> = (props) => {
  const { theme, cssTheme } = useTreatTheme();

  const navigation = {
    name: 'Services',
    label: 'Services',
    links: [
      {
        name: 'Link to page',
        label: 'Page link',
      },
      {
        name: 'Link to page',
        label: 'Page link',
      },
      {
        name: 'Link to page',
        label: 'Page link',
      },
    ],
  };

  return (
    <>
      <FooterSocialOnly></FooterSocialOnly>
    </>
  );
};

