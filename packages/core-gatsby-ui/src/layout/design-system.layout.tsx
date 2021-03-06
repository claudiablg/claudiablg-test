import { MDXProvider } from '@mdx-js/react';
import { SITE_LANGUAGES } from '@newrade/core-common';
import { HEADING, PARAGRAPH_SIZE, VIEWPORT } from '@newrade/core-design-system';
import { GatsbyLink, NavbarDocs, useDesignSystemNavigation } from '@newrade/core-gatsby-ui/src';
import {
  BoxV2,
  defaultThemeClassName,
  DesktopDocsItemGroup,
  DesktopDocsSideBar,
  DesktopDocsSidebarItem,
  Heading,
  Link,
  Main,
  MainWrapper,
  NavItem,
  Stack,
  useTreatTheme,
  useViewportBreakpoint,
} from '@newrade/core-react-ui';
import { Theme } from '@newrade/core-react-ui/lib/design-system';
import { PageProps } from 'gatsby';
import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeWrapper } from '../context/theme-wrapper';

export type DesignSystemLayoutProps = Partial<
  Omit<PageProps, 'children'> & { children: ReactNode }
> & {
  /**
   * A reference to the treatTheme that can be used to pass
   * an other theme to specific sections of the app.
   */
  treatThemeRef: string;
  /**
   * Theme object from Treat
   */
  theme: Theme;
  /**
   * The application's className for its theme
   */
  themeClassname?: string;
  /**
   * Logo component for mobile
   * @deprecated use the logo component instead <Logo name={LOGO.STANDARD}></Logo>
   */
  MobileSvgLogo?: React.ReactNode;
  /**
   * Logo component for Desktop
   * @deprecated use the logo component instead <Logo name={LOGO.STANDARD}></Logo>
   */
  DesktopSvgLogo?: React.ReactNode;
};

export const LayoutDesignSystem: React.FC<DesignSystemLayoutProps> = function ({
  treatThemeRef,
  theme,
  themeClassname,
  ...props
}) {
  // should prob be passed by the parent
  const navigation = useDesignSystemNavigation({
    locales: [SITE_LANGUAGES.EN, SITE_LANGUAGES.EN_CA],
  });
  const { cssTheme } = useTreatTheme();
  const { viewport } = useViewportBreakpoint();
  const [layoutMode, setLayoutMode] = useState<'centered' | 'full-width'>('centered');
  const [mobileSidebarOpened, setMobileSidebarOpened] = useState<boolean>(false);

  function handleClickMenuButton(event: React.MouseEvent) {
    setMobileSidebarOpened(!mobileSidebarOpened);
  }

  function handleChangeLayoutMode(event: React.MouseEvent) {
    setLayoutMode(layoutMode === 'centered' ? 'full-width' : 'centered');
  }

  useEffect(() => {
    let timeout: number;
    if (viewport === VIEWPORT.desktop) {
      timeout = window.setTimeout(() => {
        setMobileSidebarOpened(false);
      }, 300);
    }
    return () => {
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, [viewport]);

  const HomeLink = <GatsbyLink to={'/'} />;
  const MenuLinks = (
    <>
      <Link variantSize={PARAGRAPH_SIZE.small} AsElement={<GatsbyLink to={'/docs'} />}>
        Docs
      </Link>
    </>
  );

  return (
    <MainWrapper className={defaultThemeClassName}>
      <NavbarDocs
        tagText={'Design System'}
        HomeLink={HomeLink}
        maxWidth={'100%'}
        MenuLinks={MenuLinks}
        onClickMenuButton={handleClickMenuButton}
        onLayoutModeChange={handleChangeLayoutMode}
        menuOpened={mobileSidebarOpened}
      ></NavbarDocs>

      {layoutMode === 'centered' ? (
        <DesktopDocsSideBar>
          <BoxV2
            style={{ flexDirection: 'column' }}
            padding={[cssTheme.sizing.var.x4, 0, cssTheme.sizing.var.x7]}
            justifyContent={['flex-start']}
            alignItems={['stretch']}
          >
            <Stack gap={[cssTheme.sizing.var.x4]}>
              <Heading variant={HEADING.h3}>Documentation</Heading>

              <Stack>
                {navigation.items.map((item, index) => {
                  return (
                    <Stack key={index} gap={[`calc(2 * ${cssTheme.sizing.var.x1})`]}>
                      {item.items?.length ? (
                        <DesktopDocsItemGroup
                          label={item.displayName || item.name || 'Design System'}
                        >
                          {item.items?.length ? (
                            <Stack>
                              {item.items?.map((item, itemIndex) => {
                                return (
                                  <DesktopDocsSidebarItem
                                    key={itemIndex}
                                    active={item.path === props.location?.pathname}
                                    AsElement={<GatsbyLink to={item.path} noStyles={true} />}
                                  >
                                    {item.displayName || item.name}
                                  </DesktopDocsSidebarItem>
                                );
                              })}
                            </Stack>
                          ) : null}
                        </DesktopDocsItemGroup>
                      ) : (
                        <NavItem
                          active={item.path === props.location?.pathname}
                          AsElement={<GatsbyLink to={item.path} noStyles={true} />}
                        >
                          {item.displayName || item.name}
                        </NavItem>
                      )}
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          </BoxV2>
        </DesktopDocsSideBar>
      ) : null}

      <Main
        navbarPadding={true}
        desktopSidebarPadding={layoutMode === 'centered'}
        desktopAsidePadding={layoutMode === 'centered'}
        minHeight={false}
        style={
          layoutMode === 'centered'
            ? {}
            : {
                // @ts-ignore
                '--layout-content-width-desktop-docs-max-width': `100%`,
              }
        }
      >
        <MDXProvider
          components={{
            ThemeWrapper: (props: any) => (
              <ThemeWrapper
                treatThemeRef={treatThemeRef}
                theme={theme}
                themeClassname={themeClassname}
                {...props}
              />
            ),
          }}
        >
          {props.children}
        </MDXProvider>
      </Main>
    </MainWrapper>
  );
};
