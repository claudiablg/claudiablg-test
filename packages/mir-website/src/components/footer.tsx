import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { FooterQuery } from '../../types/graphql-types';
import { Label } from '../components/label';
import { Logo } from '../components/logo';
import { Paragraph } from '../components/paragraph';
import { AnchorLink } from './anchor-link';

import { useStyles } from 'react-treat';
import * as styleRefs from './footer.treat';
import { LABEL, VIEWPORT } from 'core-design-system';
import { useViewportBreakpoint } from '../hooks/use-viewport.hook';

export const query = graphql`
  query footer {
    gcms {
      companyMedias {
        logoFooter {
          url
        }
      }
      companyAddresses {
        addressLine1
        addressLine2
        city
        provinceState
        postalCode
        country
        websiteUrl
        phone
        phoneNoFees
        email
      }
    }
  }
`;

type OwnProps = {};

export const Footer: React.FC<OwnProps> = (props) => {
  const data = useStaticQuery<FooterQuery>(query);
  const styles = useStyles(styleRefs);
  const { viewport } = useViewportBreakpoint();

  return (
    <footer className={styles.wrapper}>
      <div className={styles.gridwrapper}>
        <div className={styles.contact}>
          <Label
            className={styles.title}
            variant={viewport === VIEWPORT.MOBILE ? LABEL.smallBoldUppercase : LABEL.xSmallBoldUppercase}
          >
            Contactez-nous
          </Label>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            Téléphone :
            <AnchorLink className={styles.link} variant="reversed" href={`tel:${data.gcms.companyAddresses[0].phone}`}>
              {data.gcms.companyAddresses[0].phone}
            </AnchorLink>
          </Paragraph>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            Sans frais :
            <AnchorLink
              className={styles.link}
              variant="reversed"
              href={`tel:${data.gcms.companyAddresses[0].phoneNoFees}`}
            >
              {data.gcms.companyAddresses[0].phoneNoFees}
            </AnchorLink>
          </Paragraph>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            Courriel :{' '}
            <AnchorLink
              className={styles.link}
              variant="reversed"
              href={`mailto:${data.gcms.companyAddresses[0].email}`}
            >
              {data.gcms.companyAddresses[0].email}
            </AnchorLink>
          </Paragraph>
        </div>

        <div className={styles.location}>
          <Label
            className={styles.title}
            variant={viewport === VIEWPORT.MOBILE ? LABEL.smallBoldUppercase : LABEL.xSmallBoldUppercase}
          >
            Visitez-nous
          </Label>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            {data.gcms.companyAddresses[0].addressLine1}
          </Paragraph>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            {data.gcms.companyAddresses[0].addressLine2}
          </Paragraph>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            {data.gcms.companyAddresses[0].city}, {data.gcms.companyAddresses[0].provinceState},{' '}
            {data.gcms.companyAddresses[0].postalCode}
          </Paragraph>
          <Paragraph className={styles.infoText} variant={viewport === VIEWPORT.MOBILE ? 'medium' : 'small'}>
            {data.gcms.companyAddresses[0].country}
          </Paragraph>
        </div>
        <div className={styles.firm}>
          <Logo type="framed-text" variant="reversed" src={`${data?.gcms?.companyMedias[0]?.logoFooter?.url}`}></Logo>
        </div>

        <Paragraph className={styles.copyright} variant="small">
          © {new Date().getFullYear()} Tous droits réservés MIR.{' '}
        </Paragraph>
      </div>
    </footer>
  );
};
