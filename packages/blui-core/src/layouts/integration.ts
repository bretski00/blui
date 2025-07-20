/**
 * @file
 * Integration layer between theme system and layout system.
 * 
 * This module provides utilities to integrate layout themes into the main theme system
 * without modifying the core theme interface.
 */

import type { Theme } from '../theme/core';
import type { LayoutTheme, LayoutThemeOverride } from './core';
import { createCompleteLayoutTheme } from './registry';

/**
 * Extended theme interface that includes layouts.
 * Use this when you need access to both component and layout themes.
 */
export interface ExtendedTheme extends Theme {
  layouts: LayoutTheme;
}

/**
 * Extended theme override that includes layout overrides.
 */
export interface ExtendedThemeOverride {
  colors?: Partial<Theme['colors']>;
  typography?: Partial<Theme['typography']>;
  spacing?: Partial<Theme['spacing']>;
  borderRadius?: Partial<Theme['borderRadius']>;
  shadows?: Partial<Theme['shadows']>;
  breakpoints?: Partial<Theme['breakpoints']>;
  zIndex?: Partial<Theme['zIndex']>;
  components?: Partial<Theme['components']>;
  layouts?: LayoutThemeOverride;
}

/**
 * Creates an extended theme that includes both component and layout themes.
 * 
 * @param baseTheme - The base theme from ThemeProvider
 * @param layoutOverrides - Optional layout theme overrides
 * @returns Extended theme with layout support
 * @example
 */
export function createExtendedTheme(
  baseTheme: Theme,
  layoutOverrides: LayoutThemeOverride = {}
): ExtendedTheme {
  const layoutTheme = createCompleteLayoutTheme(layoutOverrides);
  
  return {
    ...baseTheme,
    layouts: layoutTheme,
  };
}

/**
 * Hook-friendly function to get layout theme from extended theme.
 * 
 * @param extendedTheme - Extended theme containing layouts
 * @param layoutName - Name of the layout to retrieve
 * @returns The layout theme
 * @example
 */
export function getLayoutFromExtendedTheme<T>(
  extendedTheme: ExtendedTheme,
  layoutName: keyof LayoutTheme
): T {
  return extendedTheme.layouts[layoutName] as T;
}
