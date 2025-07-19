/**
 * Button component theme interface.
 * Defines all styling properties for button variants, sizes, and states.
 * This theme is automatically registered with the global theme system.
 */
export interface ButtonTheme {
  /**
   * Color schemes for different button variants.
   * Each variant defines colors for normal, hover, and active states.
   */
  colors: {
    /** Primary button variant - main call-to-action style */
    primary: {
      /** Default background color */
      background: string;
      /** Background color on hover */
      backgroundHover: string;
      /** Background color when pressed/active */
      backgroundActive: string;
      /** Text color */
      text: string;
      /** Border color */
      border: string;
    };
    /** Secondary button variant - less prominent actions */
    secondary: {
      /** Default background color */
      background: string;
      /** Background color on hover */
      backgroundHover: string;
      /** Background color when pressed/active */
      backgroundActive: string;
      /** Text color */
      text: string;
      /** Border color */
      border: string;
    };
    /** Outline button variant - minimal style with border */
    outline: {
      /** Default background color (usually transparent) */
      background: string;
      /** Background color on hover */
      backgroundHover: string;
      /** Background color when pressed/active */
      backgroundActive: string;
      /** Text color */
      text: string;
      /** Border color */
      border: string;
    };
    /** Ghost button variant - minimal style without border */
    ghost: {
      /** Default background color (usually transparent) */
      background: string;
      /** Background color on hover */
      backgroundHover: string;
      /** Background color when pressed/active */
      backgroundActive: string;
      /** Text color */
      text: string;
      /** Border color (usually transparent) */
      border: string;
    };
  };
  /**
   * Size variations for buttons.
   * Defines padding, font size, and height for each size.
   */
  sizes: {
    /** Small button size */
    sm: {
      /** Internal padding */
      padding: string;
      /** Font size */
      fontSize: string;
      /** Total height */
      height: string;
    };
    /** Medium button size (default) */
    md: {
      /** Internal padding */
      padding: string;
      /** Font size */
      fontSize: string;
      /** Total height */
      height: string;
    };
    /** Large button size */
    lg: {
      /** Internal padding */
      padding: string;
      /** Font size */
      fontSize: string;
      /** Total height */
      height: string;
    };
  };
  /** Border radius for button corners */
  borderRadius: string;
  /** Font weight for button text */
  fontWeight: number;
  /** CSS transition for smooth state changes */
  transition: string;
}

/**
 * Default button theme configuration.
 * Provides sensible defaults for all button variants and sizes.
 * Can be overridden through the theme system.
 * 
 * @example
 * ```typescript
 * // Override button theme
 * updateTheme({
 *   components: {
 *     button: {
 *       colors: {
 *         primary: {
 *           background: '#ff0000', // Custom red primary
 *           backgroundHover: '#cc0000'
 *         }
 *       }
 *     }
 *   }
 * });
 * ```
 */
export const defaultButtonTheme: ButtonTheme = {
  colors: {
    primary: {
      background: '#3b82f6',
      backgroundHover: '#2563eb',
      backgroundActive: '#1d4ed8',
      text: '#ffffff',
      border: '#3b82f6',
    },
    secondary: {
      background: '#6b7280',
      backgroundHover: '#4b5563',
      backgroundActive: '#374151',
      text: '#ffffff',
      border: '#6b7280',
    },
    outline: {
      background: 'transparent',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#e5e7eb',
      text: '#3b82f6',
      border: '#3b82f6',
    },
    ghost: {
      background: 'transparent',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#e5e7eb',
      text: '#6b7280',
      border: 'transparent',
    },
  },
  sizes: {
    sm: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      height: '2rem',
    },
    md: {
      padding: '0.625rem 1rem',
      fontSize: '1rem',
      height: '2.5rem',
    },
    lg: {
      padding: '0.75rem 1.25rem',
      fontSize: '1.125rem',
      height: '3rem',
    },
  },
  borderRadius: '0.375rem',
  fontWeight: 500,
  transition: 'all 0.2s ease-in-out',
};

/**
 * Module augmentation to add ButtonTheme to the global ComponentThemes interface.
 * This enables type-safe access to button theme through the theme system.
 * 
 * @internal This is handled automatically when the Button component is imported.
 */
declare module '../../theme/core' {
  interface ComponentThemes {
    /** Button component theme configuration */
    button: ButtonTheme;
  }
}
