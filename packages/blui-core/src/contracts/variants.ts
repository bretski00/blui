/**
 * @file Component variant definitions
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
