import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { useTypography, useColors } from '../theme';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'inherit';
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  fontFamily?: 'primary' | 'secondary' | 'mono';
  truncate?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size = 'base',
      weight = 'normal',
      color = 'primary',
      align = 'left',
      lineHeight = 'normal',
      fontFamily = 'primary',
      truncate = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const typography = useTypography();
    const colors = useColors();

    const getColor = () => {
      switch (color) {
        case 'secondary':
          return colors.text.secondary;
        case 'disabled':
          return colors.text.disabled;
        case 'success':
          return colors.success;
        case 'warning':
          return colors.warning;
        case 'error':
          return colors.error;
        case 'info':
          return colors.info;
        case 'inherit':
          return 'inherit';
        case 'primary':
        default:
          return colors.text.primary;
      }
    };

    const textStyles: React.CSSProperties = {
      fontSize: typography.fontSize[size],
      fontWeight: typography.fontWeight[weight],
      fontFamily: typography.fontFamily[fontFamily],
      lineHeight: typography.lineHeight[lineHeight],
      color: getColor(),
      textAlign: align,
      margin: 0,
      padding: 0,
      ...(truncate && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      ...style,
    };

    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={className}
        style={textStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
