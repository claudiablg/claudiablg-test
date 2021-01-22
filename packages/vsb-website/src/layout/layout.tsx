import {
  PARAGRAPH_SIZE,
  TEXT_LEVEL,
  LinkVariant,
  VIEWPORT,
  HEADING,
  LABEL_SIZE,
  TEXT_STYLE,
} from '@newrade/core-design-system';
import { GatsbyLink } from '@newrade/core-gatsby-ui/src';
import ScrollTrigger from '@newrade/core-gsap-ui/lib/plugins/ScrollTrigger';
import { gsap } from '@newrade/core-gsap-ui/src';
import {
  Link,
  Main,
  MainWrapper,
  NavBar,
  NavBarRefs,
  SideBar,
  useTreatTheme,
  Stack,
  NavItemGroup,
  NavItem,
  BoxV2,
  useViewportBreakpoint,
  Paragraph,
  Heading,
  Label,
} from '@newrade/core-react-ui';
import { globalHistory } from '@reach/router';
import { PressEvent } from '@react-types/shared';
import { PageProps } from 'gatsby';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-treat';
import { Footer } from '../components/footer';
import { useAnimateNavbar } from '../hook/use-animate-navbar';
import { useNavItems, useVsbCompanyInfo } from '../hook/use-nav-items.hook';
import LogoSymbol from '../images/logo-symbol.svg';
import Logo from '../images/logo.svg';
import '../services/i18n.service';
import * as styleRefs from './layout.treat';
import { title } from 'case';

gsap.registerPlugin(ScrollTrigger as any);

type LayoutProps = Partial<Omit<PageProps, 'children'> & { children: ReactNode }>;

let pathname: string | undefined = '/'; // needed for gsap callbacks

