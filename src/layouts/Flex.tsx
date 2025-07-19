/**
 * @fileoverview
 * Flex layout component with theme integration.
 */

import type { CSSProperties, ReactNode, ElementType } from 'react';
import type { FlexLayoutTheme } from './core';
import { defaultFlexLayoutTheme } from './defaultThemes';
import { registerLayoutTheme } from './registry';
import { useLayoutTheme } from './LayoutProvider';

// Register the flex theme when this module is imported
registerLayoutTheme('flex', defaultFlexLayoutTheme);

/**
 * Props for the Flex layout component
 */
export interface FlexProps {
  /** Child components to arrange in flex */
  children: ReactNode;
  /** Flex direction */
  direction?: keyof FlexLayoutTheme['direction'] | string;
  /** Flex wrap */
  wrap?: keyof FlexLayoutTheme['wrap'] | string;
  /** Gap between flex items */
  gap?: keyof FlexLayoutTheme['gap'] | string;
  /** Justify content alignment */
  justify?: keyof FlexLayoutTheme['justify'] | string;
  /** Align items alignment */
  align?: keyof FlexLayoutTheme['align'] | string;
  /** Align content alignment (for wrapped items) */
  alignContent?: keyof FlexLayoutTheme['align'] | string;
  /** Flex grow, shrink, and basis shorthand */
  flex?: keyof FlexLayoutTheme['flex'] | string;
  /** Additional CSS properties */
  style?: CSSProperties;
  /** CSS class name */
  className?: string;
  /** HTML element type to render */
  as?: ElementType;
}

/**
 * Flex layout component that provides CSS Flexbox functionality with theme support.
 * 
 * @example
 * ```tsx
 * // Basic row layout
 * <Flex direction="row" gap="md" justify="center" align="center">
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </Flex>
 * 
 * // Column layout with space between
 * <Flex direction="column" justify="between" style={{ height: '100vh' }}>
 *   <Header />
 *   <Main />
 *   <Footer />
 * </Flex>
 * 
 * // Responsive flex with wrap
 * <Flex wrap="wrap" gap="lg" justify="center">
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </Flex>
 * ```
 */
export function Flex({
  children,
  direction = 'row',
  wrap,
  gap = 'default',
  justify,
  align,
  alignContent,
  flex,
  style,
  className,
  as: Component = 'div',
  ...props
}: FlexProps) {
  const flexTheme = useLayoutTheme<FlexLayoutTheme>('flex');

  // Resolve direction value
  const getDirection = (): string => {
    if (direction in flexTheme.direction) {
      return flexTheme.direction[direction as keyof typeof flexTheme.direction];
    }
    return direction;
  };

  // Resolve wrap value
  const getWrap = (): string | undefined => {
    if (!wrap) return undefined;
    if (wrap in flexTheme.wrap) {
      return flexTheme.wrap[wrap as keyof typeof flexTheme.wrap];
    }
    return wrap;
  };

  // Resolve gap value
  const getGap = (): string => {
    if (gap in flexTheme.gap) {
      return flexTheme.gap[gap as keyof typeof flexTheme.gap];
    }
    return gap;
  };

  // Resolve justify value
  const getJustify = (): string | undefined => {
    if (!justify) return undefined;
    if (justify in flexTheme.justify) {
      return flexTheme.justify[justify as keyof typeof flexTheme.justify];
    }
    return justify;
  };

  // Resolve align value
  const getAlign = (): string | undefined => {
    if (!align) return undefined;
    if (align in flexTheme.align) {
      return flexTheme.align[align as keyof typeof flexTheme.align];
    }
    return align;
  };

  // Resolve alignContent value
  const getAlignContent = (): string | undefined => {
    if (!alignContent) return undefined;
    if (alignContent in flexTheme.align) {
      return flexTheme.align[alignContent as keyof typeof flexTheme.align];
    }
    return alignContent;
  };

  // Resolve flex value
  const getFlex = (): string | undefined => {
    if (!flex) return undefined;
    if (flex in flexTheme.flex) {
      return flexTheme.flex[flex as keyof typeof flexTheme.flex];
    }
    return flex;
  };

  const flexStyles: CSSProperties = {
    display: 'flex',
    flexDirection: getDirection() as CSSProperties['flexDirection'],
    ...(wrap && { flexWrap: getWrap() as CSSProperties['flexWrap'] }),
    gap: getGap(),
    ...(justify && { justifyContent: getJustify() as CSSProperties['justifyContent'] }),
    ...(align && { alignItems: getAlign() as CSSProperties['alignItems'] }),
    ...(alignContent && { alignContent: getAlignContent() as CSSProperties['alignContent'] }),
    ...(flex && { flex: getFlex() }),
    ...style,
  };

  return (
    <Component
      className={className}
      style={flexStyles}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Flex item component for advanced flex item control
 */
export interface FlexItemProps {
  /** Child components */
  children: ReactNode;
  /** Flex grow value */
  grow?: number;
  /** Flex shrink value */
  shrink?: number;
  /** Flex basis value */
  basis?: string;
  /** Flex shorthand */
  flex?: keyof FlexLayoutTheme['flex'] | string;
  /** Align self */
  alignSelf?: keyof FlexLayoutTheme['align'] | string;
  /** Order of the flex item */
  order?: number;
  /** Additional CSS properties */
  style?: CSSProperties;
  /** CSS class name */
  className?: string;
  /** HTML element type to render */
  as?: ElementType;
}

/**
 * Flex item component for controlling individual flex items.
 * 
 * @example
 * ```tsx
 * <Flex>
 *   <FlexItem flex="1">Takes remaining space</FlexItem>
 *   <FlexItem>Fixed size</FlexItem>
 *   <FlexItem alignSelf="center">Centered item</FlexItem>
 * </Flex>
 * ```
 */
export function FlexItem({
  children,
  grow,
  shrink,
  basis,
  flex,
  alignSelf,
  order,
  style,
  className,
  as: Component = 'div',
  ...props
}: FlexItemProps) {
  const flexTheme = useLayoutTheme<FlexLayoutTheme>('flex');

  // Resolve flex value
  const getFlex = (): string | undefined => {
    if (!flex) return undefined;
    if (flex in flexTheme.flex) {
      return flexTheme.flex[flex as keyof typeof flexTheme.flex];
    }
    return flex;
  };

  // Resolve alignSelf value
  const getAlignSelf = (): string | undefined => {
    if (!alignSelf) return undefined;
    if (alignSelf in flexTheme.align) {
      return flexTheme.align[alignSelf as keyof typeof flexTheme.align];
    }
    return alignSelf;
  };

  const itemStyles: CSSProperties = {
    ...(grow !== undefined && { flexGrow: grow }),
    ...(shrink !== undefined && { flexShrink: shrink }),
    ...(basis && { flexBasis: basis }),
    ...(flex && { flex: getFlex() }),
    ...(alignSelf && { alignSelf: getAlignSelf() as CSSProperties['alignSelf'] }),
    ...(order !== undefined && { order }),
    ...style,
  };

  return (
    <Component
      className={className}
      style={itemStyles}
      {...props}
    >
      {children}
    </Component>
  );
}
