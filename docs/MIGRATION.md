# Migration Guide

This guide helps you migrate to the new modular contracts and types system introduced in BLUI v1.0.2.

## What Changed

BLUI v1.0.2 introduces a more organized and modular approach to type contracts and TypeScript utilities:

### Before (v1.0.1 and earlier)
- Single large `contracts/index.ts` file with all constants
- Basic type definitions alongside constants
- Limited TypeScript utilities

### After (v1.0.2 and later)
- **Modular contracts** split into focused files
- **Enhanced types layer** with advanced utilities
- **Better tree-shaking** support
- **Responsive design types**
- **Builder patterns** for complex configurations

## Breaking Changes

**None.** All existing imports continue to work exactly as before. This is a purely additive change.

## New Capabilities

### 1. Modular Contract Imports

```tsx
// New: Import from specific modules (optional)
import { ButtonVariant, CardVariant } from 'blui/contracts/variants';
import { TextSize, TextWeight } from 'blui/contracts/typography';
import { FlexDirection } from 'blui/contracts/layout';

// Old: Still works exactly the same
import { ButtonVariant, TextSize, FlexDirection } from 'blui/contracts';
```

**Benefits:**
- Better tree-shaking for smaller bundles
- Clearer dependencies
- Easier to understand what's being used

### 2. Enhanced TypeScript Utilities

```tsx
// New: Advanced type utilities
import { 
  ResponsiveValue, 
  createButtonConfig, 
  BaseComponentProps,
  Theme 
} from 'blui/types';

// Responsive values
const responsiveSize: ResponsiveValue<ComponentSizeType> = {
  base: 'sm',
  md: 'md', 
  lg: 'lg'
};

// Builder patterns
const buttonConfig = createButtonConfig()
  .variant('primary')
  .size('lg')
  .build();

// Theme types
const customTheme: Theme = {
  colors: { /* ... */ },
  components: { /* ... */ }
};
```

### 3. Better Component Props

```tsx
// New: Reusable prop interfaces
import { BaseComponentProps, SpacingProps, VariantProps } from 'blui/types';

interface MyComponentProps extends BaseComponentProps, SpacingProps, VariantProps {
  title: string;
}

// Automatically includes: className, style, data-testid, aria-*, spacing props, variant
```

## Migration Strategies

### Gradual Migration (Recommended)

Keep your existing imports and gradually adopt new patterns:

```tsx
// Keep existing imports
import { ButtonVariant, ComponentSize } from 'blui/contracts';

// Add new utilities as needed
import { ResponsiveSize } from 'blui/types';

const responsiveSize: ResponsiveSize = {
  base: ComponentSize.Small,
  md: ComponentSize.Medium,
  lg: ComponentSize.Large
};
```

### Tree-Shaking Optimization

For better bundle sizes, use modular imports:

```tsx
// Before: Imports everything from contracts
import { ButtonVariant, TextSize, FlexDirection } from 'blui/contracts';

// After: Import only what you need
import { ButtonVariant } from 'blui/contracts/variants';
import { TextSize } from 'blui/contracts/typography';
import { FlexDirection } from 'blui/contracts/layout';
```

### Advanced TypeScript Usage

Leverage new type utilities for better developer experience:

```tsx
// Before: Manual type definitions
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

// After: Use provided interfaces
import { VariantProps, SizeProps, BaseComponentProps } from 'blui/types';

interface ButtonProps extends VariantProps, SizeProps, BaseComponentProps {
  // Focus on your specific props
}
```

## File Organization Reference

### Contracts Structure
```
contracts/
├── index.ts          # All exports + legacy Contracts object
├── variants.ts       # ComponentVariant, ButtonVariant, CardVariant
├── sizing.ts         # ComponentSize, CardPadding, Spacing
├── typography.ts     # TextSize, TextWeight, TextColor, TextAlign, TextElement
├── layout.ts         # FlexDirection, FlexJustify, FlexAlign
├── common.ts         # Common type unions and utilities
└── options.ts        # IntelliSense-friendly component options
```

### Types Structure
```
types/
└── index.ts          # TypeScript utilities, responsive types, theme interfaces, builders
```

## Best Practices

### 1. Import Strategy
- Use `blui/contracts` for basic usage
- Use `blui/contracts/[module]` for tree-shaking optimization
- Use `blui/types` for advanced TypeScript features

### 2. Responsive Design
```tsx
// Good: Use responsive values
<Button size={{ base: 'sm', md: 'md', lg: 'lg' }}>
  Responsive Button
</Button>

// Better: Type-safe responsive values
import { ResponsiveSize } from 'blui/types';
const buttonSize: ResponsiveSize = { base: 'sm', md: 'md', lg: 'lg' };
```

### 3. Theme Customization
```tsx
// Use Theme interface for type safety
import { Theme } from 'blui/types';

const customTheme: Theme = {
  colors: {
    primary: { /* color palette */ },
    // TypeScript ensures you provide all required colors
  }
};
```

### 4. Component Development
```tsx
// Extend common prop interfaces
import { BaseComponentProps, SpacingProps } from 'blui/types';

interface CustomComponentProps extends BaseComponentProps, SpacingProps {
  title: string;
  description?: string;
}
```

## Common Questions

### Q: Do I need to change my existing code?
**A:** No, all existing imports continue to work exactly as before.

### Q: Should I migrate everything at once?
**A:** No, migrate gradually as you work on different parts of your application.

### Q: What are the benefits of the new structure?
**A:** Better tree-shaking, clearer dependencies, advanced TypeScript features, and responsive design support.

### Q: Are there performance benefits?
**A:** Yes, modular imports can reduce bundle sizes through better tree-shaking.

### Q: What about the old Contracts object?
**A:** It still works and will continue to be supported for backward compatibility.

## Examples

### Before and After Comparison

```tsx
// Before: Basic usage
import { ButtonVariant, ComponentSize } from 'blui/contracts';

<Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
  Click me
</Button>

// After: Enhanced with responsive and builder patterns
import { createButtonConfig } from 'blui/types';
import { ButtonVariant, ComponentSize } from 'blui/contracts';

const buttonConfig = createButtonConfig()
  .variant(ButtonVariant.Primary)
  .size(ComponentSize.Large)
  .build();

<Button 
  {...buttonConfig}
  size={{ base: ComponentSize.Small, md: ComponentSize.Large }}
>
  Responsive Button
</Button>
```

### Theme Integration

```tsx
// Before: Manual theme object
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d'
  }
};

// After: Type-safe theme with full structure
import { Theme, ColorPalette } from 'blui/types';

const primaryPalette: ColorPalette = {
  50: '#e3f2fd', 100: '#bbdefb', 200: '#90caf9', 300: '#64b5f6',
  400: '#42a5f5', 500: '#2196f3', 600: '#1e88e5', 700: '#1976d2',
  800: '#1565c0', 900: '#0d47a1', 950: '#0a3870'
};

const customTheme: Theme = {
  colors: {
    primary: primaryPalette,
    // TypeScript ensures all required colors are provided
  },
  components: {
    button: {
      colors: {
        primary: {
          background: 'primary.500',
          foreground: 'white'
        }
      }
    }
  }
};
```

---

For questions or issues with migration, please check the [documentation](../README.md) or open an issue on GitHub.
