import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useStyles } from 'react-treat';

import { BannerQuery } from '../../types/graphql-types';
import { Heading } from './heading';
import { Label } from './label';
import * as styleRefs from './banner.treat';

import BarSVG from '../illustrations/Illustration/Bar.svg';

export const query = graphql`
  query banner {
    gcms {
      pageIndices {
        bannerTitle
        bannerSubTitle
        bannerImage {
          url
        }
      }
    }
  }
`;

interface OwnProps {
  variant: 'primary' | 'secondary';
}

export const Banner: React.FC<OwnProps> = (props) => {
  const data = useStaticQuery<BannerQuery>(query);
  const styles = useStyles(styleRefs);

  return (
    <div className={styles.containerBox}>
      <div className={styles.bluebox}></div>

      <div
        className={styles.wrapper}
        style={{ backgroundImage: `url(${data.gcms.pageIndices[0].bannerImage[0].url})` }}
      >
        <div className={styles.content}>
          {variantResolver(props.variant)}

          <Heading variant="h1" className={styles.title}>
            {data.gcms.pageIndices[0].bannerTitle}
          </Heading>

          <BarSVG viewBox={null} className={styles.bottomBar} />
        </div>
      </div>

      <div className={styles.blackbox}></div>
    </div>
  );

  function variantResolver(value: string) {
    switch (value) {
      case 'primary': {
        return (
          <div className={styles.containerBar}>
            <Label size="smallUppercase" className={styles.subtitle}>
              {data.gcms.pageIndices[0].bannerSubTitle}
            </Label>

            <BarSVG className={styles.topBarPrimary} />
          </div>
        );
      }
      case 'secondary': {
      }
      default: {
        return (
          <div className={styles.containerBar}>
            <BarSVG className={styles.topBarSecondary} />
          </div>
        );
      }
    }
  }
};
