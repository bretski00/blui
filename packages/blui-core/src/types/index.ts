/**
 * Type definitions for BLUI Framework
 * 
 * This file provides additional TypeScript utilities and type helpers
 * to enhance the developer experience beyond the core contracts.
 */

import {
  ComponentVariant,
  ComponentSize,
  ButtonVariant,
  CardVariant,
  CardPadding,
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextElement,
  FlexDirection,
  FlexJustify,
  FlexAlign,
  Spacing
} from '../contracts';

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Extract the values from a constant object
 * @example
 * type ButtonVariantValues = ValueOf<typeof ButtonVariant>
 * // Result: 'primary' | 'secondary' | 'outline' | 'ghost'
 */
export type ValueOf<T> = T[keyof T];

/**
 * Make certain properties optional
 * @example
 * type OptionalSizeButton = Optional<ButtonProps, 'size'>
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make certain properties required
 * @example
 * type RequiredVariantButton = Required<ButtonProps, 'variant'>
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ============================================================================
// Component Prop Unions
// ============================================================================

/**
 * All possible button variants
 */
export type ButtonVariantType = ValueOf<typeof ButtonVariant>;

/**
 * All possible component variants
 */
export type ComponentVariantType = ValueOf<typeof ComponentVariant>;

/**
 * All possible component sizes
 */
export type ComponentSizeType = ValueOf<typeof ComponentSize>;

/**
 * All possible card variants
 */
export type CardVariantType = ValueOf<typeof CardVariant>;

/**
 * All possible card padding values
 */
export type CardPaddingType = ValueOf<typeof CardPadding>;

/**
 * All possible text sizes
 */
export type TextSizeType = ValueOf<typeof TextSize>;

/**
 * All possible text weights
 */
export type TextWeightType = ValueOf<typeof TextWeight>;

/**
 * All possible text colors
 */
export type TextColorType = ValueOf<typeof TextColor>;

/**
 * All possible text alignments
 */
export type TextAlignType = ValueOf<typeof TextAlign>;

/**
 * All possible text elements
 */
export type TextElementType = ValueOf<typeof TextElement>;

/**
 * All possible flex directions
 */
export type FlexDirectionType = ValueOf<typeof FlexDirection>;

/**
 * All possible flex justify values
 */
export type FlexJustifyType = ValueOf<typeof FlexJustify>;

/**
 * All possible flex align values
 */
export type FlexAlignType = ValueOf<typeof FlexAlign>;

/**
 * All possible spacing values
 */
export type SpacingType = ValueOf<typeof Spacing>;

// ============================================================================
// Responsive Types
// ============================================================================

/**
 * Responsive value that can be different at different breakpoints
 * @example
 * size: ResponsiveValue<ComponentSizeType>
 * // Can be: 'sm' | { base: 'sm', md: 'lg', xl: 'sm' }
 */
export type ResponsiveValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

/**
 * Responsive size prop
 */
export type ResponsiveSize = ResponsiveValue<ComponentSizeType>;

/**
 * Responsive spacing prop
 */
export type ResponsiveSpacing = ResponsiveValue<SpacingType>;

// ============================================================================
// Common Prop Patterns
// ============================================================================

/**
 * Base props that most components accept
 */
export interface BaseComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** HTML data attributes */
  'data-testid'?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA described by for accessibility */
  'aria-describedby'?: string;
}

/**
 * Props for components that support variants
 */
export interface VariantProps {
  /** Component variant */
  variant?: ComponentVariantType;
}

/**
 * Props for components that support sizing
 */
export interface SizeProps {
  /** Component size */
  size?: ComponentSizeType;
}

/**
 * Props for components that support spacing
 */
export interface SpacingProps {
  /** Margin */
  m?: ResponsiveSpacing;
  /** Margin top */
  mt?: ResponsiveSpacing;
  /** Margin right */
  mr?: ResponsiveSpacing;
  /** Margin bottom */
  mb?: ResponsiveSpacing;
  /** Margin left */
  ml?: ResponsiveSpacing;
  /** Margin horizontal (left and right) */
  mx?: ResponsiveSpacing;
  /** Margin vertical (top and bottom) */
  my?: ResponsiveSpacing;
  /** Padding */
  p?: ResponsiveSpacing;
  /** Padding top */
  pt?: ResponsiveSpacing;
  /** Padding right */
  pr?: ResponsiveSpacing;
  /** Padding bottom */
  pb?: ResponsiveSpacing;
  /** Padding left */
  pl?: ResponsiveSpacing;
  /** Padding horizontal (left and right) */
  px?: ResponsiveSpacing;
  /** Padding vertical (top and bottom) */
  py?: ResponsiveSpacing;
}

