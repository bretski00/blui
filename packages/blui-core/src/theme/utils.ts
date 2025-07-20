import type { Theme, ThemeOverride } from './core';

/**
 * Deep merge utility for combining theme objects
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

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Create a theme by merging the default theme with custom overrides
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
 */
export function getThemeValue(theme: Theme, path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], theme as any);
}

/**
 * CSS-in-JS helper to create responsive styles
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
 */
export function createCSSVariables(theme: Theme, prefix = '--theme'): Record<string, string> {
  const variables: Record<string, string> = {};
  
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
