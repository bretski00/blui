import { Link, useLocation } from 'react-router-dom';
import { Box, Text, Button } from '../index';

interface NavItem {
  path: string;
  label: string;
  description?: string;
}

const navItems: NavItem[] = [
  { 
    path: '/', 
    label: 'Home', 
    description: 'BLUI overview & quick start' 
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
  { 
    path: '/consuming-app', 
    label: 'Example App', 
    description: 'Real-world usage example' 
  },
];

export function Navbar() {
  const location = useLocation();

  return (
    <Box
      as="nav"
      style={{
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      }}
    >
      <Box
        maxW="1200px"
        mx="auto"
        px="lg"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo/Brand */}
        <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Text as="h1" size="xl" weight="bold">
            🎨 UI Framework
          </Text>
          <Text size="sm" color="secondary">
            v1.0.0
          </Text>
        </Box>

        {/* Navigation Links */}
        <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
        </Box>

        {/* Additional Actions */}
        <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            GitHub
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
