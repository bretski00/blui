/**
 * Comprehensive Demo of the Extensible UI Framework
 * 
 * This file demonstrates all the key features of the framework:
 * 1. Theme customization and overrides
 * 2. Component variants and sizing
 * 3. Runtime theme updates
 * 4. Type safety and developer experience
 * 5. CSS variables integration
 */

import { useState } from 'react';
import {
  ThemeProvider,
  Button,
  Input,
  Card,
  Text,
  Box,
  useTheme,
  useColors,
  useTypography,
  type ThemeOverride,
} from 'blui';

// ===== THEME DEFINITIONS =====

// Dark theme override
const darkTheme: ThemeOverride = {
  colors: {
    background: '#1f2937',
    surface: '#374151',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      disabled: '#9ca3af',
    },
    border: '#4b5563',
  },
  components: {
    card: {
      background: '#374151',
      border: '#4b5563',
    },
    input: {
      colors: {
        background: '#374151',
        border: '#4b5563',
        text: '#f9fafb',
        placeholder: '#9ca3af',
      },
    },
  },
};

// Custom brand theme
const brandTheme: ThemeOverride = {
  colors: {
    primary: '#7c3aed', // Purple
    secondary: '#db2777', // Pink
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
  },
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
    },
  },
  components: {
    button: {
      borderRadius: '12px',
      fontWeight: 600,
      colors: {
        primary: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
          backgroundHover: 'linear-gradient(135deg, #6d28d9 0%, #be185d 100%)',
          backgroundActive: 'linear-gradient(135deg, #5b21b6 0%, #9d174d 100%)',
          text: '#ffffff',
          border: 'transparent',
        },
      },
    },
    card: {
      borderRadius: '16px',
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
  },
};

// ===== DEMO COMPONENTS =====

function ThemeShowcase() {
  const colors = useColors();
  const typography = useTypography();

  return (
    <Card padding="lg" style={{ marginBottom: '2rem' }}>
      <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
        Current Theme Values
      </Text>
      
      <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <Text size="sm" weight="medium" style={{ marginBottom: '0.5rem' }}>Colors</Text>
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Box display="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: colors.primary,
                borderRadius: '4px'
              }} />
              <Text size="sm" fontFamily="mono">primary: {colors.primary}</Text>
            </Box>
            <Box display="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: colors.secondary,
                borderRadius: '4px'
              }} />
              <Text size="sm" fontFamily="mono">secondary: {colors.secondary}</Text>
            </Box>
            <Box display="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: colors.background,
                border: '1px solid #ccc',
                borderRadius: '4px'
              }} />
              <Text size="sm" fontFamily="mono">background: {colors.background}</Text>
            </Box>
          </Box>
        </div>
        
        <div>
          <Text size="sm" weight="medium" style={{ marginBottom: '0.5rem' }}>Typography</Text>
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Text size="sm" fontFamily="mono">
              primary: {typography.fontFamily.primary}
            </Text>
            <Text size="sm" fontFamily="mono">
              base size: {typography.fontSize.base}
            </Text>
            <Text size="sm" fontFamily="mono">
              normal weight: {typography.fontWeight.normal}
            </Text>
          </Box>
        </div>
      </Box>
    </Card>
  );
}

