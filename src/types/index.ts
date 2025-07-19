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
 */
export function isButtonVariant(value: string): value is ButtonVariantType {
  return Object.values(ButtonVariant).includes(value as ButtonVariantType);
}

/**
 * Type guard to check if a value is a valid component size
 */
export function isComponentSize(value: string): value is ComponentSizeType {
  return Object.values(ComponentSize).includes(value as ComponentSizeType);
}

/**
 * Type guard to check if a value is a valid text size
 */
export function isTextSize(value: string): value is TextSizeType {
  return Object.values(TextSize).includes(value as TextSizeType);
}

/**
 * Type guard to check if a value is a valid spacing value
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

  variant(variant: ButtonVariantType): this {
    this.config.variant = variant;
    return this;
  }

  size(size: ComponentSizeType): this {
    this.config.size = size;
    return this;
  }

  disabled(disabled = true): this {
    this.config.disabled = disabled;
    return this;
  }

  loading(loading = true): this {
    this.config.loading = loading;
    return this;
  }

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

  size(size: TextSizeType): this {
    this.config.size = size;
    return this;
  }

  weight(weight: TextWeightType): this {
    this.config.weight = weight;
    return this;
  }

  color(color: TextColorType): this {
    this.config.color = color;
    return this;
  }

  align(align: TextAlignType): this {
    this.config.align = align;
    return this;
  }

  as(element: TextElementType): this {
    this.config.as = element;
    return this;
  }

  build() {
    return { ...this.config };
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a button configuration using the builder pattern
 * @example
 * const config = createButtonConfig()
 *   .variant(ButtonVariant.Primary)
 *   .size(ComponentSize.Large)
 *   .build();
 */
export function createButtonConfig(): ButtonConfigBuilder {
  return new ButtonConfigBuilder();
}

/**
 * Create a text configuration using the builder pattern
 * @example
 * const config = createTextConfig()
 *   .size(TextSize.ExtraLarge)
 *   .weight(TextWeight.Bold)
 *   .color(TextColor.Primary)
 *   .build();
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
