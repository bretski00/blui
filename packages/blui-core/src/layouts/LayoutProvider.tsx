/**
 * @fileoverview
 * Layout provider and context for layout theme management.
 */

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LayoutTheme, LayoutThemes, LayoutThemeOverride } from './core';
import { createCompleteLayoutTheme, getLayoutTheme } from './registry';
import { useTheme } from '../theme/ThemeProvider';

/**
 * Context value interface for the layout system.
 */
interface LayoutContextValue {
  /** The complete layout theme object */
  layoutTheme: LayoutTheme;
}

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

/**
 * Props for the LayoutProvider component.
 */
export interface LayoutProviderProps {
  /** Child components that will have access to layout themes */
  children: ReactNode;
  /** Layout theme overrides */
  layoutTheme?: LayoutThemeOverride;
}

/**
 * Layout provider component that supplies layout theme context.
 * This can be used standalone or will be automatically included in ThemeProvider.
 */
export function LayoutProvider({ 
  children, 
  layoutTheme: layoutOverrides = {} 
}: LayoutProviderProps) {
  const layoutTheme = useMemo(() => {
    return createCompleteLayoutTheme(layoutOverrides);
  }, [layoutOverrides]);

  const contextValue = useMemo(() => ({
    layoutTheme,
  }), [layoutTheme]);

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}

/**
 * Hook to access the layout context.
 * Falls back to theme context if no layout context is available.
 */
export function useLayoutContext(): LayoutContextValue {
  const layoutContext = useContext(LayoutContext);
  
  // If no layout context, try to get it from theme context
  if (!layoutContext) {
    try {
      const { theme } = useTheme();
      // Check if theme has layouts property (extended theme)
      if ('layouts' in theme) {
        return {
          layoutTheme: (theme as any).layouts,
        };
      }
      // Fallback to default layout theme
      return {
        layoutTheme: createCompleteLayoutTheme(),
      };
    } catch {
      // If no theme context either, create default
      return {
        layoutTheme: createCompleteLayoutTheme(),
      };
    }
  }
  
  return layoutContext;
}

/**
 * Hook for components to get their specific layout theme with type safety.
 * 
 * @template T - The layout theme type
 * @param layoutName - The name of the layout whose theme to retrieve
 * @returns The layout's theme configuration
 */
export function useLayoutTheme<T>(layoutName: keyof LayoutThemes): T {
  const { layoutTheme } = useLayoutContext();
  return useMemo(() => getLayoutTheme<T>(layoutTheme, layoutName), [layoutTheme, layoutName]);
}