function InteractiveDemo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Form submitted successfully!');
  };

  return (
    <Card padding="lg" style={{ marginBottom: '2rem' }}>
      <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
        Interactive Form Demo
      </Text>
      
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          size="md"
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          error={!!(formData.email && !formData.email.includes('@'))}
          helperText={formData.email && !formData.email.includes('@') ? 'Please enter a valid email' : undefined}
          size="md"
        />
        
        <Box>
          <Text size="sm" weight="medium" style={{ marginBottom: '0.25rem' }}>
            Message
          </Text>
          <textarea
            placeholder="Enter your message..."
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
        </Box>
        
        <Box display="flex" style={{ gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button 
            variant="outline"
            onClick={() => setFormData({ name: '', email: '', message: '' })}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!formData.name || !formData.email || !formData.message}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

function ThemeControls() {
  const { updateTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'brand'>('light');

  const applyTheme = (themeName: 'light' | 'dark' | 'brand') => {
    setSelectedTheme(themeName);
    
    switch (themeName) {
      case 'dark':
        updateTheme(darkTheme);
        break;
      case 'brand':
        updateTheme(brandTheme);
        break;
      case 'light':
      default:
        // Reset to default theme
        updateTheme({
          colors: {
            background: '#ffffff',
            surface: '#f9fafb',
            text: {
              primary: '#111827',
              secondary: '#6b7280',
              disabled: '#d1d5db',
            },
            border: '#e5e7eb',
            primary: '#3b82f6',
            secondary: '#6b7280',
          },
          components: {
            card: {
              background: '#ffffff',
              border: '#e5e7eb',
            },
            input: {
              colors: {
                background: '#ffffff',
                border: '#d1d5db',
                text: '#111827',
                placeholder: '#9ca3af',
              },
            },
            button: {
              borderRadius: '0.375rem',
              fontWeight: 500,
              colors: {
                primary: {
                  background: '#3b82f6',
                  backgroundHover: '#2563eb',
                  backgroundActive: '#1d4ed8',
                  text: '#ffffff',
                  border: '#3b82f6',
                },
              },
            },
          },
        });
        break;
    }
  };

  return (
    <Card padding="lg" style={{ marginBottom: '2rem' }}>
      <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
        Theme Controls
      </Text>
      
      <Text color="secondary" style={{ marginBottom: '1rem' }}>
        Switch between different themes to see how the entire interface adapts:
      </Text>
      
      <Box display="flex" style={{ gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button
          variant={selectedTheme === 'light' ? 'primary' : 'outline'}
          onClick={() => applyTheme('light')}
          size="sm"
        >
          Light Theme
        </Button>
        <Button
          variant={selectedTheme === 'dark' ? 'primary' : 'outline'}
          onClick={() => applyTheme('dark')}
          size="sm"
        >
          Dark Theme
        </Button>
        <Button
          variant={selectedTheme === 'brand' ? 'primary' : 'outline'}
          onClick={() => applyTheme('brand')}
          size="sm"
        >
          Brand Theme
        </Button>
      </Box>
    </Card>
  );
}

// ===== MAIN DEMO COMPONENT =====

export function ComprehensiveDemo() {
  return (
    <Box p="xl" maxW="1000px" mx="auto">
      <Text as="h1" size="4xl" weight="bold" align="center" style={{ marginBottom: '3rem' }}>
        Extensible UI Framework
      </Text>
      
      <Text size="lg" color="secondary" align="center" style={{ marginBottom: '3rem' }}>
        A complete demonstration of theme customization, component variants, and runtime updates
      </Text>
      
      <ThemeControls />
      <ThemeShowcase />
      <InteractiveDemo />
      
      {/* Component Showcase */}
      <Card padding="lg">
        <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
          Component Showcase
        </Text>
        
        {/* Buttons */}
        <Box style={{ marginBottom: '2rem' }}>
          <Text size="lg" weight="medium" style={{ marginBottom: '0.5rem' }}>
            Buttons
          </Text>
          <Box display="flex" style={{ gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="primary" size="sm">Primary SM</Button>
            <Button variant="secondary" size="md">Secondary MD</Button>
            <Button variant="outline" size="lg">Outline LG</Button>
            <Button variant="ghost">Ghost</Button>
          </Box>
        </Box>
        
        {/* Typography */}
        <Box style={{ marginBottom: '2rem' }}>
          <Text size="lg" weight="medium" style={{ marginBottom: '0.5rem' }}>
            Typography
          </Text>
          <Box style={{ marginBottom: '0.5rem' }}>
            <Text size="4xl" weight="bold">Heading 1</Text>
            <Text size="2xl" weight="semibold" color="secondary">Heading 2</Text>
            <Text size="base">Regular body text with normal weight</Text>
            <Text size="sm" color="secondary">Small secondary text</Text>
            <Text size="xs" color="disabled">Extra small disabled text</Text>
          </Box>
          <Text fontFamily="mono" size="sm" style={{ 
            backgroundColor: 'rgba(0,0,0,0.05)', 
            padding: '0.5rem',
            borderRadius: '0.25rem',
            display: 'block'
          }}>
            Monospace font for code snippets
          </Text>
        </Box>
        
        {/* Cards */}
        <Box>
          <Text size="lg" weight="medium" style={{ marginBottom: '0.5rem' }}>
            Card Variants
          </Text>
          <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Card variant="elevated" padding="md">
              <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Elevated</Text>
              <Text size="sm" color="secondary">Has shadow</Text>
            </Card>
            <Card variant="outlined" padding="md">
              <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Outlined</Text>
              <Text size="sm" color="secondary">Has border</Text>
            </Card>
            <Card variant="filled" padding="md">
              <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Filled</Text>
              <Text size="sm" color="secondary">Plain style</Text>
            </Card>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

// Main export - wrapped with ThemeProvider
export default function FrameworkDemo() {
  return (
    <ThemeProvider enableCSSVariables cssVariablePrefix="--demo">
      <ComprehensiveDemo />
    </ThemeProvider>
  );
}