/**
 * Props for interactive components
 */
export interface InteractiveProps {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent) => void;
}

// ============================================================================
// Theme Types
// ============================================================================

/**
 * Color palette structure
 */
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Theme color definition
 */
export interface ThemeColors {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  info: ColorPalette;
  gray: ColorPalette;
}

/**
 * Component-specific theme overrides
 */
export interface ComponentThemes {
  button?: {
    colors?: Record<ButtonVariantType, Partial<{
      background: string;
      foreground: string;
      border: string;
      hover: {
        background: string;
        foreground: string;
        border: string;
      };
    }>>;
  };
  card?: {
    colors?: Record<CardVariantType, Partial<{
      background: string;
      border: string;
      shadow: string;
    }>>;
  };
  text?: {
    colors?: Record<TextColorType, string>;
  };
}

/**
 * Complete theme definition
 */
export interface Theme {
  colors: ThemeColors;
  components?: ComponentThemes;
  breakpoints?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  spacing?: Record<SpacingType, string>;
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Type guard to check if a value is a valid button variant
 * @param value
 * @example
 */
export function isButtonVariant(value: string): value is ButtonVariantType {
  return Object.values(ButtonVariant).includes(value as ButtonVariantType);
}

/**
 * Type guard to check if a value is a valid component size
 * @param value
 * @example
 */
export function isComponentSize(value: string): value is ComponentSizeType {
  return Object.values(ComponentSize).includes(value as ComponentSizeType);
}

/**
 * Type guard to check if a value is a valid text size
 * @param value
 * @example
 */
export function isTextSize(value: string): value is TextSizeType {
  return Object.values(TextSize).includes(value as TextSizeType);
}

/**
 * Type guard to check if a value is a valid spacing value
 * @param value
 * @example
 */
export function isSpacing(value: string): value is SpacingType {
  return Object.values(Spacing).includes(value as SpacingType);
}

// ============================================================================
// Configuration Builders
// ============================================================================

/**
 * Builder pattern for button configuration
 */
export class ButtonConfigBuilder {
  private config: {
    variant?: ButtonVariantType;
    size?: ComponentSizeType;
    disabled?: boolean;
    loading?: boolean;
  } = {};

  /**
   * Sets the visual variant of the button.
   * 
   * Configures the button's appearance style (primary, secondary, outline, ghost).
   * Each variant has distinct styling for different use cases and hierarchy.
   * 
   * @param variant - The button variant to apply
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.variant('primary').size('lg').build();
   * ```
   */
  variant(variant: ButtonVariantType): this {
    this.config.variant = variant;
    return this;
  }

  /**
   * Sets the size of the button.
   * 
   * Configures the button's dimensions including padding, font size, and height.
   * Available sizes provide consistent scaling across the design system.
   * 
   * @param size - The button size to apply (sm, md, lg)
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.size('lg').variant('primary').build();
   * ```
   */
  size(size: ComponentSizeType): this {
    this.config.size = size;
    return this;
  }

  /**
   * Sets the disabled state of the button.
   * 
   * Controls whether the button is interactive or disabled. Disabled buttons
   * are visually muted and cannot be clicked or receive focus.
   * 
   * @param disabled - Whether the button should be disabled (defaults to true)
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.disabled().build(); // Disabled button
   * builder.disabled(false).build(); // Enabled button
   * ```
   */
  disabled(disabled = true): this {
    this.config.disabled = disabled;
    return this;
  }

  /**
   * Sets the loading state of the button.
   * 
   * Controls whether the button shows a loading indicator. Loading buttons
   * typically display a spinner and are non-interactive.
   * 
   * @param loading - Whether the button should show loading state (defaults to true)
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.loading().build(); // Loading button
   * builder.loading(false).build(); // Normal button
   * ```
   */
  loading(loading = true): this {
    this.config.loading = loading;
    return this;
  }

  /**
   * Builds and returns the final button configuration.
   * 
   * Finalizes the button configuration and returns an immutable copy
   * of all the settings applied through the builder methods.
   * 
   * @returns The complete button configuration object
   * @example
   * ```tsx
   * const config = builder
   *   .variant('primary')
   *   .size('lg')
   *   .disabled(false)
   *   .build();
   * ```
   */
  build() {
    return { ...this.config };
  }
}

/**
 * Builder pattern for text configuration
 */
export class TextConfigBuilder {
  private config: {
    size?: TextSizeType;
    weight?: TextWeightType;
    color?: TextColorType;
    align?: TextAlignType;
    as?: TextElementType;
  } = {};

