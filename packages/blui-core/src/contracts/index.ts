/**
 * @fileoverview
 * Type contracts and constants for the UI framework.
 * 
 * This module provides TypeScript contracts that define the available options
 * for all components, ensuring type safety and excellent developer experience.
 * 
 * @since 1.0.0
 */

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

/**
 * [Since 1.0.0] Available variant styles for components.
 * Defines the semantic color variants used across the component library.
 * 
 * @example
 * ```tsx
 * <Button variant={ComponentVariant.Primary}>Primary Button</Button>
 * <Badge variant={ComponentVariant.Success}>Success Badge</Badge>
 * ```
 * 
 * @since 1.0.0
 */
export const ComponentVariant = {
  /** Primary brand color - use for main actions */
  Primary: 'primary',
  /** Secondary brand color - use for secondary actions */
  Secondary: 'secondary',
  /** Success state color - use for positive feedback */
  Success: 'success',
  /** Warning state color - use for cautionary feedback */
  Warning: 'warning',
  /** Error state color - use for negative feedback */
  Error: 'error',
  /** Info state color - use for informational feedback */
  Info: 'info'
} as const;

/**
 * [Since 1.0.0] Union type of all available component variant values.
 * 
 * @since 1.0.0
 */
export type ComponentVariant = typeof ComponentVariant[keyof typeof ComponentVariant];

// =============================================================================
// COMPONENT SIZES
// =============================================================================

/**
 * [Since 1.0.0] Available size options for components.
 * Provides consistent sizing across all components in the library.
 * 
 * @example
 * ```tsx
 * <Button size={ComponentSize.Large}>Large Button</Button>
 * <Input size={ComponentSize.Medium}>Medium Input</Input>
 * ```
 * 
 * @since 1.0.0
 */
export const ComponentSize = {
  /** Small size - compact for dense layouts */
  Small: 'sm',
  /** Medium size - default size for most use cases */
  Medium: 'md',
  /** Large size - prominent for important actions */
  Large: 'lg'
} as const;

/**
 * [Since 1.0.0] Union type of all available component size values.
 * 
 * @since 1.0.0
 */
export type ComponentSize = typeof ComponentSize[keyof typeof ComponentSize];

// =============================================================================
// BUTTON SPECIFIC
// =============================================================================

/**
 * [Since 1.0.0] Available button variants.
 * Defines the visual appearance styles specific to buttons.
 * 
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Primary}>Primary</Button>
 * <Button variant={ButtonVariant.Outline}>Outline</Button>
 * <Button variant={ButtonVariant.Ghost}>Ghost</Button>
 * ```
 * 
 * @since 1.0.0
 */
export const ButtonVariant = {
  /** Solid primary button with background fill */
  Primary: 'primary',
  /** Solid secondary button with background fill */
  Secondary: 'secondary',
  /** Outlined button with transparent background */
  Outline: 'outline',
  /** Ghost button with minimal styling */
  Ghost: 'ghost'
} as const;

/**
 * [Since 1.0.0] Union type of all available button variant values.
 * 
 * @since 1.0.0
 */
export type ButtonVariant = typeof ButtonVariant[keyof typeof ButtonVariant];

// =============================================================================
// CARD SPECIFIC
// =============================================================================

/**
 * [Since 1.0.0] Available card variants.
 * Defines the visual appearance styles specific to cards.
 * 
 * @example
 * ```tsx
 * <Card variant={CardVariant.Elevated}>Elevated Card</Card>
 * <Card variant={CardVariant.Outlined}>Outlined Card</Card>
 * <Card variant={CardVariant.Filled}>Filled Card</Card>
 * ```
 * 
 * @since 1.0.0
 */
export const CardVariant = {
  /** Card with shadow elevation */
  Elevated: 'elevated',
  /** Card with border outline */
  Outlined: 'outlined',
  /** Card with background fill */
  Filled: 'filled'
} as const;

/**
 * [Since 1.0.0] Union type of all available card variant values.
 * 
 * @since 1.0.0
 */
export type CardVariant = typeof CardVariant[keyof typeof CardVariant];

/**
 * [Since 1.0.0] Available card padding options.
 * Defines the internal spacing options for card content.
 * 
 * @example
 * ```tsx
 * <Card padding={CardPadding.Large}>Large Padding</Card>
 * <Card padding={CardPadding.None}>No Padding</Card>
 * ```
 * 
 * @since 1.0.0
 */
export const CardPadding = {
  /** No internal padding */
  None: 'none',
  /** Small internal padding */
  Small: 'sm',
  /** Medium internal padding - default */
  Medium: 'md',
  /** Large internal padding */
  Large: 'lg'
} as const;

/**
 * [Since 1.0.0] Union type of all available card padding values.
 * 
 * @since 1.0.0
 */
export type CardPadding = typeof CardPadding[keyof typeof CardPadding];

// =============================================================================
// TEXT SPECIFIC
// =============================================================================

