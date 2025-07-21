import { Link, useLocation } from 'react-router-dom';
import { Text, Button, Navbar } from 'blui';

/**
 * Configuration interface for navigation items in the documentation navbar.
 * 
 * Defines the structure for each navigation link including routing information
 * and optional descriptive text for enhanced user experience.
 * 
 * @since 1.0.0
 */
interface NavItem {
  /** The route path for the navigation item */
  path: string;
  /** The display label shown in the navigation button */
  label: string;
  /** Optional description text displayed below the label for additional context */
  description?: string;
}

/**
 * Navigation items configuration for the documentation application navbar.
 * 
 * Contains all available routes and their associated metadata including
 * display labels and descriptions for enhanced navigation UX.
 * 
 * @since 1.0.0
 */
const navItems: NavItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    description: 'BLUI Framework' 
  },
  { 
    path: '/playground', 
    label: 'Theme Playground', 
    description: 'Interactive customization' 
  },
  { 
    path: '/components', 
    label: 'Component Playground', 
    description: 'Test components & layouts' 
  },
  // { 
  //   path: '/layouts', 
  //   label: 'Layout System', 
  //   description: 'Grid & Flex layouts' 
  // },
  { 
    path: '/consuming-app', 
    label: 'Exxample App', 
    description: 'Real-world example' 
  },
];

/**
 * Documentation-specific navigation bar component.
 * 
 * This is an implementation example that uses the headless Navbar component
 * to create a specific navigation layout for the documentation application.
 * It demonstrates how to use the reusable Navbar component with custom content.
 * 
 * @returns JSX element representing the documentation navigation bar
 * 
 * @example
 * Import and use within a React Router application to provide
 * navigation for the documentation site with automatic active
 * route highlighting and descriptive navigation links.
 *
 * @since 1.0.0
 */
export function DocumentationNavbar() {
  const location = useLocation();

  const brand = (
    <>
      <Text as="h1" size="xl" weight="bold">
        BLUI Framework
      </Text>
      <Text size="sm" color="secondary">
        v1.0.3
      </Text>
    </>
  );

  const navigation = (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'auto',
                padding: '0.5rem 1rem',
                minWidth: '120px',
              }}
            >
              <Text size="sm" weight="medium">
                {item.label}
              </Text>
              {item.description && (
                <Text 
                  size="xs" 
                  color={isActive ? 'inherit' : 'secondary'}
                  style={{ opacity: 0.8 }}
                >
                  {item.description}
                </Text>
              )}
            </Button>
          </Link>
        );
      })}
    </>
  );

  const actions = (
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => window.open('https://github.com', '_blank')}
    >
      GitHub
    </Button>
  );

  return (
    <Navbar
      brand={brand}
      navigation={navigation}
      actions={actions}
    />
  );
}
