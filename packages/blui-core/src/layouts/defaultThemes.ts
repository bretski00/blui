/**
 * @fileoverview
 * Default layout themes.
 * 
 * This module provides the default theme configurations for all layout components.
 */

import type { GridLayoutTheme, FlexLayoutTheme, LayoutSpacing, LayoutBreakpoints } from './core';

/**
 * Default spacing values shared across layouts
 */
export const defaultLayoutSpacing: LayoutSpacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
};

/**
 * Default responsive breakpoints shared across layouts
 */
export const defaultLayoutBreakpoints: LayoutBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Default theme for Grid layout
 */
export const defaultGridLayoutTheme: GridLayoutTheme = {
  spacing: defaultLayoutSpacing,
  breakpoints: defaultLayoutBreakpoints,
  gap: {
    default: '1rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  templates: {
    autoFit: {
      minWidth: '200px',
      maxWidth: '1fr',
    },
    columns: {
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))',
      '12': 'repeat(12, minmax(0, 1fr))',
    },
  },
  alignment: {
    justify: {
      start: 'start',
      center: 'center',
      end: 'end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    },
    align: {
      start: 'start',
      center: 'center',
      end: 'end',
      stretch: 'stretch',
    },
  },
};

/**
 * Default theme for Flex layout
 */
export const defaultFlexLayoutTheme: FlexLayoutTheme = {
  spacing: defaultLayoutSpacing,
  breakpoints: defaultLayoutBreakpoints,
  gap: {
    default: '1rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  direction: {
    row: 'row',
    'row-reverse': 'row-reverse',
    column: 'column',
    'column-reverse': 'column-reverse',
  },
  wrap: {
    nowrap: 'nowrap',
    wrap: 'wrap',
    'wrap-reverse': 'wrap-reverse',
  },
  justify: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  },
  align: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  },
  flex: {
    '1': '1 1 0%',
    auto: '1 1 auto',
    initial: '0 1 auto',
    none: 'none',
  },
};
