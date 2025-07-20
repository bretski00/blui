import { forwardRef } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import { useSpacing, useBorderRadius, useShadows } from '../theme';

/**
 * Props for the Box component.
 * 
 * Extends standard HTML div attributes with theme-aware spacing, shadows,
 * and border radius utilities. Box is a fundamental layout primitive that
 * provides consistent spacing and styling options.
 * 
 * @example
 * ```tsx
 * <Box p="md" m="lg" shadow="md" borderRadius="lg">
 *   Content goes here
 * </Box>
 * ```
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: string;
  p?: keyof ReturnType<typeof useSpacing> | string | number;
  px?: keyof ReturnType<typeof useSpacing> | string | number;
  py?: keyof ReturnType<typeof useSpacing> | string | number;
  pt?: keyof ReturnType<typeof useSpacing> | string | number;
  pr?: keyof ReturnType<typeof useSpacing> | string | number;
  pb?: keyof ReturnType<typeof useSpacing> | string | number;
  pl?: keyof ReturnType<typeof useSpacing> | string | number;
  m?: keyof ReturnType<typeof useSpacing> | string | number;
  mx?: keyof ReturnType<typeof useSpacing> | string | number;
  my?: keyof ReturnType<typeof useSpacing> | string | number;
  mt?: keyof ReturnType<typeof useSpacing> | string | number;
  mr?: keyof ReturnType<typeof useSpacing> | string | number;
  mb?: keyof ReturnType<typeof useSpacing> | string | number;
  ml?: keyof ReturnType<typeof useSpacing> | string | number;
  w?: string | number;
  h?: string | number;
  minW?: string | number;
  minH?: string | number;
  maxW?: string | number;
  maxH?: string | number;
  bg?: string;
  borderRadius?: keyof ReturnType<typeof useBorderRadius> | string | number;
  border?: string;
  borderColor?: string;
  shadow?: keyof ReturnType<typeof useShadows>;
  display?: CSSProperties['display'];
  position?: CSSProperties['position'];
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  zIndex?: number;
  overflow?: CSSProperties['overflow'];
  opacity?: number;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = 'div',
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      w,
      h,
      minW,
      minH,
      maxW,
      maxH,
      bg,
      borderRadius,
      border,
      borderColor,
      shadow,
      display,
      position,
      top,
      right,
      bottom,
      left,
      zIndex,
      overflow,
      opacity,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const spacing = useSpacing();
    const borderRadiusValues = useBorderRadius();
    const shadows = useShadows();

    const getSpacing = (value: keyof typeof spacing | string | number | undefined) => {
      if (value === undefined) return undefined;
      if (typeof value === 'string' && value in spacing) {
        return spacing[value as keyof typeof spacing];
      }
      return value;
    };

    const boxStyles: CSSProperties = {
      // Padding
      ...(p !== undefined && { padding: getSpacing(p) }),
      ...(px !== undefined && { paddingLeft: getSpacing(px), paddingRight: getSpacing(px) }),
      ...(py !== undefined && { paddingTop: getSpacing(py), paddingBottom: getSpacing(py) }),
      ...(pt !== undefined && { paddingTop: getSpacing(pt) }),
      ...(pr !== undefined && { paddingRight: getSpacing(pr) }),
      ...(pb !== undefined && { paddingBottom: getSpacing(pb) }),
      ...(pl !== undefined && { paddingLeft: getSpacing(pl) }),
      
      // Margin
      ...(m !== undefined && { margin: getSpacing(m) }),
      ...(mx !== undefined && { marginLeft: getSpacing(mx), marginRight: getSpacing(mx) }),
      ...(my !== undefined && { marginTop: getSpacing(my), marginBottom: getSpacing(my) }),
      ...(mt !== undefined && { marginTop: getSpacing(mt) }),
      ...(mr !== undefined && { marginRight: getSpacing(mr) }),
      ...(mb !== undefined && { marginBottom: getSpacing(mb) }),
      ...(ml !== undefined && { marginLeft: getSpacing(ml) }),
      
      // Dimensions
      ...(w !== undefined && { width: w }),
      ...(h !== undefined && { height: h }),
      ...(minW !== undefined && { minWidth: minW }),
      ...(minH !== undefined && { minHeight: minH }),
      ...(maxW !== undefined && { maxWidth: maxW }),
      ...(maxH !== undefined && { maxHeight: maxH }),
      
      // Background and borders
      ...(bg !== undefined && { backgroundColor: bg }),
      ...(borderRadius !== undefined && {
        borderRadius: typeof borderRadius === 'string' && borderRadius in borderRadiusValues
          ? borderRadiusValues[borderRadius as keyof typeof borderRadiusValues]
          : borderRadius
      }),
      ...(border !== undefined && { border }),
      ...(borderColor !== undefined && { borderColor }),
      ...(shadow !== undefined && { boxShadow: shadows[shadow] }),
      
      // Layout
      ...(display !== undefined && { display }),
      ...(position !== undefined && { position }),
      ...(top !== undefined && { top }),
      ...(right !== undefined && { right }),
      ...(bottom !== undefined && { bottom }),
      ...(left !== undefined && { left }),
      ...(zIndex !== undefined && { zIndex }),
      ...(overflow !== undefined && { overflow }),
      ...(opacity !== undefined && { opacity }),
      
      ...style,
    };

    const Component = as as any;

    return (
      <Component
        ref={ref}
        className={className}
        style={boxStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
