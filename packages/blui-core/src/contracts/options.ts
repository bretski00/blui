/**
 * @file Component options for IntelliSense support
 */

// =============================================================================
// COMPONENT OPTIONS
// =============================================================================

/**
 * [Since 1.0.0] Quick reference object for all available component options.
 * Provides IntelliSense-friendly access to all component variants, sizes, and options.
 * 
 * @example
 * ```tsx
 * import { ComponentOptions } from './contracts';
 * 
 * // Discover available options with full IntelliSense
 * const buttonVariants = ComponentOptions.Button.variants;
 * const cardSizes = ComponentOptions.Card.padding;
 * ```
 * 
 * @since 1.0.0
 */
export const ComponentOptions = {
  Button: {
    variants: ['primary', 'secondary', 'outline', 'ghost'] as const,
    sizes: ['sm', 'md', 'lg'] as const
  },
  Card: {
    variants: ['elevated', 'outlined', 'filled'] as const,
    padding: ['none', 'sm', 'md', 'lg'] as const
  },
  Badge: {
    variants: ['primary', 'secondary', 'success', 'warning', 'error'] as const,
    sizes: ['sm', 'md', 'lg'] as const
  },
  Text: {
    sizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] as const,
    weights: ['light', 'normal', 'medium', 'semibold', 'bold'] as const,
    colors: ['primary', 'secondary', 'disabled', 'success', 'warning', 'error', 'info', 'inherit'] as const,
    alignments: ['left', 'center', 'right', 'justify'] as const,
    elements: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
  },
  Input: {
    sizes: ['sm', 'md', 'lg'] as const
  },
  Common: {
    sizes: ['sm', 'md', 'lg'] as const,
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const
  }
} as const;
