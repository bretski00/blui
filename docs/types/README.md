# TypeScript Utilities

BLUI provides a comprehensive TypeScript utilities layer that enhances the developer experience beyond the core contracts. This layer includes advanced type utilities, responsive design support, theme definitions, and fluent configuration APIs.

## Overview

The types system provides:
- **Advanced TypeScript utilities** for better type manipulation
- **Responsive design types** for breakpoint-aware components
- **Theme system interfaces** for complete theme customization
- **Builder patterns** for fluent component configuration
- **Runtime validation** with type guards
- **Common prop patterns** for consistent component APIs

## Core Utilities

### Type Manipulation

```tsx
import { ValueOf, Optional, RequiredKeys } from 'blui/types';

// Extract values from constant objects
type ButtonValues = ValueOf<typeof ButtonVariant>; // 'primary' | 'secondary' | 'outline' | 'ghost'

// Make properties optional
type OptionalSizeButton = Optional<ButtonProps, 'size'>;

// Make properties required
type RequiredVariantButton = RequiredKeys<ButtonProps, 'variant'>;
```

### Enhanced Type Aliases

```tsx
import { 
  ButtonVariantType, 
  ComponentSizeType, 
  TextSizeType 
} from 'blui/types';

// More descriptive type names
const variant: ButtonVariantType = 'primary';
const size: ComponentSizeType = 'lg';
const textSize: TextSizeType = 'xl';
```

## Responsive Design

### Responsive Values

```tsx
import { ResponsiveValue, ResponsiveSize, ResponsiveSpacing } from 'blui/types';

// Single value or breakpoint object
const responsiveSize: ResponsiveSize = {
  base: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'lg'
};

const responsiveSpacing: ResponsiveSpacing = {
  base: 'sm',
  md: 'md',
  lg: 'lg'
};

// Use in components
<Button size={responsiveSize}>Responsive Button</Button>
<Box p={responsiveSpacing}>Responsive padding</Box>
```

### Responsive Patterns

```tsx
// Simple responsive value
<Text size={{ base: 'sm', md: 'lg', xl: '2xl' }}>
  Responsive text
</Text>

// Responsive spacing
<Box 
  p={{ base: 'sm', md: 'md', lg: 'lg' }}
  m={{ base: 'xs', md: 'sm', lg: 'md' }}
>
  Responsive spacing
</Box>
```

## Common Prop Patterns

### Base Component Props

```tsx
import { BaseComponentProps } from 'blui/types';

interface MyComponentProps extends BaseComponentProps {
  // Your custom props
  title: string;
}

// Includes: className, style, data-testid, aria-label, aria-describedby
```

### Variant and Size Props

```tsx
import { VariantProps, SizeProps } from 'blui/types';

interface ButtonProps extends VariantProps, SizeProps {
  children: React.ReactNode;
}

// Automatically includes variant and size with proper types
```

### Spacing Props

```tsx
import { SpacingProps } from 'blui/types';

interface BoxProps extends SpacingProps {
  children: React.ReactNode;
}

// Includes all margin/padding props: m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py
// All with responsive support
```

### Interactive Props

```tsx
import { InteractiveProps } from 'blui/types';

interface ButtonProps extends InteractiveProps {
  children: React.ReactNode;
}

// Includes: disabled, loading, onClick, onFocus, onBlur
```

## Theme System Types

### Complete Theme Definition

```tsx
import { Theme, ThemeColors, ComponentThemes } from 'blui/types';

const customTheme: Theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... full palette
      900: '#0c4a6e',
      950: '#082f49'
    },
    // ... other colors
  },
  components: {
    button: {
      colors: {
        primary: {
          background: 'primary.500',
          foreground: 'white',
          hover: {
            background: 'primary.600'
          }
        }
      }
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
```

### Color Palette Structure

```tsx
import { ColorPalette } from 'blui/types';

const primaryColors: ColorPalette = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',  // Main color
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
  950: '#082f49'
};
```

## Builder Patterns

### Button Configuration

```tsx
import { createButtonConfig, ButtonConfigBuilder } from 'blui/types';

// Fluent API for complex configurations
const buttonConfig = createButtonConfig()
  .variant('primary')
  .size('lg')
  .disabled(false)
  .loading(false)
  .build();

// Use with components
<Button {...buttonConfig}>Configured Button</Button>
```

