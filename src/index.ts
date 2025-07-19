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
 * 
 * @example
 * ```tsx
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

// Export theme system
export * from './theme';

// Export components
export * from './components';

// Export layout system
export * from './layouts';

// Re-export commonly used types for convenience
export type { ReactNode } from 'react';
