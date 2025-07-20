/**
 * @fileoverview
 * Layout theme registry system.
 * 
 * This module provides the registration and retrieval system for layout themes,
 * similar to the component theme registry but specifically for layouts.
 */

import type { LayoutTheme, LayoutThemes, LayoutThemeOverride } from './core';
import { deepMerge } from '../theme/utils';

/**
 * Global registry for layout themes.
 * Layouts register their themes here when imported.
 */
const layoutThemeRegistry = new Map<keyof LayoutThemes, any>();

/**
 * Registers a layout theme in the global registry.
 * Called automatically when layout modules are imported.
 * 
 * @param layoutName - The name of the layout
 * @param theme - The layout's theme configuration
 */
export function registerLayoutTheme<K extends keyof LayoutThemes>(
  layoutName: K,
  theme: LayoutThemes[K]
): void {
  layoutThemeRegistry.set(layoutName, theme);
}

/**
 * Gets a specific layout theme from the registry with type safety.
 * 
 * @param layoutTheme - The complete layout theme object
 * @param layoutName - The name of the layout whose theme to retrieve
 * @returns The layout's theme configuration
 * @throws Error if the layout theme is not found
 */
export function getLayoutTheme<T>(
  layoutTheme: LayoutTheme,
  layoutName: keyof LayoutThemes
): T {
  const theme = layoutTheme[layoutName];
  if (!theme) {
    throw new Error(
      `Layout theme for "${String(layoutName)}" not found. ` +
      `Make sure the layout is imported and registered.`
    );
  }
  return theme as T;
}

/**
 * Creates a complete layout theme by merging all registered layout themes.
 * 
 * @param overrides - Optional layout theme overrides
 * @returns Complete layout theme with all registered layouts
 */
export function createCompleteLayoutTheme(overrides: LayoutThemeOverride = {}): LayoutTheme {
  const completeTheme: Partial<LayoutTheme> = {};

  // Add all registered layout themes
  for (const [layoutName, theme] of layoutThemeRegistry.entries()) {
    (completeTheme as any)[layoutName] = theme;
  }

  // Apply overrides if provided
  if (Object.keys(overrides).length > 0) {
    return deepMerge(completeTheme as LayoutTheme, overrides as LayoutTheme);
  }

  return completeTheme as LayoutTheme;
}

/**
 * Gets all registered layout names.
 * Useful for debugging and development tools.
 */
export function getRegisteredLayoutNames(): string[] {
  return Array.from(layoutThemeRegistry.keys()).map(String);
}

/**
 * Gets all registered layout themes as a complete object.
 * This is used by the theme system to build the complete theme.
 * 
 * @returns Object containing all registered layout themes
 */
export function getRegisteredLayoutThemes(): LayoutThemes {
  const layouts = {} as LayoutThemes;
  for (const [name, theme] of layoutThemeRegistry.entries()) {
    (layouts as any)[name] = theme;
  }
  return layouts;
}

/**
 * Checks if a layout theme is registered.
 * 
 * @param layoutName - The name of the layout to check
 * @returns True if the layout is registered
 */
export function isLayoutThemeRegistered(layoutName: keyof LayoutThemes): boolean {
  return layoutThemeRegistry.has(layoutName);
}
