/**
 * @file Common type unions and utility types
 */

import type { ComponentVariant } from './variants';
import type { ComponentSize, Spacing } from './sizing';

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