/**
 * [Since 1.0.0] Available text sizes.
 * Defines the typography scale for text components.
 * 
 * @example
 * ```tsx
 * <Text size={TextSize.ExtraSmall}>Small text</Text>
 * <Text size={TextSize.ExtraLarge4}>Heading text</Text>
 * ```
 * 
 * @since 1.0.0
 */
export const TextSize = {
  /** Extra small text (12px) */
  ExtraSmall: 'xs',
  /** Small text (14px) */
  Small: 'sm',
  /** Base text size (16px) - default */
  Base: 'base',
  /** Large text (18px) */
  Large: 'lg',
  /** Extra large text (20px) */
  ExtraLarge: 'xl',
  /** 2x large text (24px) */
  ExtraLarge2: '2xl',
  /** 3x large text (30px) */
  ExtraLarge3: '3xl',
  /** 4x large text (36px) */
  ExtraLarge4: '4xl'
} as const;

/**
 * [Since 1.0.0] Union type of all available text size values.
 * 
 * @since 1.0.0
 */
export type TextSize = typeof TextSize[keyof typeof TextSize];

/**
 * [Since 1.0.0] Available text weights.
 * Defines the font weight options for text components.
 * 
 * @example
 * ```tsx
 * <Text weight={TextWeight.Bold}>Bold text</Text>
 * <Text weight={TextWeight.Light}>Light text</Text>
 * ```
 * 
 * @since 1.0.0
 */
export const TextWeight = {
  /** Light font weight (300) */
  Light: 'light',
  /** Normal font weight (400) - default */
  Normal: 'normal',
  /** Medium font weight (500) */
  Medium: 'medium',
  /** Semi-bold font weight (600) */
  SemiBold: 'semibold',
  /** Bold font weight (700) */
  Bold: 'bold'
} as const;

/**
 * [Since 1.0.0] Union type of all available text weight values.
 * 
 * @since 1.0.0
 */
export type TextWeight = typeof TextWeight[keyof typeof TextWeight];

/**
 * [Since 1.0.0] Available text colors.
 * Defines the semantic color options for text components.
 * 
 * @example
 * ```tsx
 * <Text color={TextColor.Primary}>Primary text</Text>
 * <Text color={TextColor.Success}>Success text</Text>
 * ```
 * 
 * @since 1.0.0
 */
export const TextColor = {
  /** Primary text color - highest emphasis */
  Primary: 'primary',
  /** Secondary text color - medium emphasis */
  Secondary: 'secondary',
  /** Disabled text color - lowest emphasis */
  Disabled: 'disabled',
  /** Success text color - positive states */
  Success: 'success',
  /** Warning text color - cautionary states */
  Warning: 'warning',
  /** Error text color - negative states */
  Error: 'error',
  /** Info text color - informational states */
  Info: 'info',
  /** Inherit color from parent */
  Inherit: 'inherit'
} as const;

/**
 * [Since 1.0.0] Union type of all available text color values.
 * 
 * @since 1.0.0
 */
export type TextColor = typeof TextColor[keyof typeof TextColor];

/**
 * [Since 1.0.0] Available text alignment options.
 * Defines the text alignment options for text components.
 * 
 * @example
 * ```tsx
 * <Text align={TextAlign.Center}>Centered text</Text>
 * <Text align={TextAlign.Right}>Right-aligned text</Text>
 * ```
 * 
 * @since 1.0.0
 */
export const TextAlign = {
  /** Left-aligned text - default */
  Left: 'left',
  /** Center-aligned text */
  Center: 'center',
  /** Right-aligned text */
  Right: 'right',
  /** Justified text */
  Justify: 'justify'
} as const;

/**
 * [Since 1.0.0] Union type of all available text alignment values.
 * 
 * @since 1.0.0
 */
export type TextAlign = typeof TextAlign[keyof typeof TextAlign];

/**
 * [Since 1.0.0] Available text element types.
 * Defines the HTML elements that can be rendered by text components.
 * 
 * @example
 * ```tsx
 * <Text as={TextElement.Heading1}>Main Title</Text>
 * <Text as={TextElement.Paragraph}>Body text</Text>
 * ```
 * 
 * @since 1.0.0
 */
export const TextElement = {
  /** Paragraph element */
  Paragraph: 'p',
  /** Span element */
  Span: 'span',
  /** Div element */
  Div: 'div',
  /** H1 heading element */
  Heading1: 'h1',
  /** H2 heading element */
  Heading2: 'h2',
  /** H3 heading element */
  Heading3: 'h3',
  /** H4 heading element */
  Heading4: 'h4',
  /** H5 heading element */
  Heading5: 'h5',
  /** H6 heading element */
  Heading6: 'h6'
} as const;

/**
 * [Since 1.0.0] Union type of all available text element values.
 * 
 * @since 1.0.0
 */
export type TextElement = typeof TextElement[keyof typeof TextElement];

// =============================================================================
// LAYOUT SPECIFIC
// =============================================================================

