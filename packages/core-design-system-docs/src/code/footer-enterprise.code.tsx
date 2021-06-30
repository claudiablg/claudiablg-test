import { FooterEnterprise } from '@newrade/core-gatsby-ui/src';
import { useTreatTheme } from '@newrade/core-react-ui';
import { FooterAPI, NavComponent } from '@newrade/core-website-api';
import React from 'react';

type Props = {};

export const FootersEnterprise: React.FC<Props> = (props) => {
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

  const footer: FooterAPI = {
    name: 'Enterprise Footer',
    navigation: {
      component: NavComponent.footer,
      subNavigation: [navigation, navigation, navigation, navigation],
    },
    companyInfo: {
      copyright: '@ Company name',
    },
  };
  return (
    <>
      <FooterEnterprise footer={footer}></FooterEnterprise>
    </>
  );
};