  /**
   * Sets the size of the text.
   * 
   * Configures the font size of the text element using predefined size scales
   * that maintain consistency across the design system.
   * 
   * @param size - The text size to apply
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.size('lg').weight('bold').build();
   * ```
   */
  size(size: TextSizeType): this {
    this.config.size = size;
    return this;
  }

  /**
   * Sets the font weight of the text.
   * 
   * Configures the boldness/thickness of the text using predefined weight values
   * that provide appropriate visual hierarchy and emphasis.
   * 
   * @param weight - The font weight to apply
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.weight('bold').size('lg').build();
   * ```
   */
  weight(weight: TextWeightType): this {
    this.config.weight = weight;
    return this;
  }

  /**
   * Sets the color of the text.
   * 
   * Configures the text color using predefined color tokens from the theme
   * that ensure accessibility and consistency across the design system.
   * 
   * @param color - The text color to apply
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.color('primary').weight('semibold').build();
   * ```
   */
  color(color: TextColorType): this {
    this.config.color = color;
    return this;
  }

  /**
   * Sets the text alignment.
   * 
   * Configures how the text is horizontally aligned within its container
   * using standard CSS text-align values.
   * 
   * @param align - The text alignment to apply
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.align('center').size('xl').build();
   * ```
   */
  align(align: TextAlignType): this {
    this.config.align = align;
    return this;
  }

  /**
   * Sets the HTML element type for the text.
   * 
   * Configures which HTML element will be used to render the text,
   * affecting semantics and default styling behavior.
   * 
   * @param element - The HTML element type to use
   * @returns The builder instance for method chaining
   * @example
   * ```tsx
   * builder.as('h1').size('2xl').weight('bold').build();
   * ```
   */
  as(element: TextElementType): this {
    this.config.as = element;
    return this;
  }

  /**
   * Builds and returns the final text configuration.
   * 
   * Finalizes the text configuration and returns an immutable copy
   * of all the settings applied through the builder methods.
   * 
   * @returns The complete text configuration object
   * @example
   * ```tsx
   * const config = builder
   *   .size('lg')
   *   .weight('semibold')
   *   .color('primary')
   *   .build();
   * ```
   */
  build() {
    return { ...this.config };
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a button configuration using the builder pattern.
 * 
 * Returns a new ButtonConfigBuilder instance for fluent configuration
 * of button properties using the builder pattern.
 * 
 * @returns A new ButtonConfigBuilder instance
 * @example
 * ```tsx
 * const config = createButtonConfig()
 *   .variant(ButtonVariant.Primary)
 *   .size(ComponentSize.Large)
 *   .build();
 * ```
 */
export function createButtonConfig(): ButtonConfigBuilder {
  return new ButtonConfigBuilder();
}

/**
 * Create a text configuration using the builder pattern
 * @returns A new TextConfigBuilder instance
 * @example
 * ```tsx
 * const config = createTextConfig()
 *   .size(TextSize.ExtraLarge)
 *   .weight(TextWeight.Bold)
 *   .color(TextColor.Primary)
 *   .build();
 * ```
 */
export function createTextConfig(): TextConfigBuilder {
  return new TextConfigBuilder();
}

/**
 * Get all available options for a specific contract type
 */
export const getContractOptions = {
  buttonVariants: () => Object.values(ButtonVariant),
  componentVariants: () => Object.values(ComponentVariant),
  componentSizes: () => Object.values(ComponentSize),
  cardVariants: () => Object.values(CardVariant),
  cardPadding: () => Object.values(CardPadding),
  textSizes: () => Object.values(TextSize),
  textWeights: () => Object.values(TextWeight),
  textColors: () => Object.values(TextColor),
  textAligns: () => Object.values(TextAlign),
  textElements: () => Object.values(TextElement),
  flexDirections: () => Object.values(FlexDirection),
  flexJustify: () => Object.values(FlexJustify),
  flexAlign: () => Object.values(FlexAlign),
  spacing: () => Object.values(Spacing),
} as const;

// ============================================================================
// Re-exports for convenience
// ============================================================================

export {
  ComponentVariant,
  ComponentSize,
  ButtonVariant,
  CardVariant,
  CardPadding,
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextElement,
  FlexDirection,
  FlexJustify,
  FlexAlign,
  Spacing
} from '../contracts';
