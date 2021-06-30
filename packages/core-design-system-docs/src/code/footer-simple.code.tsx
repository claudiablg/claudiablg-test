import { FooterSimple } from '@newrade/core-gatsby-ui/src';
import { useTreatTheme } from '@newrade/core-react-ui';
import { FooterAPI, NavComponent } from '@newrade/core-website-api';
import React from 'react';

type Props = {};

export const FootersSimple: React.FC<Props> = (props) => {
  const { theme, cssTheme } = useTreatTheme();
  const navigation = {
    links: [
      {
        name: 'Link to page',
        label: 'Page link',
      },
    ],
  };

  const footer: FooterAPI = {
    name: 'Simple Footer',
    navigation: {
      component: NavComponent.footer,
      subNavigation: [navigation, navigation, navigation, navigation, navigation],
    },
    companyInfo: {
      copyright: '@ Company name',
    },
  };
  return (
    <>
      <FooterSimple footer={footer}></FooterSimple>
    </>
  );
};

