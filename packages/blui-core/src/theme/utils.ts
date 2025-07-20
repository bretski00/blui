import type { Theme, ThemeOverride } from './core';

/**
 * Deep merge utility for combining theme objects.
 * 
 * Recursively merges two objects, with source properties taking precedence
 * over target properties. Used for applying theme overrides.
 * 
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns The merged object
 * @example
 * ```tsx
 * const merged = deepMerge(
 *   { colors: { primary: '#blue' } },
 *   { colors: { secondary: '#red' } }
 * );
 * // Result: { colors: { primary: '#blue', secondary: '#red' } }
 * ```
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: any): T {
  const result = { ...target } as any;

  for (const key in source) {
    if (source[key] !== undefined) {
      if (isObject(target[key]) && isObject(source[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

/**
 * Type guard to check if a value is a plain object.
 * 
 * Determines whether the given item is a plain object (not an array or null).
 * Used internally by deepMerge to decide how to handle property merging.
 * 
 * @param item - The item to check
 * @returns True if the item is a plain object, false otherwise
 * @example
 * ```tsx
 * isObject({}); // true
 * isObject([]); // false
 * isObject(null); // false
 * ```
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Create a theme by merging the default theme with custom overrides.
 * 
 * Combines a base theme with optional override values to create a customized
 * theme configuration. Uses deep merging to preserve nested properties.
 * 
 * @param baseTheme - The base theme to start with
 * @param overrides - Optional theme overrides to apply
 * @returns The merged theme configuration
 * @example
 * ```tsx
 * const customTheme = createTheme(defaultTheme, {
 *   colors: {
 *     primary: '#custom-blue'
 *   },
 *   spacing: {
 *     lg: '2rem'
 *   }
 * });
 * ```
 */
export function createTheme(baseTheme: Theme, overrides?: ThemeOverride): Theme {
  if (!overrides) {
    return baseTheme;
  }
  
  return deepMerge(baseTheme, overrides);
}

/**
 * Get a nested value from the theme using dot notation
 * Example: getThemeValue(theme, 'colors.primary') returns theme.colors.primary
 * @param theme
 * @param path
 * @example
 */
export function getThemeValue(theme: Theme, path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], theme as any);
}

/**
 * CSS-in-JS helper to create responsive styles
 * @param theme
 * @param values
 * @example
 */
export function responsive(theme: Theme, values: Record<string, string>) {
  const breakpoints = theme.breakpoints;
  let css = '';
  
  Object.entries(values).forEach(([breakpoint, value]) => {
    if (breakpoint === 'base') {
      css += value;
    } else if (breakpoints[breakpoint as keyof typeof breakpoints]) {
      css += `@media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]}) { ${value} }`;
    }
  });
  
  return css;
}

/**
 * Create CSS custom properties from theme values
 * @param theme
 * @param prefix
 * @example
 */
export function createCSSVariables(theme: Theme, prefix = '--theme'): Record<string, string> {
  const variables: Record<string, string> = {};
  
  /**
   * Recursively flattens a nested object into CSS variable names.
   * 
   * Converts nested object properties into flat CSS variable names
   * by joining keys with hyphens and prefixing with the current path.
   * 
   * @param obj - The object to flatten
   * @param currentPath - The current path prefix for variable names
   * @example
   * ```tsx
   * flattenObject({ colors: { primary: '#blue' } }, 'theme');
   * // Creates: --theme-colors-primary: #blue
   * ```
   */
  function flattenObject(obj: any, currentPath = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      const path = currentPath ? `${currentPath}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flattenObject(value, path);
      } else {
        variables[`${prefix}-${path}`] = String(value);
      }
    });
  }
  
  flattenObject(theme);
  return variables;
}

/**
 * Apply CSS variables to the document root
 * @param variables
 * @example
 */
export function applyCSSVariables(variables: Record<string, string>): void {
  const root = document.documentElement;
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Type-safe theme accessor with autocomplete
 */
export const themeAccess = {
  colors: (theme: Theme) => theme.colors,
  typography: (theme: Theme) => theme.typography,
  spacing: (theme: Theme) => theme.spacing,
  borderRadius: (theme: Theme) => theme.borderRadius,
  shadows: (theme: Theme) => theme.shadows,
  breakpoints: (theme: Theme) => theme.breakpoints,
  zIndex: (theme: Theme) => theme.zIndex,
  components: (theme: Theme) => theme.components,
} as const;
