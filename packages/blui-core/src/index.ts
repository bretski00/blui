/**
 * @file
 * Main entry point for the BLUI Component Library.
 * 
 * This library provides a component system with an extensible theme architecture
 * where each component owns and registers its own theme. The theme system supports:
 * 
 * - Component-owned themes with automatic registration
 * - Type-safe theme access and modification
 * - Runtime theme updates with immediate UI reflection
 * - CSS-in-JS styling with theme integration
 * - Full TypeScript support with IntelliSense
 * - Developer-friendly type contracts and constants
 * 
 * @example
 * ```tsx
 * // Basic usage with theme provider
 * import { ThemeProvider, Button, Badge, useTheme } from 'blui';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <Button variant="primary">Click me</Button>
 *       <Badge variant="success">Active</Badge>
 *     </ThemeProvider>
 *   );
 * }
 * 
 * // Type-safe component usage with contracts
 * import { 
 *   Button, 
 *   ButtonVariant, 
 *   ComponentSize,
 *   Contracts 
 * } from 'blui';
 * 
 * function TypeSafeExample() {
 *   return (
 *     <Button 
 *       variant={ButtonVariant.Primary} 
 *       size={ComponentSize.Large}
 *     >
 *       Type-safe Button
 *     </Button>
 *   );
 * }
 * ```
 * 
 * @version 1.0.1
 * @since 1.0.0
 */

// ===== COMPONENT EXPORTS =====

// Core UI Components (import themes to ensure module augmentation)
export { Badge, type BadgeProps } from './components/Badge';
import './components/Badge/theme';
export { Box, type BoxProps } from './components/Box';
export { Button, type ButtonProps } from './components/Button';
import './components/Button/theme';
export { Card, type CardProps } from './components/Card';
import './components/Card/theme';
export { Input, type InputProps } from './components/Input';
import './components/Input/theme';
export { Navbar, type NavbarProps } from './components/Navbar';
import './components/Navbar/theme';
export { Text, type TextProps } from './components/Text';

// Layout Components
export { 
  Grid, 
  Flex, 
  FlexItem,
  GridItem,
  LayoutProvider,
  type GridProps,
  type FlexProps,
  type GridItemProps,
  type LayoutProviderProps
} from './layouts';

// Theme System
export { 
  ThemeProvider, 
  useTheme,
  useColors,
  useTypography,
  type ThemeProviderProps,
  type Theme,
  type ThemeOverride,
  type ComponentThemes
} from './theme';

// ===== TYPE CONTRACT EXPORTS =====

/**
 * Type contracts for consistent component usage across the application.
 * These provide IntelliSense support and prevent magic string usage.
 */
export * from './contracts';
export * from './types';

// ===== THEME UTILITIES =====

export {
  registerComponentTheme,
  getComponentTheme
} from './theme/registry';

export {
  createTheme
} from './theme/utils';
