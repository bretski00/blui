/**
 * Core theme foundation that provides the base design tokens for the entire UI system.
 * Components will extend this interface via module augmentation to add their own themes.
 * 
 * @example
 * ```types/**
 * Complete theme interface combining core theme with all component themes.
 * This is the main theme object that components will receive.
 * 
 * @example
 * ```typescript
 * const { theme } = useTheme();
 * // theme.colors.primary - core theme
 * // theme.components.button - component theme
 * // theme.layouts.grid - layout theme
 * ```
 */
export interface Theme extends CoreTheme {
  /** All registered component themes */
  components: ComponentThemes;
  /** All registered layout themes */
  layouts: import('../layouts/core').LayoutThemes;
}

/**
 * Core theme interface containing base design tokens.
 * This interface defines the fundamental design system values
 * that all components can access through the theme context.
 * 
 * @example
 * ```typescript
 * // Access core theme values
 * const { theme } = useTheme();
 * const primaryColor = theme.colors.primary;
 * const fontSize = theme.typography.fontSize.lg;
 * ```
 */
export interface CoreTheme {
  /**
   * Color palette for the design system.
   * Provides semantic colors that components can reference.
   */
  colors: {
    /** Primary brand color used for main actions and highlights */
    primary: string;
    /** Secondary color for less prominent actions */
    secondary: string;
    /** Success state color (typically green) */
    success: string;
    /** Warning state color (typically yellow/orange) */
    warning: string;
    /** Error state color (typically red) */
    error: string;
    /** Informational state color (typically blue) */
    info: string;
    /** Main background color of the application */
    background: string;
    /** Surface color for cards, modals, and elevated elements */
    surface: string;
    /** Text colors for different hierarchy levels */
    text: {
      /** Primary text color for main content */
      primary: string;
      /** Secondary text color for less important content */
      secondary: string;
      /** Disabled text color for inactive elements */
      disabled: string;
    };
    /** Border color for dividers and element outlines */
    border: string;
  };
  /**
   * Typography system defining fonts, sizes, weights, and spacing.
   * Ensures consistent text styling across all components.
   */
  typography: {
    /** Font family definitions for different use cases */
    fontFamily: {
      /** Primary font family for body text and UI elements */
      primary: string;
      /** Secondary font family for headings or special emphasis */
      secondary: string;
      /** Monospace font family for code and technical content */
      mono: string;
    };
    /** Font size scale using consistent ratios */
    fontSize: {
      /** Extra small text (12px) */
      xs: string;
      /** Small text (14px) */
      sm: string;
      /** Base/body text size (16px) */
      base: string;
      /** Large text (18px) */
      lg: string;
      /** Extra large text (20px) */
      xl: string;
      /** 2x large text (24px) */
      '2xl': string;
      /** 3x large text (30px) */
      '3xl': string;
      /** 4x large text (36px) */
      '4xl': string;
    };
    /** Font weight scale for text emphasis */
    fontWeight: {
      /** Light weight (300) */
      light: number;
      /** Normal/regular weight (400) */
      normal: number;
      /** Medium weight (500) */
      medium: number;
      /** Semi-bold weight (600) */
      semibold: number;
      /** Bold weight (700) */
      bold: number;
    };
    /** Line height values for text readability */
    lineHeight: {
      /** Tight line height (1.25) for headings */
      tight: number;
      /** Normal line height (1.5) for body text */
      normal: number;
      /** Relaxed line height (1.75) for long-form content */
      relaxed: number;
    };
  };
  /**
   * Spacing scale for consistent layout and component spacing.
   * Used for padding, margins, gaps, and other spatial relationships.
   */
  spacing: {
    /** Extra small spacing (4px) */
    xs: string;
    /** Small spacing (8px) */
    sm: string;
    /** Medium spacing (16px) - base unit */
    md: string;
    /** Large spacing (24px) */
    lg: string;
    /** Extra large spacing (32px) */
    xl: string;
    /** 2x large spacing (48px) */
    '2xl': string;
    /** 3x large spacing (64px) */
    '3xl': string;
    /** 4x large spacing (80px) */
    '4xl': string;
  };
  /**
   * Border radius values for consistent rounded corners.
   * Used across buttons, cards, inputs, and other UI elements.
   */
  borderRadius: {
    /** No border radius (0px) */
    none: string;
    /** Small border radius (4px) */
    sm: string;
    /** Medium border radius (8px) */
    md: string;
    /** Large border radius (12px) */
    lg: string;
    /** Extra large border radius (16px) */
    xl: string;
    /** Fully rounded (9999px) for pills and circular elements */
    full: string;
  };
  /**
   * Shadow system for depth and elevation.
   * Creates visual hierarchy and focus states.
   */
  shadows: {
    /** No shadow */
    none: string;
    /** Subtle shadow for slight elevation */
    sm: string;
    /** Medium shadow for cards and modals */
    md: string;
    /** Large shadow for floating elements */
    lg: string;
    /** Extra large shadow for prominent overlays */
    xl: string;
  };
  /**
   * Responsive breakpoints for consistent layouts.
   * Used for responsive design and adaptive components.
   */
  breakpoints: {
    /** Small screens (640px) */
    sm: string;
    /** Medium screens (768px) */
    md: string;
    /** Large screens (1024px) */
    lg: string;
    /** Extra large screens (1280px) */
    xl: string;
    /** 2x large screens (1536px) */
    '2xl': string;
  };
  /**
   * Z-index scale for layering elements.
   * Ensures proper stacking order for overlays and interactive elements.
   */
  zIndex: {
    /** Base layer (0) */
    base: number;
    /** Dropdown menus (10) */
    dropdown: number;
    /** Sticky elements (20) */
    sticky: number;
    /** Fixed positioned elements (30) */
    fixed: number;
    /** Modal overlays (40) */
    modal: number;
    /** Popover elements (50) */
    popover: number;
    /** Tooltip elements (60) */
    tooltip: number;
  };
}

/**
 * Component theme registry interface that gets extended by individual components.
 * Each component adds its theme interface here via module augmentation.
 * 
 * @example
 * ```typescript
 * // In Button/theme.ts
 * declare module '../theme/core' {
 *   interface ComponentThemes {
 *     button: ButtonTheme;
 *   }
 * }
 * ```
 */
export interface ComponentThemes {
  // This will be extended by each component via module augmentation
}

/**
 * Complete theme interface combining core theme and component themes.
 * This is the main theme object that components receive and use.
 * 
 * @example
 * ```typescript
 * const { theme } = useTheme();
 * // theme.colors.primary - core theme
 * // theme.components.button - component theme
 * ```
 */
export interface Theme extends CoreTheme {
  /** All registered component themes */
  components: ComponentThemes;
  /** All registered layout themes */
  layouts: import('../layouts/core').LayoutThemes;
}

/**
 * Utility type for creating deep partial objects.
 * Used for theme overrides where only specific values need to be changed.
 * 
 * @template T - The type to make deeply partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Type for theme override objects passed to updateTheme().
 * Allows partial updates to any part of the theme structure.
 * 
 * @example
 * ```typescript
 * const override: ThemeOverride = {
 *   colors: { primary: '#ff0000' },
 *   components: {
 *     button: {
 *       colors: { primary: { background: '#ff0000' } }
 *     }
 *   }
 * };
 * updateTheme(override);
 * ```
 */
export type ThemeOverride = DeepPartial<Theme>;

/**
 * Helper type for component theme registration.
 * Ensures type safety when registering component themes.
 * 
 * @template T - The component theme type
 */
export type ComponentThemeRegistration<T> = {
  [K in keyof T]: T[K];
};