/**
 * [Since 1.0.0] Available flex direction options.
 * Defines the direction for flex layout components.
 * 
 * @example
 * ```tsx
 * <Flex direction={FlexDirection.Column}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 * 
 * @since 1.0.0
 */
export const FlexDirection = {
  /** Horizontal layout - left to right */
  Row: 'row',
  /** Horizontal layout - right to left */
  RowReverse: 'row-reverse',
  /** Vertical layout - top to bottom */
  Column: 'column',
  /** Vertical layout - bottom to top */
  ColumnReverse: 'column-reverse'
} as const;

/**
 * [Since 1.0.0] Union type of all available flex direction values.
 * 
 * @since 1.0.0
 */
export type FlexDirection = typeof FlexDirection[keyof typeof FlexDirection];

/**
 * [Since 1.0.0] Available flex justification options.
 * Defines how flex items are distributed along the main axis.
 * 
 * @example
 * ```tsx
 * <Flex justify={FlexJustify.SpaceBetween}>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Flex>
 * ```
 * 
 * @since 1.0.0
 */
export const FlexJustify = {
  /** Items packed to start */
  Start: 'start',
  /** Items centered */
  Center: 'center',
  /** Items packed to end */
  End: 'end',
  /** Items distributed with space between */
  SpaceBetween: 'between',
  /** Items distributed with space around */
  SpaceAround: 'around',
  /** Items distributed with space evenly */
  SpaceEvenly: 'evenly'
} as const;

/**
 * [Since 1.0.0] Union type of all available flex justify values.
 * 
 * @since 1.0.0
 */
export type FlexJustify = typeof FlexJustify[keyof typeof FlexJustify];

/**
 * [Since 1.0.0] Available flex alignment options.
 * Defines how flex items are aligned along the cross axis.
 * 
 * @example
 * ```tsx
 * <Flex align={FlexAlign.Center}>
 *   <div>Centered item</div>
 * </Flex>
 * ```
 * 
 * @since 1.0.0
 */
export const FlexAlign = {
  /** Items aligned to start */
  Start: 'start',
  /** Items centered */
  Center: 'center',
  /** Items aligned to end */
  End: 'end',
  /** Items stretched to fill */
  Stretch: 'stretch',
  /** Items aligned to baseline */
  Baseline: 'baseline'
} as const;

/**
 * [Since 1.0.0] Union type of all available flex align values.
 * 
 * @since 1.0.0
 */
export type FlexAlign = typeof FlexAlign[keyof typeof FlexAlign];

// =============================================================================
// SPACING SYSTEM
// =============================================================================

/**
 * [Since 1.0.0] Available spacing scale options.
 * Defines the consistent spacing values used throughout the component library.
 * 
 * @example
 * ```tsx
 * <Box p={Spacing.Large} m={Spacing.Medium}>Content</Box>
 * ```
 * 
 * @since 1.0.0
 */
export const Spacing = {
  /** Extra small spacing (4px) */
  ExtraSmall: 'xs',
  /** Small spacing (8px) */
  Small: 'sm',
  /** Medium spacing (16px) - base unit */
  Medium: 'md',
  /** Large spacing (24px) */
  Large: 'lg',
  /** Extra large spacing (32px) */
  ExtraLarge: 'xl',
  /** 2x large spacing (48px) */
  ExtraLarge2: '2xl',
  /** 3x large spacing (64px) */
  ExtraLarge3: '3xl',
  /** 4x large spacing (96px) */
  ExtraLarge4: '4xl'
} as const;

/**
 * [Since 1.0.0] Union type of all available spacing values.
 * 
 * @since 1.0.0
 */
export type Spacing = typeof Spacing[keyof typeof Spacing];

// =============================================================================
// EXPORT ALL TYPES FOR EASY REFERENCE
// =============================================================================

/**
 * [Since 1.0.0] Complete collection of all type contracts.
 * Provides a single import point for all framework type constants.
 * 
 * @example
 * ```tsx
 * import { Contracts } from './contracts';
 * 
 * <Button variant={Contracts.ButtonVariant.Primary} 
 *         size={Contracts.ComponentSize.Large}>
 *   Button
 * </Button>
 * ```
 * 
 * @since 1.0.0
 */
export const Contracts = {
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
} as const;

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

// =============================================================================
// COMMONLY USED TYPE UNIONS
// =============================================================================

/**
 * [Since 1.0.0] Common variant type that covers most component variants.
 * Used by components that support the standard semantic color variants.
 * 
 * @since 1.0.0
 */
export type CommonVariant = ComponentVariant;

/**
 * [Since 1.0.0] Common size type that covers most component sizes.
 * Used by components that support the standard size scale.
 * 
 * @since 1.0.0
 */
export type CommonSize = ComponentSize;

/**
 * [Since 1.0.0] Spacing value type for consistent spacing across components.
 * Used by layout components and spacing props.
 * 
 * @since 1.0.0
 */
export type SpacingValue = Spacing | string | number;
