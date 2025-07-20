/**
 * @fileoverview
 * Component library exports.
 * 
 * This module exports all available UI components, their prop types, and
 * type contracts for excellent developer experience. Each component automatically 
 * registers its theme with the global theme system when imported, enabling 
 * immediate use without additional configuration.
 * 
 * @example
 * ```tsx
 * // Import components and contracts
 * import { 
 *   Button, 
 *   Input, 
 *   Card,
 *   ButtonVariant,
 *   ComponentSize,
 *   Contracts 
 * } from '@/components';
 * 
 * // Type-safe component usage
 * <Button 
 *   variant={ButtonVariant.Primary} 
 *   size={ComponentSize.Large}
 * >
 *   Submit
 * </Button>
 * 
 * // Or use the consolidated contracts
 * <Card 
 *   variant={Contracts.CardVariant.Elevated}
 *   padding={Contracts.CardPadding.Large}
 * >
 *   Card content
 * </Card>
 * ```
 * 
 * @since 1.0.0
 */

// =============================================================================
// COMPONENTS
// =============================================================================

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Text } from './Text';
export type { TextProps } from './Text';

export { Box } from './Box';
export type { BoxProps } from './Box';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Navbar } from './Navbar';

// =============================================================================
// TYPE CONTRACTS & CONSTANTS
// =============================================================================

/**
 * Re-export all type contracts for easy access.
 * These provide type-safe constants for component props.
 */
export {
  // Core variant and size types
  ComponentVariant,
  ComponentSize,
  
  // Button-specific types
  ButtonVariant,
  
  // Card-specific types
  CardVariant,
  CardPadding,
  
  // Text-specific types
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextElement,
  
  // Layout-specific types
  FlexDirection,
  FlexJustify,
  FlexAlign,
  
  // Spacing system
  Spacing,
  
  // Consolidated contracts object
  Contracts,
  
  // Component options for IntelliSense
  ComponentOptions,
  
  // Type unions for flexibility
  type CommonVariant,
  type CommonSize,
  type SpacingValue
} from '../contracts';
