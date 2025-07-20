import React, { createContext, useContext, useMemo, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Theme, ThemeOverride } from './core';
import { defaultCoreTheme } from './defaultTheme';
import { createTheme, createCSSVariables, applyCSSVariables } from './utils';
import { createCompleteTheme, getComponentTheme } from './registry';

/**
 * Context value interface for the theme system.
 * Provides access to the current theme and the ability to update it.
 */
interface ThemeContextValue {
  /** The complete theme object with core theme and all component themes */
  theme: Theme;
  /** Function to update the theme with partial overrides */
  updateTheme: (overrides: ThemeOverride) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps {
  /** The child components that will have access to the theme */
  children: ReactNode;
  /** 
   * Initial theme overrides to apply 
   * @default undefined
   */
  theme?: ThemeOverride;
  /** 
   * Whether to generate and apply CSS variables for the theme
   * @default true
   */
  enableCSSVariables?: boolean;
  /** 
   * Prefix for CSS variable names
   * @default '--ui'
   */
  cssVariablePrefix?: string;
}

/**
 * Theme provider component that supplies theme context to all child components.
 * Manages theme state, handles updates, and optionally generates CSS variables.
 * 
 * This component automatically includes all registered component themes,
 * so you don't need to manually configure themes for each component.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourAppComponents />
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // With initial theme overrides
 * function App() {
 *   return (
 *     <ThemeProvider 
 *       theme={{
 *         colors: { primary: '#ff0000' },
 *         components: {
 *           button: {
 *             borderRadius: '8px'
 *           }
 *         }
 *       }}
 *       enableCSSVariables={true}
 *       cssVariablePrefix="--my-app"
 *     >
 *       <YourAppComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ 
  children, 
  theme: themeOverrides, 
  enableCSSVariables = true,
  cssVariablePrefix = '--ui'
}: ThemeProviderProps) {
  const [currentOverrides, setCurrentOverrides] = React.useState<ThemeOverride>(themeOverrides || {});
  
  const theme = useMemo(() => {
    // Create complete theme with registered component themes
    const completeBaseTheme = createCompleteTheme(defaultCoreTheme);
    return createTheme(completeBaseTheme, currentOverrides);
  }, [currentOverrides]);

  const updateTheme = React.useCallback((overrides: ThemeOverride) => {
    setCurrentOverrides(prev => createTheme(prev as Theme, overrides) as ThemeOverride);
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    updateTheme,
  }), [theme, updateTheme]);

  // Apply CSS variables to document root
  useEffect(() => {
    if (enableCSSVariables) {
      const variables = createCSSVariables(theme, cssVariablePrefix);
      applyCSSVariables(variables);
    }
  }, [theme, enableCSSVariables, cssVariablePrefix]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the theme context.
 * Must be used within a ThemeProvider.
 * 
 * @returns Object containing the current theme and updateTheme function
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, updateTheme } = useTheme();
 *   
 *   const handleColorChange = () => {
 *     updateTheme({
 *       colors: { primary: '#ff0000' }
 *     });
 *   };
 *   
 *   return <div style={{ color: theme.colors.primary }}>Hello</div>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get specific theme values with type safety and memoization.
 * Useful for extracting specific parts of the theme.
 * 
 * @template T - The type of the selected value
 * @param selector - Function that selects a value from the theme
 * @returns The selected theme value
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const primaryColor = useThemeValue(theme => theme.colors.primary);
 *   const fontSize = useThemeValue(theme => theme.typography.fontSize.lg);
 *   
 *   return <div style={{ color: primaryColor, fontSize }}>Content</div>;
 * }
 * ```
 */
export function useThemeValue<T>(selector: (theme: Theme) => T): T {
  const { theme } = useTheme();
  return useMemo(() => selector(theme), [theme, selector]);
}

/**
 * Hook for components to get their specific theme with type safety.
 * Alternative to manually calling getComponentTheme.
 * 
 * @template T - The component theme type
 * @param componentName - The name of the component whose theme to retrieve
 * @returns The component's theme configuration
 * 
 * @example
 * ```tsx
 * function Button() {
 *   const buttonTheme = useComponentTheme<ButtonTheme>('button');
 *   const primaryColor = buttonTheme.colors.primary.background;
 *   
 *   return <button style={{ backgroundColor: primaryColor }}>Click me</button>;
 * }
 * ```
 */
export function useComponentTheme<T>(componentName: keyof Theme['components']): T {
  const { theme } = useTheme();
  return useMemo(() => getComponentTheme<T>(theme, componentName), [theme, componentName]);
}

/**
 * Convenience hooks for accessing common theme sections.
 * These provide quick access to frequently used theme values.
 */

/** Hook to get the colors section of the theme */
export const useColors = () => useThemeValue(theme => theme.colors);

/** Hook to get the typography section of the theme */
export const useTypography = () => useThemeValue(theme => theme.typography);

/** Hook to get the spacing section of the theme */
export const useSpacing = () => useThemeValue(theme => theme.spacing);

/** Hook to get the border radius section of the theme */
export const useBorderRadius = () => useThemeValue(theme => theme.borderRadius);

/** Hook to get the shadows section of the theme */
export const useShadows = () => useThemeValue(theme => theme.shadows);

/** Hook to get the breakpoints section of the theme */
export const useBreakpoints = () => useThemeValue(theme => theme.breakpoints);

/** Hook to get the z-index section of the theme */
export const useZIndex = () => useThemeValue(theme => theme.zIndex);