### Text Configuration

```tsx
import { createTextConfig } from 'blui/types';

const headingConfig = createTextConfig()
  .size('2xl')
  .weight('bold')
  .color('primary')
  .align('center')
  .as('h1')
  .build();

<Text {...headingConfig}>Main Heading</Text>
```

### Custom Builders

```tsx
import { ButtonConfigBuilder } from 'blui/types';

class CustomButtonBuilder extends ButtonConfigBuilder {
  marketing(): this {
    return this.variant('primary').size('lg').loading(false);
  }
  
  danger(): this {
    return this.variant('secondary').size('md');
  }
}

const marketingButton = new CustomButtonBuilder()
  .marketing()
  .build();
```

## Runtime Validation

### Type Guards

```tsx
import { 
  isButtonVariant, 
  isComponentSize, 
  isTextSize, 
  isSpacing 
} from 'blui/types';

// Runtime validation
function validateButtonProps(variant: string, size: string) {
  if (!isButtonVariant(variant)) {
    throw new Error(`Invalid button variant: ${variant}`);
  }
  
  if (!isComponentSize(size)) {
    throw new Error(`Invalid component size: ${size}`);
  }
  
  // TypeScript now knows these are valid
  return { variant, size };
}
```

### Contract Options Discovery

```tsx
import { getContractOptions } from 'blui/types';

// Get all available options programmatically
const availableButtonVariants = getContractOptions.buttonVariants();
// Returns: ['primary', 'secondary', 'outline', 'ghost']

const availableTextSizes = getContractOptions.textSizes();
// Returns: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']

// Useful for form builders, documentation, etc.
```

## Integration Examples

### Form Builder Integration

```tsx
import { getContractOptions, ButtonVariantType } from 'blui/types';

function ButtonVariantSelect() {
  const variants = getContractOptions.buttonVariants();
  
  return (
    <select>
      {variants.map(variant => (
        <option key={variant} value={variant}>
          {variant}
        </option>
      ))}
    </select>
  );
}
```

### Theme Builder

```tsx
import { Theme, ColorPalette } from 'blui/types';

function createTheme(primaryColor: ColorPalette): Theme {
  return {
    colors: {
      primary: primaryColor,
      // ... generate other colors
    },
    components: {
      button: {
        colors: {
          primary: {
            background: 'primary.500',
            foreground: 'white',
            hover: {
              background: 'primary.600'
            }
          }
        }
      }
    }
  };
}
```

### Responsive Component Factory

```tsx
import { ResponsiveValue, ComponentSizeType } from 'blui/types';

function createResponsiveButton(
  size: ResponsiveValue<ComponentSizeType>
) {
  return <Button size={size}>Responsive Button</Button>;
}

// Usage
const responsiveButton = createResponsiveButton({
  base: 'sm',
  md: 'md',
  lg: 'lg'
});
```

## Best Practices

1. **Use prop interfaces**: Extend common prop patterns for consistency
2. **Leverage builders**: Use builder patterns for complex configurations
3. **Validate at runtime**: Use type guards when dealing with external data
4. **Responsive by default**: Design with responsive values in mind
5. **Theme-aware**: Use theme types for proper customization
6. **Type-safe themes**: Define complete theme interfaces
7. **Discover options**: Use contract options for dynamic UI generation

## Advanced Patterns

### Higher-Order Component Types

```tsx
import { BaseComponentProps, VariantProps } from 'blui/types';

function withVariant<P extends BaseComponentProps>(
  Component: React.ComponentType<P>
) {
  return function VariantComponent(
    props: P & VariantProps
  ) {
    return <Component {...props} />;
  };
}
```

### Conditional Props

```tsx
import { ButtonVariantType } from 'blui/types';

type ConditionalButtonProps = 
  | { variant: 'primary'; priority: 'high' }
  | { variant: 'secondary'; priority?: 'medium' | 'low' }
  | { variant: 'ghost'; priority?: never };

// TypeScript enforces the relationship between variant and priority
```

## Related Documentation

- [Contracts](../contracts/README.md) - Core type contracts and constants
- [Theme System](../themes/README.md) - Theme customization and integration
- [Components](../components/README.md) - Component usage with type utilities
