# Developer Experience Guide

## Type Contracts & Constants

This UI framework provides excellent developer experience through comprehensive type contracts and constants, similar to C# interfaces. This guide shows you how to use them effectively.

## Overview

Instead of using magic strings, the framework provides type-safe constants that give you:

- **IntelliSense support** - Full autocomplete and type checking
- **Compile-time safety** - Catch errors before runtime
- **Documentation** - Rich JSDoc comments for every option
- **Consistency** - Standardized naming across all components

## Quick Start

### Import Patterns

```tsx
// Option 1: Import specific contracts
import { 
  Button, 
  ButtonVariant, 
  ComponentSize 
} from '@/components';

// Option 2: Import everything from contracts
import { 
  Button,
  Contracts 
} from '@/components';

// Option 3: Import from main entry point
import { 
  Button,
  ButtonVariant,
  ComponentSize,
  ComponentOptions
} from 'your-ui-library';
```

### Basic Usage

```tsx
// Type-safe with constants
<Button 
  variant={ButtonVariant.Primary} 
  size={ComponentSize.Large}
>
  Submit
</Button>

// Still works with strings (for flexibility)
<Button variant="primary" size="lg">
  Submit
</Button>

// Using consolidated contracts object
<Button 
  variant={Contracts.ButtonVariant.Primary}
  size={Contracts.ComponentSize.Large}
>
  Submit
</Button>
```

## Component Contracts

### Button Component

```tsx
import { Button, ButtonVariant, ComponentSize } from '@/components';

function ButtonExamples() {
  return (
    <div>
      {/* All button variants */}
      <Button variant={ButtonVariant.Primary}>Primary</Button>
      <Button variant={ButtonVariant.Secondary}>Secondary</Button>
      <Button variant={ButtonVariant.Outline}>Outline</Button>
      <Button variant={ButtonVariant.Ghost}>Ghost</Button>
      
      {/* All button sizes */}
      <Button size={ComponentSize.Small}>Small</Button>
      <Button size={ComponentSize.Medium}>Medium</Button>
      <Button size={ComponentSize.Large}>Large</Button>
      
      {/* With icons and states */}
      <Button 
        variant={ButtonVariant.Primary}
        size={ComponentSize.Large}
        leftIcon={<PlusIcon />}
        isLoading={isSubmitting}
      >
        Add Item
      </Button>
    </div>
  );
}
```

### Card Component

```tsx
import { Card, CardVariant, CardPadding } from '@/components';

function CardExamples() {
  return (
    <div>
      {/* Card variants */}
      <Card variant={CardVariant.Elevated}>Elevated Card</Card>
      <Card variant={CardVariant.Outlined}>Outlined Card</Card>
      <Card variant={CardVariant.Filled}>Filled Card</Card>
      
      {/* Card padding options */}
      <Card padding={CardPadding.None}>No Padding</Card>
      <Card padding={CardPadding.Small}>Small Padding</Card>
      <Card padding={CardPadding.Medium}>Medium Padding</Card>
      <Card padding={CardPadding.Large}>Large Padding</Card>
      
      {/* Interactive card */}
      <Card 
        variant={CardVariant.Outlined}
        padding={CardPadding.Large}
        hoverable
        onClick={handleCardClick}
      >
        Interactive Content
      </Card>
    </div>
  );
}
```

### Text Component

```tsx
import { 
  Text, 
  TextSize, 
  TextWeight, 
  TextColor, 
  TextAlign,
  TextElement 
} from '@/components';

function TextExamples() {
  return (
    <div>
      {/* Semantic headings */}
      <Text 
        as={TextElement.Heading1}
        size={TextSize.ExtraLarge4}
        weight={TextWeight.Bold}
        color={TextColor.Primary}
      >
        Main Title
      </Text>
      
      {/* Body text with semantic colors */}
      <Text 
        size={TextSize.Base}
        color={TextColor.Secondary}
        lineHeight="relaxed"
      >
        Body text with relaxed line height
      </Text>
      
      {/* Status text */}
      <Text color={TextColor.Success}>Success message</Text>
      <Text color={TextColor.Warning}>Warning message</Text>
      <Text color={TextColor.Error}>Error message</Text>
      
      {/* Aligned text */}
      <Text align={TextAlign.Center}>Centered text</Text>
      <Text align={TextAlign.Right}>Right-aligned text</Text>
      
      {/* Truncated text */}
      <Text 
        truncate 
        style={{ maxWidth: '200px' }}
      >
        This text will be truncated if too long
      </Text>
    </div>
  );
}
```

### Badge Component

```tsx
import { Badge, ComponentVariant, ComponentSize } from '@/components';

function BadgeExamples() {
  return (
    <div>
      {/* Semantic variants */}
      <Badge variant={ComponentVariant.Primary}>Primary</Badge>
      <Badge variant={ComponentVariant.Success}>Success</Badge>
      <Badge variant={ComponentVariant.Warning}>Warning</Badge>
      <Badge variant={ComponentVariant.Error}>Error</Badge>
      
      {/* Outlined badges */}
      <Badge variant={ComponentVariant.Primary} outline>
        Primary Outline
      </Badge>
      
      {/* Different sizes */}
      <Badge size={ComponentSize.Small}>Small</Badge>
      <Badge size={ComponentSize.Medium}>Medium</Badge>
      <Badge size={ComponentSize.Large}>Large</Badge>
      
      {/* With icons */}
      <Badge variant={ComponentVariant.Success}>
        <Icon name="check" /> Verified
      </Badge>
    </div>
  );
}
```

