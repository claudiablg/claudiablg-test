import React, { useRef } from 'react';
import { useStyles } from 'react-treat';
import { useAnimateSideBar } from '../hooks/use-animate-sidebar';
import { Stack } from '../layout/stack';
import { CommonComponentProps } from '../props/component-common.props';
import { getMergedClassname } from '../utilities/component.utilities';
import * as styleRefs from './mobile-sidebar.treat';

type Props = CommonComponentProps & {
  /**
   * Forcefully disable the body scroll while the sidebar is opened
   */
  disableBodyScroll?: boolean;
  /**
   * State of the sidebar
   */
  sidebarOpened?: boolean;
  /**
   * Handle click on the backdrop
   */
  onClickBackdrop?: (event: React.MouseEvent) => void;
};

/**
 * Generic navigation bar with an icon logo and language switch on mobile
 * and on desktop, a logo, and menu links
 */
export const MobileSideBar: React.FC<Props> = ({
  id,
  style,
  className,
  sidebarOpened,
  disableBodyScroll,
  onClickBackdrop: onPressBackdrop,
  ...props
}) => {
  const { styles } = useStyles(styleRefs);
  const classNames = getMergedClassname([className, styles.wrapper]);

  /**
   * Animation
   */
  const sideBarRef = useRef<HTMLDivElement>(null);
  const sideBarBackdropRef = useRef<HTMLDivElement>(null);
  useAnimateSideBar({ sidebarOpened, sideBarRef, sideBarBackdropRef, disableBodyScroll });

  return (
    <>
      <nav className={classNames} ref={sideBarRef} style={style}>
        <Stack className={styles.content}>{props.children}</Stack>
      </nav>

      <div className={styles.backdrop} onClick={onPressBackdrop} ref={sideBarBackdropRef}></div>
    </>
  );
};
