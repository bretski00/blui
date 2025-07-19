/**
 * Badge component theme interface.
 * Defines styling properties for badge variants and sizes.
 * This theme is automatically registered with the global theme system.
 */
export interface BadgeTheme {
  /**
   * Color schemes for different badge variants.
   * Each variant defines background, text, and border colors.
   */
  colors: {
    /** Primary badge variant - matches brand colors */
    primary: {
      /** Background color */
      background: string;
      /** Text color */
      text: string;
      /** Border color (for outline variant) */
      border: string;
    };
    /** Secondary badge variant - neutral appearance */
    secondary: {
      /** Background color */
      background: string;
      /** Text color */
      text: string;
      /** Border color (for outline variant) */
      border: string;
    };
    /** Success badge variant - positive states */
    success: {
      /** Background color */
      background: string;
      /** Text color */
      text: string;
      /** Border color (for outline variant) */
      border: string;
    };
    /** Warning badge variant - cautionary states */
    warning: {
      /** Background color */
      background: string;
      /** Text color */
      text: string;
      /** Border color (for outline variant) */
      border: string;
    };
    /** Error badge variant - negative states */
    error: {
      /** Background color */
      background: string;
      /** Text color */
      text: string;
      /** Border color (for outline variant) */
      border: string;
    };
  };
  /**
   * Size variations for badges.
   * Defines padding, font size, and height for each size.
   */
  sizes: {
    /** Small badge size */
    sm: {
      /** Internal padding */
      padding: string;
      /** Font size */
      fontSize: string;
      /** Total height */
      height: string;
    };
    /** Medium badge size (default) */
    md: {
      /** Internal padding */
      padding: string;
      /** Font size */
      fontSize: string;
      /** Total height */
      height: string;
    };
    /** Large badge size */
    lg: {
      /** Internal padding */
      padding: string;
      /** Font size */
      fontSize: string;
      /** Total height */
      height: string;
    };
  };
  /** Border radius for badge corners */
  borderRadius: string;
  /** Font weight for badge text */
  fontWeight: number;
}

/**
 * Default badge theme configuration.
 * Provides sensible defaults for all badge variants and sizes.
 * Can be overridden through the theme system.
 * 
 * @example
 * ```typescript
 * // Override badge theme
 * updateTheme({
 *   components: {
 *     badge: {
 *       colors: {
 *         primary: {
 *           background: '#ff000020', // Custom red with opacity
 *           text: '#ff0000',
 *           border: '#ff000040'
 *         }
 *       }
 *     }
 *   }
 * });
 * ```
 */
export const defaultBadgeTheme: BadgeTheme = {
  colors: {
    primary: {
      background: '#dbeafe',
      text: '#1e40af',
      border: '#93c5fd',
    },
    secondary: {
      background: '#f3f4f6',
      text: '#374151',
      border: '#d1d5db',
    },
    success: {
      background: '#dcfce7',
      text: '#166534',
      border: '#bbf7d0',
    },
    warning: {
      background: '#fef3c7',
      text: '#92400e',
      border: '#fde68a',
    },
    error: {
      background: '#fee2e2',
      text: '#991b1b',
      border: '#fecaca',
    },
  },
  sizes: {
    sm: {
      padding: '0.125rem 0.375rem',
      fontSize: '0.75rem',
      height: '1.25rem',
    },
    md: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.875rem',
      height: '1.5rem',
    },
    lg: {
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      height: '2rem',
    },
  },
  borderRadius: '0.375rem',
  fontWeight: 500,
};

/**
 * Module augmentation to add BadgeTheme to the global ComponentThemes interface.
 * This enables type-safe access to badge theme through the theme system.
 * 
 * @internal This is handled automatically when the Badge component is imported.
 */
declare module '../../theme/core' {
  interface ComponentThemes {
    /** Badge component theme configuration */
    badge: BadgeTheme;
  }
}
