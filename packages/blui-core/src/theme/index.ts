/**
 * @file
 * Main theme system entry point.
 * Exports all core theme types, utilities, hooks, and the theme provider.
 * 
 * This is the primary module that components and applications should import from
 * to access the extensible theme system.
 */

// Core theme types and system
export type {
  CoreTheme,
  Theme,
  ThemeOverride,
  ComponentThemes,
  ComponentThemeRegistration,
  DeepPartial,
} from './core';

// Theme registry system
export {
  registerComponentTheme,
  getRegisteredComponentThemes,
  createCompleteTheme,
  getComponentTheme,
} from './registry';

// Default theme
export { defaultCoreTheme } from './defaultTheme';

// Theme utilities
export {
  createTheme,
  deepMerge,
  getThemeValue,
  responsive,
  createCSSVariables,
  applyCSSVariables,
  themeAccess,
} from './utils';

// Theme provider and hooks
export {
  ThemeProvider,
  useTheme,
  useThemeValue,
  useComponentTheme,
  useColors,
  useTypography,
  useSpacing,
  useBorderRadius,
  useShadows,
  useBreakpoints,
  useZIndex,
} from './ThemeProvider';

export type { ThemeProviderProps } from './ThemeProvider';
