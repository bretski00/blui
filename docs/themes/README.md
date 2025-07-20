# Theme System

The BLUI theme system provides a powerful and flexible way to customize the appearance of your components.

## Overview

The theme system consists of:
- **Theme Provider**: Central theme management
- **Component Themes**: Individual component styling
- **Theme Registry**: Runtime theme registration
- **CSS Variables**: Automatic custom property generation

## Basic Usage

```tsx
import { ThemeProvider } from 'blui';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Custom Themes

```tsx
const customTheme = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
  },
  components: {
    button: {
      colors: {
        primary: {
          background: '#8b5cf6',
          foreground: '#ffffff',
        }
      }
    }
  }
};
```

## Advanced Features

- Runtime theme updates
- Component-specific theme overrides
- CSS variable generation
- TypeScript integration

---

*For more details, see the source code in `src/theme/`*
