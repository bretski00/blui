/**
 * Theme configuration interface for Card component.
 * 
 * Defines the styling properties available for customizing Card appearance,
 * including background, borders, shadows, and padding options.
 * 
 * @example
 * ```tsx
 * const customCardTheme: CardTheme = {
 *   background: '#f8fafc',
 *   border: '#e2e8f0',
 *   borderRadius: '0.75rem',
 *   shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
 *   padding: {
 *     sm: '0.75rem',
 *     md: '1rem',
 *     lg: '1.5rem',
 *   }
 * };
 * ```
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

// Default card theme
export const defaultCardTheme: CardTheme = {
  background: '#ffffff',
  border: '#e5e7eb',
  borderRadius: '0.5rem',
  shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  padding: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
};

// Extend the ComponentThemes interface
declare module '../../theme/core' {
  /**
   * Component themes interface augmentation for Card.
   * 
   * Extends the global ComponentThemes interface to include Card-specific
   * theme configuration, ensuring type safety when accessing card themes.
   */
  interface ComponentThemes {
    card: CardTheme;
  }
}
