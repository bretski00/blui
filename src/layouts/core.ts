/**
 * @fileoverview
 * Layout theme core types and interfaces.
 * 
 * This module defines the base types for layout themes and provides
 * the foundation for the layout theme registration system.
 */

/**
 * Base spacing values for layouts
 */
export interface LayoutSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Responsive breakpoint configuration for layouts
 */
export interface LayoutBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Base layout theme interface that all layout themes extend
 */
export interface BaseLayoutTheme {
  /** Spacing values for gaps, padding, margins */
  spacing: LayoutSpacing;
  /** Responsive breakpoint values */
  breakpoints: LayoutBreakpoints;
}

/**
 * Grid layout theme configuration
 */
export interface GridLayoutTheme extends BaseLayoutTheme {
  /** Default gap between grid items */
  gap: {
    default: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  /** Grid template configurations */
  templates: {
    /** Auto-fit columns with minimum width */
    autoFit: {
      minWidth: string;
      maxWidth: string;
    };
    /** Common column patterns */
    columns: {
      '1': string;
      '2': string;
      '3': string;
      '4': string;
      '6': string;
      '12': string;
    };
  };
  /** Alignment options */
  alignment: {
    justify: {
      start: string;
      center: string;
      end: string;
      between: string;
      around: string;
      evenly: string;
    };
    align: {
      start: string;
      center: string;
      end: string;
      stretch: string;
    };
  };
}

/**
 * Flex layout theme configuration
 */
export interface FlexLayoutTheme extends BaseLayoutTheme {
  /** Default gap between flex items */
  gap: {
    default: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  /** Flex direction options */
  direction: {
    row: string;
    'row-reverse': string;
    column: string;
    'column-reverse': string;
  };
  /** Flex wrap options */
  wrap: {
    nowrap: string;
    wrap: string;
    'wrap-reverse': string;
  };
  /** Justify content options */
  justify: {
    start: string;
    center: string;
    end: string;
    between: string;
    around: string;
    evenly: string;
  };
  /** Align items options */
  align: {
    start: string;
    center: string;
    end: string;
    stretch: string;
    baseline: string;
  };
  /** Common flex values */
  flex: {
    '1': string;
    auto: string;
    initial: string;
    none: string;
  };
}

/**
 * Registry of all layout themes.
 * When adding new layouts, extend this interface using module augmentation.
 */
export interface LayoutThemes {
  grid: GridLayoutTheme;
  flex: FlexLayoutTheme;
}

/**
 * Complete layout theme containing all registered layouts
 */
export type LayoutTheme = LayoutThemes;

/**
 * Partial layout theme for overrides
 */
export type LayoutThemeOverride = {
  [K in keyof LayoutThemes]?: Partial<LayoutThemes[K]>;
};

/**
 * Utility type for accessing specific layout themes
 */
export type GetLayoutTheme<K extends keyof LayoutThemes> = LayoutThemes[K];