export const Layout = React.memo<LayoutProps>((props) => {
  /**
   * Data query
   */
  const navItems = useNavItems();
  const navItemsByDirName = new Set(navItems.map((item) => item.dirName));
  const { companyInfo, companyAddress } = useVsbCompanyInfo();

  /**
   * i18n
   */
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  /**
   * Styles & animations
   */
  const { styles } = useStyles(styleRefs);
  const { cssTheme } = useTreatTheme();

  /**
   * Sidebar
   */
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  useEffect(() => {
    return globalHistory.listen((params) => {
      setSidebarOpened(false); // close sidebar upon navigation
      setNavbarStyle(params.location?.pathname === '/' ? 'transparent' : 'white'); // set the navbar style
      pathname = params.location?.pathname;
    });
  }, [globalHistory]);

  function handlePressMenuButton(event: PressEvent) {
    setSidebarOpened(!sidebarOpened);
  }

  const { viewport } = useViewportBreakpoint();
  useEffect(() => {
    if (viewport === VIEWPORT.desktop) {
      setSidebarOpened(false);
    }
  }, [viewport]);

  /**
   * Navbar
   */
  const navbarRef = useRef<NavBarRefs>();
  const [navbarStyle, setNavbarStyle] = useState<'white' | 'transparent'>(
    props.location?.pathname === '/' ? 'transparent' : 'white'
  );
  useAnimateNavbar({ navbarRef, whiteStyle: navbarStyle === 'white', viewport });
  useEffect(() => {
    /**
     * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger
     */
    const scrollTrigger = new ScrollTrigger({
      scrub: 1,
      delay: 1,
      toggleActions: `play none reverse none`,
      start: '40vh',
      end: '40vh',
      onEnter: () => {
        setNavbarStyle('white');
      },
      onEnterBack: function () {
        if (pathname === '/') {
          setNavbarStyle('transparent');
        }
      },
    });

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill?.();
      }
    };
  }, []);

  return (
    <MainWrapper>
      <NavBar
        ref={navbarRef}
        HomeLink={<GatsbyLink to={'/'} />}
        MobileSvgLogo={<LogoSymbol />}
        DesktopSvgLogo={<Logo />}
        MenuLinks={
          <>
            <Link variantSize={PARAGRAPH_SIZE.medium} AsElement={<GatsbyLink to={'/vasectomie/'} />}>
              Tout sur la vasectomie
            </Link>
            <Link variantSize={PARAGRAPH_SIZE.medium} AsElement={<GatsbyLink to={'/examen-pour-transport-canada/'} />}>
              Examen pour Transport Canada
            </Link>
            <Link variantSize={PARAGRAPH_SIZE.medium} AsElement={<GatsbyLink to={'/equipe/'} />}>
              La clinique
            </Link>
            <Link variantSize={PARAGRAPH_SIZE.medium} AsElement={<GatsbyLink to={'/contact/'} />}>
              Contact
            </Link>
          </>
        }
        onPressMenuButton={handlePressMenuButton}
        menuOpened={sidebarOpened}
      ></NavBar>

      <SideBar sidebarOpened={sidebarOpened} fullHeight={false}>
        <Stack>
          <BoxV2
            padding={[cssTheme.sizing.var.x4, cssTheme.layout.var.contentMargins, cssTheme.sizing.var.x4]}
            style={{ flexDirection: 'column' }}
            justifyContent={['flex-start']}
            alignItems={['stretch']}
          >
            <Stack gap={[cssTheme.sizing.var.x4]}>
              {[...navItemsByDirName].map((dirName, index) => {
                return (
                  <Stack key={index} gap={[`calc(2 * ${cssTheme.sizing.var.x1})`]}>
                    {dirName === '' ? (
                      <NavItemGroup>Docs</NavItemGroup>
                    ) : (
                      <NavItemGroup>{title(dirName || '')}</NavItemGroup>
                    )}
                    <Stack>
                      {navItems
                        .filter((item) => item.dirName === dirName)
                        .map((item, itemIndex) => {
                          return (
                            <NavItem
                              key={itemIndex}
                              active={item.path === props.location?.pathname}
                              AsElement={<GatsbyLink to={item.path} noStyles={true} />}
                            >
                              {item.name}
                            </NavItem>
                          );
                        })}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </BoxV2>

          <BoxV2
            style={{ flexDirection: 'column', backgroundColor: cssTheme.colors.colors.grey[800] }}
            justifyContent={['flex-start']}
            alignItems={['stretch']}
            padding={[cssTheme.sizing.var.x5, cssTheme.layout.var.contentMargins]}
          >
            <Stack gap={[cssTheme.sizing.var.x5]}>
              <Stack gap={[cssTheme.sizing.var.x3]}>
                <Heading variant={HEADING.h4} variantLevel={TEXT_LEVEL.primaryReversed}>
                  Clinique Dr. Pierre Boucher Jr.
                </Heading>
                <Label
                  variant={LABEL_SIZE.xSmall}
                  variantStyle={TEXT_STYLE.boldUppercase}
                  variantLevel={TEXT_LEVEL.primaryReversed}
                >
                  Omnipraticien CCMF
                </Label>
              </Stack>

              <Stack gap={[cssTheme.sizing.var.x4]}>
                <Link
                  variantLevel={TEXT_LEVEL.primaryReversed}
                  variantSize={PARAGRAPH_SIZE.small}
                  variant={LinkVariant.underline}
                  href={`mailto:${companyAddress?.email}`}
                >
                  {companyAddress?.email}
                </Link>
                <Link
                  variantLevel={TEXT_LEVEL.primaryReversed}
                  variantSize={PARAGRAPH_SIZE.small}
                  variant={LinkVariant.underline}
                  href={`tel:${companyAddress?.phone}`}
                >
                  {companyAddress?.phone}
                </Link>
                <Link
                  variantLevel={TEXT_LEVEL.primaryReversed}
                  variantSize={PARAGRAPH_SIZE.small}
                  variant={LinkVariant.underline}
                  href={`fax:${companyAddress?.fax}`}
                >
                  {companyAddress?.fax}
                </Link>
                <Link
                  variantLevel={TEXT_LEVEL.primaryReversed}
                  variantSize={PARAGRAPH_SIZE.small}
                  variant={LinkVariant.underline}
                  href={'https://goo.gl/maps/nndYpgQLkbDC6c7S7'}
                  target="blank"
                >
                  {companyAddress?.addressLine1}
                  <br />
                  {companyAddress?.addressLine2}
                </Link>
              </Stack>

              <Paragraph variantLevel={TEXT_LEVEL.primaryReversed} variant={PARAGRAPH_SIZE.small}>
                {companyInfo?.copyright}
              </Paragraph>
            </Stack>
          </BoxV2>
        </Stack>
      </SideBar>

      <Main minHeight={true}>{props.children}</Main>

      <Footer id={'footer'}></Footer>
    </MainWrapper>
  );
});
