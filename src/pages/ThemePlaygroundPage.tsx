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

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: string;
}

function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  return (
    <Box style={{ marginBottom: '1rem' }}>
      <Text size="sm" weight="medium" style={{ marginBottom: '0.25rem' }}>
        {label}
      </Text>
      {description && (
        <Text size="xs" color="secondary" style={{ marginBottom: '0.5rem' }}>
          {description}
        </Text>
      )}
      <Box style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '40px',
            height: '32px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          style={{ flex: 1, fontFamily: 'monospace' }}
        />
      </Box>
    </Box>
  );
}

interface PresetTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
  };
}

const presetThemes: PresetTheme[] = [
  {
    name: 'Default Blue',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      background: '#f8fafc',
      surface: '#ffffff',
    },
  },
  {
    name: 'Purple Dreams',
    colors: {
      primary: '#8b5cf6',
      secondary: '#64748b',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626',
      background: '#faf5ff',
      surface: '#ffffff',
    },
  },
  {
    name: 'Ocean Breeze',
    colors: {
      primary: '#0891b2',
      secondary: '#475569',
      success: '#0d9488',
      warning: '#ea580c',
      error: '#e11d48',
      background: '#f0f9ff',
      surface: '#ffffff',
    },
  },
  {
    name: 'Forest Green',
    colors: {
      primary: '#059669',
      secondary: '#6b7280',
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626',
      background: '#f0fdf4',
      surface: '#ffffff',
    },
  },
  {
    name: 'Dark Mode',
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      background: '#0f172a',
      surface: '#1e293b',
    },
  },
];

