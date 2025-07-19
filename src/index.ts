/**
 * @fileoverview
 * Main entry point for the Extensible UI Framework.
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
 * import { ThemeProvider, Button, Badge, useTheme } from 'your-ui-library';
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
 * } from 'your-ui-library';
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
 * 
 * // Runtime theme customization
 * function CustomThemeExample() {
 *   const { updateTheme } = useTheme();
 *   
 *   const changeTheme = () => {
 *     updateTheme({
 *       colors: { primary: '#ff0000' },
 *       components: {
 *         button: {
 *           borderRadius: '12px'
 *         }
 *       }
 *     });
 *   };
 *   
 *   return <Button onClick={changeTheme}>Update Theme</Button>;
 * }
 * ```
 */

// =============================================================================
// CORE EXPORTS
// =============================================================================

// Export theme system
export * from './theme';

// Export components (includes type contracts)
export * from './components';

// Export layout system
export * from './layouts';

// =============================================================================
// TYPE CONTRACTS (RE-EXPORTED FOR CONVENIENCE)
// =============================================================================

/**
 * Re-export type contracts at the top level for easy access.
 * This allows developers to import contracts directly from the main package.
 */
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
  Spacing,
  Contracts,
  ComponentOptions,
  type CommonVariant,
  type CommonSize,
  type SpacingValue
} from './contracts';

// Export TypeScript utilities and type helpers (selective to avoid conflicts)
export {
  type ValueOf,
  type Optional,
  type RequiredKeys,
  type ButtonVariantType,
  type ComponentVariantType,
  type ComponentSizeType,
  type CardVariantType,
  type CardPaddingType,
  type TextSizeType,
  type TextWeightType,
  type TextColorType,
  type TextAlignType,
  type TextElementType,
  type FlexDirectionType,
  type FlexJustifyType,
  type FlexAlignType,
  type SpacingType,
  type ResponsiveValue,
  type ResponsiveSize,
  type ResponsiveSpacing,
  type BaseComponentProps,
  type VariantProps,
  type SizeProps,
  type SpacingProps,
  type InteractiveProps,
  isButtonVariant,
  isComponentSize,
  isTextSize,
  isSpacing,
  ButtonConfigBuilder,
  TextConfigBuilder,
  createButtonConfig,
  createTextConfig,
  getContractOptions
} from './types';

// Export layout system
export * from './layouts';

// Re-export commonly used types for convenience
export type { ReactNode } from 'react';
