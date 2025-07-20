/**
 * @file Consolidated exports for all type contracts
 */

// =============================================================================
// RE-EXPORT ALL TYPES AND CONSTANTS
// =============================================================================

// Re-export everything for backward compatibility
export * from './variants';
export * from './sizing';
export * from './typography';
export * from './layout';
export * from './common';
export * from './options';

// =============================================================================
// LEGACY CONTRACTS OBJECT
// =============================================================================

// Import specific exports for the legacy Contracts object
import {
  ComponentVariant,
  ButtonVariant,
  CardVariant
} from './variants';
import {
  ComponentSize,
  CardPadding,
  Spacing
} from './sizing';
import {
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextElement
} from './typography';
import {
  FlexDirection,
  FlexJustify,
  FlexAlign
} from './layout';

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
