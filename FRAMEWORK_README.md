# Extensible UI Framework

A modern, TypeScript-first UI component library with a powerful, extensible theme system. Built with React and designed for maximum flexibility and developer experience.

## Features

- 🎨 **Extensible Theme System** - Fully customizable theme with deep merging capabilities
- 🔧 **TypeScript First** - Complete type safety with excellent developer experience
- 🎯 **Headless Theme Provider** - Theme logic separated from component implementation
- 🚀 **Zero Dependencies** - Only requires React as peer dependency
- 📱 **Responsive Design** - Built-in responsive utilities and breakpoints
- 🎪 **CSS Variables** - Automatic CSS custom properties generation
- 🔄 **Runtime Theme Updates** - Change themes dynamically at runtime
- 🎭 **Component Variants** - Multiple variants and sizes for each component

## Installation

```bash
npm install your-ui-framework
# or
yarn add your-ui-framework
# or
pnpm add your-ui-framework
```

## Quick Start

```tsx
import React from 'react';
import { ThemeProvider, Button, Card, Text } from 'your-ui-framework';

function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Text as="h1" size="2xl" weight="bold">
          Welcome to the UI Framework
        </Text>
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Theme System

### Basic Theme Customization

```tsx
import { ThemeProvider, type ThemeOverride } from 'your-ui-framework';

const customTheme: ThemeOverride = {
  colors: {
    primary: '#6366f1',
    secondary: '#ec4899',
  },
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif',
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Component-Specific Theme Overrides

```tsx
const advancedTheme: ThemeOverride = {
  components: {
    button: {
      borderRadius: '8px',
      colors: {
        primary: {
          background: '#6366f1',
          backgroundHover: '#4f46e5',
          text: '#ffffff',
        },
      },
    },
    card: {
      borderRadius: '12px',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
  },
};
```

### Runtime Theme Updates

```tsx
import { useTheme } from 'your-ui-framework';

function ThemeToggler() {
  const { theme, updateTheme } = useTheme();

  const toggleDarkMode = () => {
    updateTheme({
      colors: {
        background: theme.colors.background === '#ffffff' ? '#1f2937' : '#ffffff',
        text: {
          primary: theme.colors.background === '#ffffff' ? '#f9fafb' : '#111827',
        },
      },
    });
  };

  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>;
}
```

## Components

### Button

```tsx
<Button variant="primary" size="md" onClick={() => console.log('Clicked!')}>
  Primary Button
</Button>

<Button variant="outline" size="lg" leftIcon={<Icon />}>
  Button with Icon
</Button>

<Button variant="ghost" isLoading>
  Loading Button
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'outline' | 'ghost'`
- `size`: `'sm' | 'md' | 'lg'`
- `isLoading`: `boolean`
- `leftIcon`, `rightIcon`: `ReactNode`

### Input

```tsx
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  size="md"
/>

<Input
  label="Password"
  type="password"
  error={true}
  helperText="Password is required"
  leftIcon={<LockIcon />}
/>
```

**Props:**
- `size`: `'sm' | 'md' | 'lg'`
- `error`: `boolean`
- `label`: `string`
- `helperText`: `string`
- `leftIcon`, `rightIcon`: `ReactNode`

### Card

```tsx
<Card variant="elevated" padding="lg" hoverable>
  <Text>Card content goes here</Text>
</Card>

<Card variant="outlined" padding="md">
  <Text>Outlined card</Text>
</Card>
```

**Props:**
- `variant`: `'elevated' | 'outlined' | 'filled'`
- `padding`: `'sm' | 'md' | 'lg' | 'none'`
- `hoverable`: `boolean`

### Text

```tsx
<Text as="h1" size="3xl" weight="bold" color="primary">
  Main Heading
</Text>

<Text size="sm" color="secondary" fontFamily="mono">
  Code snippet
</Text>

<Text truncate maxWidth="200px">
  This text will be truncated if it's too long
</Text>
```

**Props:**
- `as`: `'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`
- `size`: `'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'`
- `weight`: `'light' | 'normal' | 'medium' | 'semibold' | 'bold'`
- `color`: `'primary' | 'secondary' | 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'inherit'`
- `align`: `'left' | 'center' | 'right' | 'justify'`
- `fontFamily`: `'primary' | 'secondary' | 'mono'`
- `truncate`: `boolean`

### Box (Layout Component)

```tsx
<Box p="lg" m="md" bg="#f3f4f6" borderRadius="md">
  <Text>Flexible layout component</Text>
</Box>

<Box
  display="flex"
  style={{ justifyContent: 'space-between', alignItems: 'center' }}
>
  <Text>Left content</Text>
  <Button>Right button</Button>
</Box>
```

**Props:**
- Spacing: `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl`, `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml`
- Layout: `w`, `h`, `minW`, `minH`, `maxW`, `maxH`, `display`, `position`
- Styling: `bg`, `borderRadius`, `border`, `shadow`, `opacity`

## Hooks

### useTheme

Access the current theme and update it:

```tsx
const { theme, updateTheme } = useTheme();
```

### useThemeValue

Get specific theme values with type safety:

```tsx
const colors = useThemeValue(theme => theme.colors);
const buttonTheme = useThemeValue(theme => theme.components.button);
```

### Convenience Hooks

```tsx
const colors = useColors();
const typography = useTypography();
const spacing = useSpacing();
const breakpoints = useBreakpoints();
```

## CSS Variables

When `enableCSSVariables` is true, the theme system automatically generates CSS custom properties:

```css
:root {
  --ui-colors-primary: #3b82f6;
  --ui-colors-secondary: #6b7280;
  --ui-typography-fontSize-base: 1rem;
  /* ... and many more */
}
```

You can customize the prefix:

```tsx
<ThemeProvider cssVariablePrefix="--my-app">
  {/* CSS variables will be prefixed with --my-app */}
</ThemeProvider>
```

## TypeScript Support

The framework is built with TypeScript and provides excellent type safety:

```tsx
// Theme overrides are fully typed
const theme: ThemeOverride = {
  colors: {
    primary: '#6366f1', // ✅ Valid
    invalidColor: '#123', // ❌ TypeScript error
  },
};

// Component props are fully typed
<Button
  variant="primary" // ✅ Valid
  variant="invalid" // ❌ TypeScript error
  size="md"
  onClick={(e) => {
    // e is properly typed as MouseEvent
  }}
/>
```

## Advanced Usage

### Creating Custom Components

```tsx
import { useComponentTheme, useColors } from 'your-ui-framework';

function CustomButton() {
  const componentTheme = useComponentTheme();
  const colors = useColors();
  
  const styles = {
    backgroundColor: componentTheme.button.colors.primary.background,
    color: componentTheme.button.colors.primary.text,
    border: `1px solid ${colors.primary}`,
    // ... more styles
  };
  
  return <button style={styles}>Custom Button</button>;
}
```

### Extending the Theme

```tsx
// Define your own component themes
interface MyTheme extends Theme {
  components: Theme['components'] & {
    navbar: {
      height: string;
      background: string;
    };
  };
}

const customTheme: DeepPartial<MyTheme> = {
  components: {
    navbar: {
      height: '64px',
      background: '#ffffff',
    },
  },
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.
