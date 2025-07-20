import type { CoreTheme, ComponentThemes, Theme } from './core';
import { getRegisteredLayoutThemes } from '../layouts/registry';

/**
 * Global registry for component themes.
 * Components automatically register their themes here when imported.
 * @internal
 */
const componentThemeRegistry = new Map<string, any>();

/**
 * Registers a component theme with the global theme system.
 * This function is called automatically when components are imported.
 * 
 * @template T - The component theme type
 * @param componentName - The unique name for the component theme (e.g., 'button', 'input')
 * @param themeDefinition - The default theme configuration for the component
 * 
 * @example
 * ```typescript
 * // In Button/theme.ts
 * export const defaultButtonTheme: ButtonTheme = {
 *   colors: { primary: { background: '#007bff' } }
 * };
 * 
 * // In Button.tsx
 * registerComponentTheme('button', defaultButtonTheme);
 * ```
 */
export function registerComponentTheme<T>(
  componentName: keyof ComponentThemes,
  themeDefinition: T
): void {
  componentThemeRegistry.set(componentName as string, themeDefinition);
}

/**
 * Retrieves all registered component themes.
 * Used internally by the theme system to build the complete theme object.
 * 
 * @returns Record of all registered component themes
 * @internal
 */
export function getRegisteredComponentThemes(): Record<string, any> {
  const themes: Record<string, any> = {};
  componentThemeRegistry.forEach((theme, name) => {
    themes[name] = theme;
  });
  return themes;
}

/**
 * Creates a complete theme by combining core theme with all registered component themes.
 * This is the main function that builds the full theme object available to components.
 * 
 * @param coreTheme - The base core theme containing colors, typography, spacing, etc.
 * @returns Complete theme object with core theme and all component themes
 * 
 * @example
 * ```typescript
 * const completeTheme = createCompleteTheme(defaultCoreTheme);
 * // completeTheme.colors.primary (from core)
 * // completeTheme.components.button (from registered components)
 * ```
 */
export function createCompleteTheme(coreTheme: CoreTheme): Theme {
  return {
    ...coreTheme,
    components: getRegisteredComponentThemes() as ComponentThemes,
    layouts: getRegisteredLayoutThemes(),
  };
}

/**
 * Retrieves a specific component's theme from the complete theme object.
 * This is the main function components use to access their theme configuration.
 * 
 * @template T - The expected component theme type
 * @param theme - The complete theme object
 * @param componentName - The name of the component whose theme to retrieve
 * @returns The component's theme configuration with full type safety
 * 
 * @example
 * ```typescript
 * // In Button component
 * const buttonTheme = getComponentTheme<ButtonTheme>(theme, 'button');
 * const primaryColor = buttonTheme.colors.primary.background;
 * 
 * // In Badge component  
 * const badgeTheme = getComponentTheme<BadgeTheme>(theme, 'badge');
 * const badgeRadius = badgeTheme.borderRadius;
 * ```
 */
export function getComponentTheme<T>(
  theme: Theme,
  componentName: keyof ComponentThemes
): T {
  return theme.components[componentName] as T;
}