### Input Component

```tsx
import { Input, ComponentSize } from '@/components';

function InputExamples() {
  return (
    <div>
      {/* Basic input with validation */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        size={ComponentSize.Medium}
        helperText="We'll never share your email"
      />
      
      {/* Input with error state */}
      <Input
        label="Password"
        type="password"
        size={ComponentSize.Large}
        error={hasError}
        helperText={hasError ? "Password is required" : "Min 8 characters"}
        leftIcon={<LockIcon />}
      />
      
      {/* Search input with icons */}
      <Input
        placeholder="Search..."
        size={ComponentSize.Small}
        leftIcon={<SearchIcon />}
        rightIcon={<ClearIcon onClick={clearSearch} />}
      />
    </div>
  );
}
```

## Layout System Contracts

```tsx
import { 
  Flex, 
  Grid,
  FlexDirection,
  FlexJustify,
  FlexAlign,
  Spacing 
} from '@/components';

function LayoutExamples() {
  return (
    <div>
      {/* Flex layouts */}
      <Flex 
        direction={FlexDirection.Column}
        justify={FlexJustify.SpaceBetween}
        align={FlexAlign.Center}
        gap={Spacing.Large}
      >
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Flex>
      
      {/* Grid layouts */}
      <Grid columns="3" gap={Spacing.Medium}>
        <div>Grid Item 1</div>
        <div>Grid Item 2</div>
        <div>Grid Item 3</div>
      </Grid>
    </div>
  );
}
```

## Discovering Available Options

### Using ComponentOptions

```tsx
import { ComponentOptions } from '@/components';

// Discover all available options programmatically
function OptionDiscovery() {
  const buttonVariants = ComponentOptions.Button.variants;
  // ['primary', 'secondary', 'outline', 'ghost']
  
  const textSizes = ComponentOptions.Text.sizes;
  // ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']
  
  const commonSizes = ComponentOptions.Common.sizes;
  // ['sm', 'md', 'lg']
  
  return (
    <div>
      {buttonVariants.map(variant => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}
```

### IntelliSense Support

When you type `ButtonVariant.` in your IDE, you'll get full autocomplete with:

- All available options
- JSDoc documentation for each option
- Type safety and error checking
- Consistent naming patterns

## Best Practices

### 1. Use Constants for Reusable Configurations

```tsx
// Define common configurations using constants
const PRIMARY_BUTTON_CONFIG = {
  variant: ButtonVariant.Primary,
  size: ComponentSize.Large
} as const;

const CARD_CONFIG = {
  variant: CardVariant.Elevated,
  padding: CardPadding.Large,
  hoverable: true
} as const;

function MyComponent() {
  return (
    <Card {...CARD_CONFIG}>
      <Button {...PRIMARY_BUTTON_CONFIG}>
        Action
      </Button>
    </Card>
  );
}
```

### 2. Create Custom Type Guards

```tsx
import { ButtonVariant } from '@/components';

function isPrimaryVariant(variant: string): variant is typeof ButtonVariant.Primary {
  return variant === ButtonVariant.Primary;
}

function ConditionalButton({ variant }: { variant: string }) {
  if (isPrimaryVariant(variant)) {
    // TypeScript knows this is primary variant
    return <Button variant={variant}>Primary Action</Button>;
  }
  
  return <Button variant="secondary">Secondary Action</Button>;
}
```

### 3. Use Contracts Object for Namespace Organization

```tsx
import { Contracts } from '@/components';

// Organize related constants under the Contracts namespace
const THEME_CONFIGS = {
  header: {
    text: {
      size: Contracts.TextSize.ExtraLarge3,
      weight: Contracts.TextWeight.Bold,
      color: Contracts.TextColor.Primary
    }
  },
  button: {
    variant: Contracts.ButtonVariant.Primary,
    size: Contracts.ComponentSize.Large
  }
} as const;
```

### 4. Combine with Theme Customization

```tsx
import { useTheme, ButtonVariant, ComponentSize } from '@/components';

function ThemedComponent() {
  const { updateTheme } = useTheme();
  
  const applyCustomTheme = () => {
    updateTheme({
      components: {
        button: {
          colors: {
            primary: {
              background: '#ff6b35',
              backgroundHover: '#e55a2b',
              backgroundActive: '#cc4e24'
            }
          }
        }
      }
    });
  };
  
  return (
    <Button 
      variant={ButtonVariant.Primary}
      size={ComponentSize.Large}
      onClick={applyCustomTheme}
    >
      Apply Custom Theme
    </Button>
  );
}
```

## Migration from String Literals

If you're already using string literals, migration is easy:

```tsx
// Before (still works)
<Button variant="primary" size="lg">Submit</Button>

// After (recommended)
<Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
  Submit
</Button>

// Or gradual migration
<Button variant={ButtonVariant.Primary} size="lg">Submit</Button>
```

## Type Safety Benefits

The type contract system provides:

1. **Compile-time error checking** - Catch typos and invalid options before runtime
2. **IntelliSense support** - Full autocomplete in your IDE
3. **Documentation at your fingertips** - JSDoc comments for every option
4. **Refactoring safety** - Rename operations work across your entire codebase
5. **Consistency** - Standardized naming and organization

This approach gives you the same benefits as C# interfaces while maintaining the flexibility and ease of use that React developers expect.
