import { HEADING, LinkVariant, TEXT_LEVEL, PARAGRAPH_SIZE } from '@newrade/core-design-system';
import {
  BoxV2,
  Details,
  Heading,
  Label,
  Link,
  ListItem,
  ListItems,
  Stack,
  Summary,
  useTreatTheme,
} from '@newrade/core-react-ui';
import React from 'react';
import { IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';
import { useStyles } from 'react-treat';
import { DesignSystemPageProps, DesignSystemPageTemplate } from '../../templates/design-system-page.template';
import * as styleRefs from '../home.treat';

const PageComponent: React.FC<DesignSystemPageProps> = (props) => {
  const { styles } = useStyles(styleRefs);
  const { cssTheme, theme } = useTreatTheme();

  if (!(cssTheme && theme)) {
    return <div className={styles.wrapper}>Please provide a theme</div>;
  }

  return (
    <Stack id={'Design System'} gap={[cssTheme.sizing.var.x5]}>
      <Stack id={'Components'} gap={[cssTheme.sizing.var.x5]}>
        <Heading variant={HEADING.h2}>List Items</Heading>

        <Details id={'Links'} open={true}>
          <Summary>
            <Heading variant={HEADING.h3}>Unordered</Heading>
          </Summary>

          <BoxV2 padding={[cssTheme.sizing.var.x3, 0]}>
            <Stack gap={[cssTheme.sizing.var.x5]}>
              <Stack gap={[cssTheme.sizing.var.x3]}>
                <Label variantLevel={TEXT_LEVEL.tertiary}>Bullet</Label>

                <ListItems gap={[cssTheme.sizing.var.x3]}>
                  <ListItem></ListItem>

                  <ListItem></ListItem>

                  <ListItem></ListItem>
                </ListItems>
              </Stack>

              <Stack gap={[cssTheme.sizing.var.x3]}>
                <Label variantLevel={TEXT_LEVEL.tertiary}>Icon</Label>

                <Stack as={'ul'} gap={[cssTheme.sizing.var.x2]}>
                  <ListItem variantIcon={'icon'} Icon={<IoMailOutline />}>
                    info@website.ca
                  </ListItem>

                  <ListItem variantIcon={'icon'} Icon={<IoMailOutline />}>
                    info@website.ca
                  </ListItem>

                  <ListItem variantIcon={'icon'} Icon={<IoPhonePortraitOutline />}>
                    444-555-2222
                  </ListItem>
                </Stack>
              </Stack>

              <Stack gap={[cssTheme.sizing.var.x4]}>
                <Label variantLevel={TEXT_LEVEL.tertiary}>Sizes</Label>

                <ListItems gap={[cssTheme.sizing.var.x3]}>
                  <ListItem variantSize={PARAGRAPH_SIZE.large} variantIcon={'bullet'}></ListItem>

                  <ListItem variantSize={PARAGRAPH_SIZE.medium} variantIcon={'bullet'}></ListItem>

                  <ListItem variantSize={PARAGRAPH_SIZE.small} variantIcon={'bullet'}></ListItem>

                  <ListItem variantSize={PARAGRAPH_SIZE.xSmall} variantIcon={'bullet'}></ListItem>
                </ListItems>

                <ListItems gap={[cssTheme.sizing.var.x3]}>
                  <ListItem variantSize={PARAGRAPH_SIZE.large} variantIcon={'icon'} Icon={<IoMailOutline />}></ListItem>

                  <ListItem
                    variantSize={PARAGRAPH_SIZE.medium}
                    variantIcon={'icon'}
                    Icon={<IoMailOutline />}
                  ></ListItem>

                  <ListItem variantSize={PARAGRAPH_SIZE.small} variantIcon={'icon'} Icon={<IoMailOutline />}></ListItem>

                  <ListItem
                    variantSize={PARAGRAPH_SIZE.xSmall}
                    variantIcon={'icon'}
                    Icon={<IoMailOutline />}
                  ></ListItem>
                </ListItems>
              </Stack>
            </Stack>
          </BoxV2>
        </Details>

        <Details id={'Links'} open={true}>
          <Summary>
            <Heading variant={HEADING.h3}>Ordered</Heading>
          </Summary>

          <BoxV2 padding={[cssTheme.sizing.var.x3, 0]}>
            <Stack gap={[cssTheme.sizing.var.x5]}>
              <Stack gap={[cssTheme.sizing.var.x3]}>
                <Label variantLevel={TEXT_LEVEL.tertiary}>Number</Label>

                <ListItems gap={[cssTheme.sizing.var.x3]} as={'ol'}>
                  <ListItem variantIcon={'number'}></ListItem>

                  <ListItem variantIcon={'number'}></ListItem>

                  <ListItem variantIcon={'number'}></ListItem>
                </ListItems>
              </Stack>
            </Stack>
          </BoxV2>
        </Details>
      </Stack>
    </Stack>
  );
};

const Page: React.FC<DesignSystemPageProps> = (props) => {
  return (
    <DesignSystemPageTemplate {...props}>
      <PageComponent {...props}></PageComponent>
    </DesignSystemPageTemplate>
  );
};

export default Page;
