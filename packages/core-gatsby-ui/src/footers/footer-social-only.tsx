import {
  ButtonIcon,
  LABEL_SIZE,
  LOGO,
  PARAGRAPH_SIZE,
  TEXT_STYLE,
  Variant,
} from '@newrade/core-design-system';
import {
  Button,
  Cluster,
  Label,
  Link,
  Logo,
  Paragraph,
  Stack,
  useCommonProps,
  useTreatTheme,
} from '@newrade/core-react-ui';
import { BlockAPI, NavComponent } from '@newrade/core-website-api';
import { IoLogoFacebook } from '@react-icons/all-files/io5/IoLogoFacebook';
import { IoLogoInstagram } from '@react-icons/all-files/io5/IoLogoInstagram';
import { IoLogoLinkedin } from '@react-icons/all-files/io5/IoLogoLinkedin';
import { IoLogoTwitter } from '@react-icons/all-files/io5/IoLogoTwitter';
import React from 'react';
import { useStyles } from 'react-treat';
import { BlockRenderer } from '../blocks/block-renderer';
import { lorenipsumMedium, lorenipsumShort } from '../docs-components/loren-ipsum';
import { GatsbyLink } from '../links/gatsby-link';
import { FooterBase } from './footer-base';
import * as styleRefs from './footer-social-only.treat';
import { FooterProps } from './footer.props';

type Props = FooterProps;

export const FooterSocialOnly = React.forwardRef<any, Props>(
  ({ id, style, className, footer, ...props }, ref) => {
    const styles = useStyles(styleRefs);
    const { theme, cssTheme } = useTreatTheme();
    const commonProps = useCommonProps({
      id,
      style,
      className,
      ...props,
    });

    const blocks = footer?.blocks;
    const copyright = footer?.companyInfo?.copyright;
    const facebookURL = footer?.companyInfo?.facebookPageURL;
    const twitterURL = footer?.companyInfo?.twitterPageURL;
    const instagramURL = footer?.companyInfo?.instagramPageURL;
    const linkedinURL = footer?.companyInfo?.linkedinPageURL;
    const navigation = footer?.navigation;
    const version = footer?.version;
    const footerNavigation = navigation?.component === NavComponent.footer ? navigation : null;

    return (
      <FooterBase {...commonProps} footer={footer} ref={ref} contentClassName={styles.base}>

        <Cluster className={styles.socialLinks} gap={[cssTheme.sizing.var.x3]}>
          <Button
            Icon={<IoLogoTwitter />}
            icon={ButtonIcon.icon}
            variant={Variant.tertiary}
          ></Button>

          <Button
            Icon={<IoLogoFacebook />}
            icon={ButtonIcon.icon}
            variant={Variant.tertiary}
          ></Button>

          <Button
            Icon={<IoLogoInstagram />}
            icon={ButtonIcon.icon}
            variant={Variant.tertiary}
          ></Button>

          <Button
            Icon={<IoLogoLinkedin />}
            icon={ButtonIcon.icon}
            variant={Variant.tertiary}
          ></Button>
        </Cluster>

        <Paragraph
          className={styles.copyright}
          variant={PARAGRAPH_SIZE.small}
          variantLevel={Variant.secondary}
        >
          {copyright || `© ${lorenipsumShort}`}
          {version ? ` — v${version}` : ''}
        </Paragraph>
      </FooterBase>
    );
  }
);
