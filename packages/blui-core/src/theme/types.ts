// Core theme type definitions
/**
 * Color palette interface defining the primary colors used throughout the theme.
 * 
 * Provides semantic color names that map to specific color values, ensuring
 * consistent color usage across all components and maintaining design coherence.
 * 
 * @example
 * ```tsx
 * const palette: ColorPalette = {
 *   primary: '#3b82f6',
 *   secondary: '#6b7280',
 *   success: '#10b981',
 *   warning: '#f59e0b',
 *   error: '#ef4444',
 *   info: '#3b82f6',
 *   surface: '#ffffff',
 *   background: '#f8fafc',
 *   text: '#1f2937',
 *   textSecondary: '#6b7280'
 * };
 * ```
 */
export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
}

/**
 * Typography interface defining font families, sizes, weights, and line heights.
 * 
 * Provides a comprehensive typography system with semantic scale for text
 * rendering across the entire design system, ensuring consistent text styling.
 * 
 * @example
 * ```tsx
 * const typography: Typography = {
 *   fontFamily: {
 *     primary: '"Inter", sans-serif',
 *     secondary: '"Merriweather", serif',
 *     mono: '"Fira Code", monospace'
 *   },
 *   fontSize: {
 *     xs: '0.75rem',
 *     sm: '0.875rem',
 *     base: '1rem',
 *     lg: '1.125rem',
 *     xl: '1.25rem'
 *   }
 * };
 * ```
 */
export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

/**
 * Spacing scale interface defining consistent spacing values.
 * 
 * Provides a standardized spacing system for margins, padding, gaps,
 * and other spatial relationships throughout the design system.
 * 
 * @example
 * ```tsx
 * const spacing: Spacing = {
 *   xs: '0.25rem',    // 4px
 *   sm: '0.5rem',     // 8px
 *   md: '1rem',       // 16px
 *   lg: '1.5rem',     // 24px
 *   xl: '2rem',       // 32px
 *   '2xl': '3rem',    // 48px
 *   '3xl': '4rem'     // 64px
 * };
 * ```
 */
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

/**
 * Border radius scale interface defining consistent corner radius values.
 * 
 * Provides standardized border radius values for creating consistent
 * rounded corners across components in the design system.
 * 
 * @example
 * ```tsx
 * const borderRadius: BorderRadius = {
 *   none: '0',
 *   sm: '0.125rem',   // 2px
 *   md: '0.375rem',   // 6px
 *   lg: '0.5rem',     // 8px
 *   xl: '0.75rem',    // 12px
 *   full: '9999px'    // Fully rounded
 * };
 * ```
 */
export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

/**
 * Shadow scale interface defining consistent box shadow values.
 * 
 * Provides standardized shadow depths for creating visual hierarchy
 * and elevation effects throughout the design system.
 * 
 * @example
 * ```tsx
 * const shadows: Shadows = {
 *   none: 'none',
 *   sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
 *   md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
 *   lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
 *   xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
 * };
 * ```
 */
export interface Shadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Breakpoints interface defining responsive design breakpoints.
 * 
 * Provides standardized screen size breakpoints for creating responsive
 * layouts and components that adapt to different device sizes.
 * 
 * @example
 * ```tsx
 * const breakpoints: Breakpoints = {
 *   sm: '640px',     // Small devices
 *   md: '768px',     // Medium devices (tablets)
 *   lg: '1024px',    // Large devices (laptops)
 *   xl: '1280px',    // Extra large devices
 *   '2xl': '1536px'  // 2X large devices
 * };
 * ```
 */
export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Z-index scale interface defining stacking order values.
 * 
 * Provides standardized z-index values for managing the stacking
 * context and layering of components in the UI.
 * 
 * @example
 * ```tsx
 * const zIndex: ZIndex = {
 *   auto: 'auto',
 *   base: 0,
 *   dropdown: 1000,
 *   modal: 1500,
 *   popover: 2000,
 *   tooltip: 3000
 * };
 * ```
 */
export interface ZIndex {
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  popover: number;
  tooltip: number;
}

// Component-specific theme configurations
/**
 *
 */
export interface ButtonTheme {
  colors: {
    primary: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
    secondary: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
    outline: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
    ghost: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
  };
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      height: string;
    };
    md: {
      padding: string;
      fontSize: string;
      height: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      height: string;
    };
  };
  borderRadius: string;
  fontWeight: number;
  transition: string;
}

/**
 *
 */
export interface InputTheme {
  colors: {
    background: string;
    border: string;
    borderFocus: string;
    borderError: string;
    text: string;
    placeholder: string;
  };
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      height: string;
    };
    md: {
      padding: string;
      fontSize: string;
      height: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      height: string;
    };
  };
  borderRadius: string;
  transition: string;
}

/**
 *
 */
export interface CardTheme {
  background: string;
  border: string;
  borderRadius: string;
  shadow: string;
  padding: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Main theme interface
/**
 *
 */
export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
  components: {
    button: ButtonTheme;
    input: InputTheme;
    card: CardTheme;
  };
}

// Type for partial theme overrides
/**
 *
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 *
 */
export type ThemeOverride = DeepPartial<Theme>;
