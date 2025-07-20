/**
 * @file Component library exports
 * 
 * Exports all available UI components and their type contracts.
 */

// Components

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

// Type contracts and constants
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
