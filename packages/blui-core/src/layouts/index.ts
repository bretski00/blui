/**
 * @file Layout components and theme system exports
 */

// Core layout types
export type {
  LayoutTheme,
  LayoutThemes,
  LayoutThemeOverride,
  GridLayoutTheme,
  FlexLayoutTheme,
  BaseLayoutTheme,
  LayoutSpacing,
  LayoutBreakpoints,
  GetLayoutTheme,
} from './core';

// Layout components
export { Grid, GridItem } from './Grid';
export type { GridProps, GridItemProps } from './Grid';

export { Flex, FlexItem } from './Flex';
export type { FlexProps, FlexItemProps } from './Flex';

// Layout provider and hooks
export { LayoutProvider, useLayoutTheme, useLayoutContext } from './LayoutProvider';
export type { LayoutProviderProps } from './LayoutProvider';

// Layout registry functions
export {
  registerLayoutTheme,
  getLayoutTheme,
  createCompleteLayoutTheme,
  getRegisteredLayoutNames,
  isLayoutThemeRegistered,
} from './registry';

// Default themes
export {
  defaultGridLayoutTheme,
  defaultFlexLayoutTheme,
  defaultLayoutSpacing,
  defaultLayoutBreakpoints,
} from './defaultThemes';
