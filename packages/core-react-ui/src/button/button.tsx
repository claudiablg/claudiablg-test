import {
  ButtonIcon,
  ButtonProps,
  ButtonSize,
  LABEL_SIZE,
  TEXT_STYLE,
  Variant,
} from '@newrade/core-design-system';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, useRef } from 'react';
import { useStyles } from 'react-treat';
import { usePreventPinchZoom } from '../hooks/use-prevent-pinch-zoom';
import { CommonComponentProps } from '../props/component-common.props';
import { Label } from '../text/label';
import { getDefaultTextFromProps, getMergedClassname } from '../utilities/component.utilities';
import * as stylesRef from './button.treat';

type Props = CommonComponentProps &
  Pick<AnchorHTMLAttributes<any>, 'href'> &
  ButtonHTMLAttributes<any> &
  Pick<ButtonProps, 'icon' | 'role' | 'size' | 'state' | 'variant'> & {
    as?: 'button' | 'a' | 'div';
  } & {
    disabled?: boolean;
    loading?: boolean;
    /**
     * Pass svg icon
     */
    Icon?: React.ReactNode;
    dataPressed?: boolean;
    collapsePadding?: 'left' | 'right';
  };

export const Button = React.forwardRef<any, Props>(
  (
    {
      id,
      style,
      className,
      children,
      variant,
      collapsePadding,
      as,
      AsElement,
      size,
      state,
      disabled,
      icon,
      Icon,
      ...props
    },
    forwardedRef
  ) => {
    const styles = useStyles(stylesRef);
    const localRef = useRef<HTMLButtonElement>(null);
    const ref = forwardedRef ? (forwardedRef as React.RefObject<HTMLButtonElement>) : localRef;
    const type = as ? as : 'button';

    /**
     * Event handling
     */
    usePreventPinchZoom(ref.current);
    // usePreventLongPress(ref.current);

    /**
     * Icon
     */
    const dataicon = Icon ? (icon ? icon : ButtonIcon.right) : ButtonIcon.none;

    const iconClassNames = getMergedClassname([
      styles.iconBase,
      dataicon === ButtonIcon.right ? styles.right : '',
      dataicon === ButtonIcon.left ? styles.left : '',
      dataicon === ButtonIcon.icon ? styles.icon : '',
    ]);

    const IconSvg = Icon
      ? React.cloneElement(Icon as React.ReactElement, {
          className: iconClassNames,
          preserveAspectRatio: `xMinYMin meet`,
        })
      : null;

    const variantStateClassName = `${styles.base}`;
    const variantClassName = `${styles[variant ? variant : Variant.primary]}`;
    const variantSizeClassName = styles[size ? size : ButtonSize.medium];
    const allClassName = getMergedClassname([
      variantStateClassName,
      variantSizeClassName,
      variantClassName,
      className,
    ]);
    const renderedChildren = children
      ? children
      : dataicon === ButtonIcon.icon
      ? ' '
      : getDefaultTextFromProps('button', {
          variant,
          size,
          icon,
          disabled,
        });

    function getLabelSizeForButtonSize(size?: ButtonSize): LABEL_SIZE {
      switch (size) {
        case ButtonSize.large: {
          return LABEL_SIZE.medium;
        }
        case ButtonSize.medium: {
          return LABEL_SIZE.small;
        }
        default:
        case ButtonSize.small: {
          return LABEL_SIZE.small;
        }
        case ButtonSize.xSmall: {
          return LABEL_SIZE.xSmall;
        }
      }
    }

    const CustomElement = AsElement
      ? React.cloneElement(
          AsElement as React.ReactElement,
          {
            id,
            style,
            className: allClassName,
            ref: ref,
            dataicon,
            datapaddingcollapse: `${collapsePadding}`,
            ...props,
          },
          <>
            {icon === ButtonIcon.icon ? null : (
              <Label
                variantDisplay={'inline'}
                variantStyle={TEXT_STYLE.bold}
                variant={getLabelSizeForButtonSize(size)}
              >
                {renderedChildren}
              </Label>
            )}
            {IconSvg}
          </>
        )
      : null;

    if (CustomElement) {
      return CustomElement;
    }

    const CustomElementAs =
      type !== 'button'
        ? React.createElement(
            type,
            {
              id,
              style,
              className: allClassName,
              ref: ref,
              dataicon,
              datapaddingcollapse: `${collapsePadding}`,
              ...props,
            },
            <>
              {icon === ButtonIcon.icon ? null : (
                <Label
                  variantDisplay={'inline'}
                  variantStyle={TEXT_STYLE.bold}
                  variant={getLabelSizeForButtonSize(size)}
                >
                  {renderedChildren}
                </Label>
              )}
              {IconSvg}
            </>
          )
        : null;

    if (CustomElementAs) {
      return CustomElementAs;
    }

    return (
      <button
        id={id}
        style={style}
        className={allClassName}
        ref={ref}
        disabled={disabled}
        // @ts-ignore
        dataicon={dataicon}
        datapaddingcollapse={`${collapsePadding}`}
        {...props}
      >
        {icon === ButtonIcon.icon ? null : (
          <Label
            variantDisplay={'inline'}
            variantStyle={TEXT_STYLE.bold}
            variant={getLabelSizeForButtonSize(size)}
          >
            {renderedChildren}
          </Label>
        )}
        {IconSvg}
      </button>
    );
  }
);
