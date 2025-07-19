# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Extensible UI Framework

A React-based UI framework with a powerful, extensible theme system that allows developers to customize every aspect of the design while maintaining consistency across components.

## Features

- 🎨 **Extensible Theme System** - Customize colors, typography, spacing, and component styles
- 🔧 **Headless Theme Provider** - Theme-aware components with automatic updates
- 📱 **Responsive Design** - Built-in breakpoint system for responsive layouts
- 💪 **TypeScript Support** - Full type safety and IntelliSense support
- 🎯 **CSS Variables** - Automatic CSS custom property generation
- 🔄 **Runtime Theme Updates** - Change themes dynamically at runtime
- 📦 **Component Library** - Pre-built components that integrate seamlessly with the theme

## Quick Start

### 1. Basic Usage

```tsx
import { ThemeProvider, Button, Card, Text } from './ui-framework';

function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Text as="h1" size="2xl" weight="bold">
          Welcome to our UI Framework
        </Text>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

### 2. Custom Theme

```tsx
import { ThemeProvider, type ThemeOverride } from './ui-framework';

const customTheme: ThemeOverride = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
    background: '#fafafa',
  },
  typography: {
    fontFamily: {
      primary: 'Poppins, sans-serif',
    },
  },
  components: {
    button: {
      borderRadius: '12px',
      colors: {
        primary: {
          background: '#8b5cf6',
          backgroundHover: '#7c3aed',
          backgroundActive: '#6d28d9',
        },
      },
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### 3. Runtime Theme Updates

```tsx
import { useTheme, Button } from './ui-framework';

function ThemeSwitcher() {
  const { updateTheme } = useTheme();

  const switchToDarkMode = () => {
    updateTheme({
      colors: {
        background: '#1a1a1a',
        surface: '#2a2a2a',
        text: {
          primary: '#ffffff',
          secondary: '#a1a1a1',
        },
      },
    });
  };

  return <Button onClick={switchToDarkMode}>Switch to Dark Mode</Button>;
}
```

## Theme System

### Theme Structure

The theme system is built around a comprehensive type-safe structure:

- **Colors**: Primary, secondary, success, warning, error, info, background, surface, text, border
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl, 4xl)
- **Border Radius**: Rounded corner values
- **Shadows**: Box shadow definitions
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering system
- **Components**: Component-specific styling

### Default Theme Values

The framework comes with a carefully crafted default theme:

```typescript
const defaultTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    // ... more colors
  },
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Georgia, serif',
      mono: 'JetBrains Mono, Monaco, Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      // ... more sizes
    },
  },
  // ... more theme properties
};
```

### Partial Theme Overrides

You can override any part of the theme without having to redefine everything:

```tsx
// Only override what you need
const partialTheme: ThemeOverride = {
  colors: {
    primary: '#ff6b6b', // Only change primary color
  },
  components: {
    button: {
      borderRadius: '24px', // Only change button border radius
    },
  },
};
```

## Components

### Button

```tsx
<Button variant="primary" size="lg" leftIcon={<Icon />}>
  Click me
</Button>

// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
```

### Input

```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  size="md"
  leftIcon={<EmailIcon />}
  helperText="We'll never share your email"
/>
```

### Card

```tsx
<Card variant="elevated" padding="lg" hoverable>
  <Text>Card content</Text>
</Card>

// Variants: elevated, outlined, filled
// Padding: sm, md, lg, none
```

### Text

```tsx
<Text as="h1" size="2xl" weight="bold" color="primary">
  Heading Text
</Text>

// Elements: p, span, div, h1-h6
// Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
// Weights: light, normal, medium, semibold, bold
```

### Box (Layout)

```tsx
<Box
  p="lg"
  m="md"
  bg="#f3f4f6"
  borderRadius="md"
  shadow="lg"
  display="flex"
>
  Layout content
</Box>
```

## Hooks

### useTheme

Access the complete theme object and update function:

```tsx
const { theme, updateTheme } = useTheme();
```

### Specific Theme Hooks

```tsx
const colors = useColors();
const typography = useTypography();
const spacing = useSpacing();
const componentTheme = useComponentTheme();
```

### useThemeValue

Get specific theme values with a selector:

```tsx
const primaryColor = useThemeValue(theme => theme.colors.primary);
const buttonTheme = useThemeValue(theme => theme.components.button);
```

## CSS Variables

The framework automatically generates CSS custom properties from your theme:

```css
:root {
  --ui-colors-primary: #3b82f6;
  --ui-colors-secondary: #6b7280;
  --ui-typography-fontSize-base: 1rem;
  /* ... and many more */
}
```

Enable CSS variables in the ThemeProvider:

```tsx
<ThemeProvider enableCSSVariables cssVariablePrefix="--my-app">
  {/* Your app */}
</ThemeProvider>
```

## Advanced Usage

### Creating Custom Components

```tsx
import { useComponentTheme, useColors } from './ui-framework';

function CustomComponent() {
  const colors = useColors();
  const componentTheme = useComponentTheme();

  const styles = {
    backgroundColor: colors.primary,
    borderRadius: componentTheme.button.borderRadius,
    // ... use theme values
  };

  return <div style={styles}>Custom Component</div>;
}
```

### Extending Component Themes

Add your own component themes to the type system:

```typescript
// Add to theme types
interface CustomComponentTheme {
  backgroundColor: string;
  textColor: string;
}

// Extend the main theme interface
declare module './ui-framework' {
  interface Theme {
    components: {
      // ... existing components
      customComponent: CustomComponentTheme;
    };
  }
}
```

## Best Practices

1. **Start with the default theme** and override only what you need
2. **Use theme hooks** in your components for automatic updates
3. **Leverage CSS variables** for better performance and external styling
4. **Create component-specific themes** for complex styling needs
5. **Use TypeScript** to catch theme-related errors early

## Development

To run the demo:

```bash
npm run dev
```

To build:

```bash
npm run build
```

## License

MIT License - feel free to use in your projects!

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
