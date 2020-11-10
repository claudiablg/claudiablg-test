import { GatsbyPageContext } from '@newrade/core-gatsby-config';
import { Button, Stack } from '@newrade/core-react-ui';
import { PageProps } from 'gatsby';
import React from 'react';
import { Layout } from '../layouts/page.layout';

export type ProjectPageProps = PageProps<{}, GatsbyPageContext>;

export const Index: React.FC<ProjectPageProps> = (props) => {
  return (
    <Layout>
      <Stack gap={'20px'} padding={'20px'}>
        <Stack gap={'20px'} padding={'20px'}>
          <div>hello</div>
        </Stack>

        <Stack gap={'13px'} padding={'20px'}>
          <h1>Buttons</h1>
          <Button>Button</Button>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Index;
