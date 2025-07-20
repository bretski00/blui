/**
 * @file
 * Layout provider and context for layout theme management.
 */

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LayoutTheme, LayoutThemes, LayoutThemeOverride } from './core';
import { createCompleteLayoutTheme, getLayoutTheme } from './registry';

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
 * @param root0
 * @param root0.children
 * @param root0.layoutTheme
 * @example
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
 * @example
 */
export function useLayoutContext(): LayoutContextValue {
  const layoutContext = useContext(LayoutContext);
  
  // Return early if we have layout context
  if (layoutContext) {
    return layoutContext;
  }
  
  // Fallback to default layout theme if no layout context
  return {
    layoutTheme: createCompleteLayoutTheme(),
  };
}

/**
 * Hook for components to get their specific layout theme with type safety.
 * 
 * @template T - The layout theme type
 * @param layoutName - The name of the layout whose theme to retrieve
 * @returns The layout's theme configuration
 * @example
 */
export function useLayoutTheme<T>(layoutName: keyof LayoutThemes): T {
  const { layoutTheme } = useLayoutContext();
  return useMemo(() => getLayoutTheme<T>(layoutTheme, layoutName), [layoutTheme, layoutName]);
}
