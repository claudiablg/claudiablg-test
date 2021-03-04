import { Variant } from '@newrade/core-design-system';
import { Switcher, useCommonProps, useTreatTheme } from '@newrade/core-react-ui';
import React from 'react';
import { useStyles } from 'react-treat';
import { SectionBase } from './section-base';
import * as styleRefs from './section-switcher.treat';
import { SectionBaseLayout, SectionPadding, SectionProps } from './section.props';

type Props = SectionProps & {
  RightBlock: React.ReactNode;
  LeftBlock: React.ReactNode;
};

export const SectionSwitcher = React.forwardRef<any, Props>(
  (
    {
      id,
      style,
      className,
      as,
      AsElement,
      RightBlock,
      LeftBlock,
      section: { variant = Variant.primary, baseLayout = SectionBaseLayout.center, padding = SectionPadding.large } = {
        variant: Variant.primary,
        baseLayout: SectionBaseLayout.center,
        padding: SectionPadding.large,
      },
      ...props
    },
    ref
  ) => {
    const { styles } = useStyles(styleRefs);
    const { cssTheme } = useTreatTheme();
    const commonProps = useCommonProps({ id, style, className, ...props });

    return (
      <SectionBase
        ref={ref}
        {...commonProps}
        section={{
          variant,
          baseLayout,
          padding,
        }}
      >
        <Switcher col={2} gap={[cssTheme.sizing.var.x6]} alignItems={['flex-start', 'flex-start', 'flex-start']}>
          <div className={styles.left}>{LeftBlock}</div>
          <div className={styles.right}>{RightBlock}</div>
        </Switcher>
      </SectionBase>
    );
  }
);
