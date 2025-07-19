import { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  Text, 
  Box,
  Badge,
  useTheme,
  type ThemeOverride 
} from '../index';

// Demo component that uses the theme system
export function FrameworkDemoPage() {
  const { theme, updateTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState(theme.colors.primary);

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    const themeOverride: ThemeOverride = {
      colors: {
        primary: color,
      },
      components: {
        button: {
          colors: {
            primary: {
              background: color,
              backgroundHover: color + 'dd',
              backgroundActive: color + 'bb',
              border: color,
            }
          }
        },
        badge: {
          colors: {
            primary: {
              background: color + '20',
              text: color,
              border: color + '40',
            }
          }
        }
      }
    };
    updateTheme(themeOverride);
  };

  return (
    <Box p="xl" maxW="1000px" mx="auto">
      <Text as="h1" size="4xl" weight="bold" align="center" style={{ marginBottom: '2rem' }}>
        🎨 Extensible Theme System
      </Text>
      
      <Text size="lg" color="secondary" align="center" style={{ marginBottom: '3rem' }}>
        Each component owns its theme and automatically extends the global theme system
      </Text>

      {/* Theme Controls */}
      <Card padding="lg" style={{ marginBottom: '2rem' }}>
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
          🎛️ Component-Owned Themes
        </Text>
        <Text color="secondary" style={{ marginBottom: '1rem' }}>
          When you add a new component, it automatically registers its theme. No central configuration needed!
        </Text>
        
        <Box display="flex" style={{ gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map((color) => (
            <Button
              key={color}
              variant={primaryColor === color ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleColorChange(color)}
              style={{ backgroundColor: color, borderColor: color, color: 'white' }}
            >
              {color}
            </Button>
          ))}
        </Box>
      </Card>

      {/* Component Showcase */}
      <Card padding="lg" style={{ marginBottom: '2rem' }}>
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
          📦 Auto-Registered Components
        </Text>
        
        {/* Buttons */}
        <Box style={{ marginBottom: '2rem' }}>
          <Text size="lg" weight="medium" style={{ marginBottom: '0.5rem' }}>
            Buttons
          </Text>
          <Box display="flex" style={{ gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="md">Secondary</Button>
            <Button variant="outline" size="lg">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Box>
        </Box>

        {/* NEW: Badge Component - automatically themed! */}
        <Box style={{ marginBottom: '2rem' }}>
          <Text size="lg" weight="medium" style={{ marginBottom: '0.5rem' }}>
            Badges <Badge variant="success" size="sm">New!</Badge>
          </Text>
          <Box display="flex" style={{ gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </Box>
          <Box display="flex" style={{ gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="primary" outline>Primary Outline</Badge>
            <Badge variant="success" outline>Success Outline</Badge>
            <Badge variant="error" outline>Error Outline</Badge>
          </Box>
          <Box display="flex" style={{ gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="md">Medium</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </Box>
        </Box>

        {/* Cards */}
        <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Card variant="elevated" padding="md">
            <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Elevated Card</Text>
            <Text size="sm" color="secondary">Auto-themed shadow</Text>
            <Box style={{ marginTop: '0.5rem' }}>
              <Badge variant="primary" size="sm">Theme-aware</Badge>
            </Box>
          </Card>
          <Card variant="outlined" padding="md">
            <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Outlined Card</Text>
            <Text size="sm" color="secondary">Theme-aware border</Text>
            <Box style={{ marginTop: '0.5rem' }}>
              <Badge variant="success" size="sm">Consistent</Badge>
            </Box>
          </Card>
          <Card variant="filled" padding="md">
            <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Filled Card</Text>
            <Text size="sm" color="secondary">Clean design</Text>
            <Box style={{ marginTop: '0.5rem' }}>
              <Badge variant="warning" size="sm">Flexible</Badge>
            </Box>
          </Card>
        </Box>
      </Card>

      {/* Theme Architecture */}
      <Card padding="lg" style={{ marginBottom: '2rem' }}>
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
          🏗️ How It Works
        </Text>
        
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Box>
            <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>
              1. Component Defines Theme
            </Text>
            <Text size="sm" color="secondary" style={{ marginBottom: '0.5rem' }}>
              Each component has its own theme definition
            </Text>
            <Box p="md" bg="#f3f4f6" borderRadius="md">
              <Text size="xs" fontFamily="mono">
                {`// Badge/theme.ts
interface BadgeTheme {
  colors: { primary: {...} }
  sizes: { sm: {...} }
}

declare module 'core' {
  interface ComponentThemes {
    badge: BadgeTheme;
  }
}`}
              </Text>
            </Box>
          </Box>

          <Box>
            <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>
              2. Auto-Registration
            </Text>
            <Text size="sm" color="secondary" style={{ marginBottom: '0.5rem' }}>
              Component registers theme on import
            </Text>
            <Box p="md" bg="#f3f4f6" borderRadius="md">
              <Text size="xs" fontFamily="mono">
                {`// Badge.tsx
import { defaultBadgeTheme } from './theme';

registerComponentTheme(
  'badge', 
  defaultBadgeTheme
);`}
              </Text>
            </Box>
          </Box>

          <Box>
            <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>
              3. Type-Safe Access
            </Text>
            <Text size="sm" color="secondary" style={{ marginBottom: '0.5rem' }}>
              Full TypeScript support and intellisense
            </Text>
            <Box p="md" bg="#f3f4f6" borderRadius="md">
              <Text size="xs" fontFamily="mono">
                {`const badgeTheme = 
  getComponentTheme<BadgeTheme>(
    theme, 
    'badge'
  );

// Full autocomplete!
badgeTheme.colors.primary.background`}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Form Demo */}
      <Card padding="lg">
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
          📝 All Components Working Together
        </Text>
        
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            label="Project Name" 
            placeholder="Enter project name"
          />
          <Input 
            label="Description" 
            placeholder="Brief description"
          />
          
          <Box display="flex" style={{ gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
            <Badge variant="primary">Status:</Badge>
            <Badge variant="success">Active</Badge>
          </Box>
          
          <Box display="flex" style={{ gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save Project</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
