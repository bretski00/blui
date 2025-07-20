/**
 * Theme configuration interface for Input component.
 * 
 * Defines the styling properties available for customizing Input appearance,
 * including colors for different states, sizes, and visual properties.
 * 
 * @example
 * ```tsx
 * const customInputTheme: InputTheme = {
 *   colors: {
 *     background: '#f8fafc',
 *     border: '#e2e8f0',
 *     borderFocus: '#3b82f6',
 *     borderError: '#ef4444',
 *     text: '#1a202c',
 *     placeholder: '#a0aec0'
 *   },
 *   sizes: {
 *     sm: { padding: '0.5rem', fontSize: '0.875rem', height: '2rem' },
 *     md: { padding: '0.75rem', fontSize: '1rem', height: '2.5rem' },
 *     lg: { padding: '1rem', fontSize: '1.125rem', height: '3rem' }
 *   },
 *   borderRadius: '0.5rem',
 *   transition: 'all 0.2s ease-in-out'
 * };
 * ```
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

// Default input theme
export const defaultInputTheme: InputTheme = {
  colors: {
    background: '#ffffff',
    border: '#d1d5db',
    borderFocus: '#3b82f6',
    borderError: '#ef4444',
    text: '#111827',
    placeholder: '#9ca3af',
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
  transition: 'all 0.2s ease-in-out',
};

// Extend the ComponentThemes interface
declare module '../../theme/core' {
  /**
   * Component themes interface augmentation for Input.
   * 
   * Extends the global ComponentThemes interface to include Input-specific
   * theme configuration, ensuring type safety when accessing input themes.
   */
  interface ComponentThemes {
    input: InputTheme;
  }
}
