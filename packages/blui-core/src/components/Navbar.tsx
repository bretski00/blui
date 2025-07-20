import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Box } from './Box';
import { useTheme } from '../theme';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { defaultNavbarTheme, type NavbarTheme } from './Navbar/theme';

// Register the navbar theme when the module loads
registerComponentTheme('navbar', defaultNavbarTheme);

/**
 * Props for the Navbar component.
 * 
 * Extends standard HTML nav attributes with a headless design pattern
 * for maximum flexibility and theming capabilities.
 * 
 * @since 1.0.0
 */
export interface NavbarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Content to display in the brand/logo section (left side) */
  brand?: ReactNode;
  /** Content to display in the main navigation section (center) */
  navigation?: ReactNode;
  /** Content to display in the actions section (right side) */
  actions?: ReactNode;
  /** Optional children to completely override the default layout */
  children?: ReactNode;
  /** Whether to use sticky positioning */
  sticky?: boolean;
  /** Custom theme overrides for this instance */
  theme?: Partial<NavbarTheme>;
}

/**
 * Headless navigation bar component for flexible navigation layouts.
 * 
 * Provides a themeable container with optional sections for brand, navigation,
 * and actions. Can be used as a headless component by passing children directly,
 * or with the structured props for common navigation patterns.
 * 
 * The component follows the framework's theme system and can be customized
 * through the theme registry or instance-specific theme overrides.
 * 
 * @param props - The navbar component props
 * @returns JSX element representing a navigation container
 * 
 * @example
 * Use with brand, navigation, and actions props for structured layout.
 * Use with children prop for complete custom layout control.
 * Theme can be customized through theme prop or global theme registry.
 *
 * @since 1.0.0
 */
/**
 * Internal implementation function for the Navbar component.
 * 
 * @param props - The navbar component props
 * @param props.brand - Content to display in the brand/logo section (left side)
 * @param props.navigation - Content to display in the main navigation section (center)
 * @param props.actions - Content to display in the actions section (right side)
 * @param props.children - Optional children to completely override the default layout
 * @param props.sticky - Whether to use sticky positioning
 * @param props.theme - Custom theme overrides for this instance
 * @param props.style - Additional inline styles
 * @param ref - Forwarded ref to the nav element
 * @returns JSX element representing the navbar
 * 
 * @example
 * This is an internal function used by the exported Navbar component.
 * Use the exported Navbar component instead of calling this directly.
 */
function NavbarComponent(
  { brand, navigation, actions, children, sticky = true, theme: themeOverride, style, ...props }: NavbarProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const { theme } = useTheme();
  const navbarTheme = getComponentTheme<NavbarTheme>(theme, 'navbar');
  const appliedTheme = themeOverride ? { ...navbarTheme, ...themeOverride } : navbarTheme;

  const containerStyle = {
    backgroundColor: appliedTheme.container.backgroundColor,
    borderBottom: `${appliedTheme.container.borderWidth} solid ${appliedTheme.container.borderColor}`,
    boxShadow: appliedTheme.container.boxShadow,
    position: sticky ? appliedTheme.container.position : 'static' as const,
    top: sticky ? appliedTheme.container.top : 'auto',
    zIndex: sticky ? appliedTheme.container.zIndex : 'auto',
    height: appliedTheme.container.height,
    ...style,
  };

  const contentStyle = {
    maxWidth: appliedTheme.content.maxWidth,
    margin: '0 auto',
    padding: `${appliedTheme.content.padding?.y || '0'} ${appliedTheme.content.padding?.x || '0'}`,
    display: appliedTheme.content.display,
    alignItems: appliedTheme.content.alignItems,
    justifyContent: appliedTheme.content.justifyContent,
    height: '100%',
  };

  // If children are provided, use headless mode
  if (children) {
    return (
      <Box
        ref={ref}
        as="nav"
        style={containerStyle}
        {...props}
      >
        {children}
      </Box>
    );
  }

  // Otherwise, use structured layout
  return (
    <Box
      ref={ref}
      as="nav"
      style={containerStyle}
      {...props}
    >
      <Box style={contentStyle}>
        {brand && (
          <Box style={appliedTheme.brand}>
            {brand}
          </Box>
        )}
        
        {navigation && (
          <Box style={appliedTheme.navigation}>
            {navigation}
          </Box>
        )}
        
        {actions && (
          <Box style={appliedTheme.actions}>
            {actions}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/**
 * Navbar component with forwardRef support for flexible navigation layouts.
 * 
 * @example
 * Use with brand, navigation, and actions props for structured layout.
 * Use with children prop for complete custom layout control.
 * Theme can be customized through theme prop or global theme registry.
 * 
 * @since 1.0.0
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(NavbarComponent);
Navbar.displayName = 'Navbar';
