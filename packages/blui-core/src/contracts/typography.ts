/**
 * @file Typography definitions
 */

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
