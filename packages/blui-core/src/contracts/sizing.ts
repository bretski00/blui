/**
 * @file Component sizing and spacing definitions
 */

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
// CARD SPECIFIC PADDING
// =============================================================================

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