export function ThemePlaygroundPage() {
  const { theme, updateTheme } = useTheme();
  const [currentColors, setCurrentColors] = useState({
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
    background: theme.colors.background,
    surface: theme.colors.surface,
  });

  const [borderRadius, setBorderRadius] = useState('8');
  const [showCode, setShowCode] = useState(false);

  const applyTheme = (colors: typeof currentColors) => {
    const themeOverride: ThemeOverride = {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        background: colors.background,
        surface: colors.surface,
      },
      components: {
        button: {
          borderRadius: `${borderRadius}px`,
          colors: {
            primary: {
              background: colors.primary,
              backgroundHover: colors.primary + 'dd',
              backgroundActive: colors.primary + 'bb',
              text: '#ffffff',
              border: colors.primary,
            },
            secondary: {
              background: colors.secondary,
              backgroundHover: colors.secondary + 'dd',
              backgroundActive: colors.secondary + 'bb',
              text: '#ffffff',
              border: colors.secondary,
            },
          },
        },
        card: {
          borderRadius: `${borderRadius}px`,
        },
        badge: {
          borderRadius: `${Math.max(4, parseInt(borderRadius) / 2)}px`,
          colors: {
            primary: {
              background: colors.primary + '20',
              text: colors.primary,
              border: colors.primary + '40',
            },
            success: {
              background: colors.success + '20',
              text: colors.success,
              border: colors.success + '40',
            },
            warning: {
              background: colors.warning + '20',
              text: colors.warning,
              border: colors.warning + '40',
            },
            error: {
              background: colors.error + '20',
              text: colors.error,
              border: colors.error + '40',
            },
          },
        },
        input: {
          borderRadius: `${borderRadius}px`,
          colors: {
            border: colors.secondary + '40',
            borderFocus: colors.primary,
            background: colors.surface,
          },
        },
      },
    };
    updateTheme(themeOverride);
  };

  const handleColorChange = (colorKey: keyof typeof currentColors, value: string) => {
    const newColors = { ...currentColors, [colorKey]: value };
    setCurrentColors(newColors);
    applyTheme(newColors);
  };

  const handleBorderRadiusChange = (value: string) => {
    setBorderRadius(value);
    applyTheme(currentColors);
  };

  const applyPreset = (preset: PresetTheme) => {
    setCurrentColors(preset.colors);
    applyTheme(preset.colors);
    
    // Update background
    document.body.style.backgroundColor = preset.colors.background;
  };

  const generateThemeCode = () => {
    return `const customTheme: ThemeOverride = {
  colors: {
    primary: '${currentColors.primary}',
    secondary: '${currentColors.secondary}',
    success: '${currentColors.success}',
    warning: '${currentColors.warning}',
    error: '${currentColors.error}',
    background: '${currentColors.background}',
    surface: '${currentColors.surface}',
  },
  components: {
    button: {
      borderRadius: '${borderRadius}px',
      colors: {
        primary: {
          background: '${currentColors.primary}',
          backgroundHover: '${currentColors.primary}dd',
          backgroundActive: '${currentColors.primary}bb',
          text: '#ffffff',
          border: '${currentColors.primary}',
        },
      },
    },
    card: {
      borderRadius: '${borderRadius}px',
    },
    // ... other component overrides
  },
};`;
  };

  return (
    <Box p="xl" maxW="1400px" mx="auto">
      <Text as="h1" size="4xl" weight="bold" align="center" style={{ marginBottom: '1rem' }}>
        🎨 Theme Playground
      </Text>
      
      <Text size="lg" color="secondary" align="center" style={{ marginBottom: '3rem' }}>
        Customize your theme in real-time and see changes across all components
      </Text>

      <Box style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Controls Panel */}
        <Box style={{ position: 'sticky', top: '80px', height: 'fit-content' }}>
          <Card padding="lg">
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1.5rem' }}>
              🎛️ Controls
            </Text>

            {/* Preset Themes */}
            <Box style={{ marginBottom: '2rem' }}>
              <Text size="base" weight="medium" style={{ marginBottom: '1rem' }}>
                Preset Themes
              </Text>
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {presetThemes.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    style={{ justifyContent: 'flex-start' }}
                  >
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: preset.colors.primary,
                          border: '1px solid #e5e7eb',
                        }}
                      />
                      {preset.name}
                    </Box>
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Color Controls */}
            <Box style={{ marginBottom: '2rem' }}>
              <Text size="base" weight="medium" style={{ marginBottom: '1rem' }}>
                Colors
              </Text>
              
              <ColorPicker
                label="Primary"
                value={currentColors.primary}
                onChange={(value) => handleColorChange('primary', value)}
                description="Main brand color for buttons, links, etc."
              />
              
              <ColorPicker
                label="Secondary"
                value={currentColors.secondary}
                onChange={(value) => handleColorChange('secondary', value)}
                description="Secondary actions and muted text"
              />
              
              <ColorPicker
                label="Success"
                value={currentColors.success}
                onChange={(value) => handleColorChange('success', value)}
                description="Success states and positive actions"
              />
              
              <ColorPicker
                label="Warning"
                value={currentColors.warning}
                onChange={(value) => handleColorChange('warning', value)}
                description="Warning states and caution"
              />
              
              <ColorPicker
                label="Error"
                value={currentColors.error}
                onChange={(value) => handleColorChange('error', value)}
                description="Error states and destructive actions"
              />
              
              <ColorPicker
                label="Background"
                value={currentColors.background}
                onChange={(value) => handleColorChange('background', value)}
                description="Page background color"
              />
              
              <ColorPicker
                label="Surface"
                value={currentColors.surface}
                onChange={(value) => handleColorChange('surface', value)}
                description="Card and surface backgrounds"
              />
            </Box>

            {/* Border Radius */}
            <Box style={{ marginBottom: '2rem' }}>
              <Text size="base" weight="medium" style={{ marginBottom: '1rem' }}>
                Border Radius
              </Text>
              <Input
                label="Radius (px)"
                type="number"
                value={borderRadius}
                onChange={(e) => handleBorderRadiusChange(e.target.value)}
                min="0"
                max="50"
              />
            </Box>

            {/* Export Code */}
            <Box>
              <Button
                variant={showCode ? 'primary' : 'outline'}
                onClick={() => setShowCode(!showCode)}
                style={{ width: '100%' }}
              >
                {showCode ? 'Hide' : 'Show'} Theme Code
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Preview Panel */}
        <Box>
          {/* Code Export */}
          {showCode && (
            <Card padding="lg" style={{ marginBottom: '2rem' }}>
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Text size="lg" weight="semibold">Theme Code</Text>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(generateThemeCode())}
                >
                  Copy Code
                </Button>
              </Box>
              <Box p="md" bg="#1f2937" borderRadius="md" style={{ overflow: 'auto' }}>
                <pre style={{ 
                  color: '#f9fafb', 
                  fontSize: '12px', 
                  lineHeight: '1.5',
                  margin: 0,
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                }}>
                  {generateThemeCode()}
                </pre>
              </Box>
            </Card>
          )}

          {/* Component Showcase */}
          <Card padding="lg" style={{ marginBottom: '2rem' }}>
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1.5rem' }}>
              🧩 Component Preview
            </Text>

            {/* Buttons */}
            <Box style={{ marginBottom: '2rem' }}>
              <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
                Buttons
              </Text>
              <Box style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </Box>
              <Box style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </Box>
            </Box>

            {/* Badges */}
            <Box style={{ marginBottom: '2rem' }}>
              <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
                Badges
              </Text>
              <Box style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </Box>
            </Box>

            {/* Inputs */}
            <Box style={{ marginBottom: '2rem' }}>
              <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
                Inputs
              </Text>
              <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <Input label="First Name" placeholder="Enter first name" />
                <Input label="Email" type="email" placeholder="user@example.com" />
                <Input label="Password" type="password" placeholder="********" />
              </Box>
            </Box>

            {/* Cards */}
            <Box>
              <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
                Cards
              </Text>
              <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <Card variant="elevated" padding="md">
                  <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Elevated Card</Text>
                  <Text size="sm" color="secondary">With shadow effect</Text>
                  <Box style={{ marginTop: '1rem' }}>
                    <Badge variant="primary" size="sm">Featured</Badge>
                  </Box>
                </Card>
                <Card variant="outlined" padding="md">
                  <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Outlined Card</Text>
                  <Text size="sm" color="secondary">With border</Text>
                  <Box style={{ marginTop: '1rem' }}>
                    <Badge variant="success" size="sm">Available</Badge>
                  </Box>
                </Card>
                <Card variant="filled" padding="md">
                  <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Filled Card</Text>
                  <Text size="sm" color="secondary">Clean design</Text>
                  <Box style={{ marginTop: '1rem' }}>
                    <Badge variant="warning" size="sm">Limited</Badge>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Card>

          {/* Interactive Demo */}
          <Card padding="lg">
            <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1.5rem' }}>
              📝 Interactive Demo
            </Text>
            
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input 
                  label="Project Name" 
                  placeholder="Enter project name"
                />
                <Input 
                  label="Budget" 
                  placeholder="$0.00"
                />
              </Box>
              
              <Input 
                label="Description" 
                placeholder="Project description..."
              />
              
              <Box style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '1rem' }}>
                <Text size="sm" weight="medium">Status:</Text>
                <Badge variant="success">Active</Badge>
                <Badge variant="primary">Priority</Badge>
              </Box>
              
              <Box style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Save Project</Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
