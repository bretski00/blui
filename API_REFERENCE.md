# API Reference Guide

## Type Contracts & Constants

This framework provides comprehensive type contracts similar to C# interfaces, giving you excellent developer experience with full TypeScript support.

## Table of Contents

- [Core Concepts](#core-concepts)
- [Component Contracts](#component-contracts)
- [Layout Contracts](#layout-contracts)
- [Import Patterns](#import-patterns)
- [TypeScript Integration](#typescript-integration)
- [Advanced Usage](#advanced-usage)

## Core Concepts

### Type Contract Pattern

Instead of using magic strings, the framework provides type-safe constants:

```tsx
// ❌ Old way: Magic strings
<Button variant="primary" size="lg">Button</Button>

// ✅ New way: Type-safe contracts
<Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
  Button
</Button>
```

### Benefits

- **IntelliSense Support**: Full autocomplete in your IDE
- **Compile-time Safety**: Catch errors before runtime
- **Rich Documentation**: JSDoc comments for every option
- **Easy Refactoring**: Rename operations work across your codebase
- **Consistency**: Standardized naming patterns

## Component Contracts

### Button

```tsx
import { Button, ButtonVariant, ComponentSize } from '@your-ui-lib';

// All variants
ButtonVariant.Primary    // 'primary'
ButtonVariant.Secondary  // 'secondary'
ButtonVariant.Outline    // 'outline'
ButtonVariant.Ghost      // 'ghost'

// All sizes
ComponentSize.Small   // 'sm'
ComponentSize.Medium  // 'md'
ComponentSize.Large   // 'lg'

// Usage examples
<Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
  Primary Button
</Button>

<Button 
  variant={ButtonVariant.Outline}
  size={ComponentSize.Medium}
  leftIcon={<PlusIcon />}
  isLoading={isSubmitting}
>
  Add Item
</Button>
```

### Card

```tsx
import { Card, CardVariant, CardPadding } from '@your-ui-lib';

// Card variants
CardVariant.Elevated  // 'elevated' - with shadow
CardVariant.Outlined  // 'outlined' - with border
CardVariant.Filled    // 'filled' - with background

// Card padding
CardPadding.None    // 'none'
CardPadding.Small   // 'sm'
CardPadding.Medium  // 'md'
CardPadding.Large   // 'lg'

// Usage examples
<Card 
  variant={CardVariant.Elevated}
  padding={CardPadding.Large}
  hoverable
>
  Card content
</Card>
```

### Badge

```tsx
import { Badge, ComponentVariant, ComponentSize } from '@your-ui-lib';

// Badge variants (uses ComponentVariant)
ComponentVariant.Primary    // 'primary'
ComponentVariant.Secondary  // 'secondary'
ComponentVariant.Success    // 'success'
ComponentVariant.Warning    // 'warning'
ComponentVariant.Error      // 'error'

// Usage examples
<Badge variant={ComponentVariant.Success} size={ComponentSize.Small}>
  Active
</Badge>

<Badge variant={ComponentVariant.Primary} outline>
  Outlined
</Badge>
```

### Text

```tsx
import { 
  Text, 
  TextSize, 
  TextWeight, 
  TextColor, 
  TextAlign,
  TextElement 
} from '@your-ui-lib';

// Text sizes
TextSize.ExtraSmall  // 'xs' - 12px
TextSize.Small       // 'sm' - 14px
TextSize.Base        // 'base' - 16px (default)
TextSize.Large       // 'lg' - 18px
TextSize.ExtraLarge  // 'xl' - 20px
TextSize.ExtraLarge2 // '2xl' - 24px
TextSize.ExtraLarge3 // '3xl' - 30px
TextSize.ExtraLarge4 // '4xl' - 36px

// Text weights
TextWeight.Light     // 'light' - 300
TextWeight.Normal    // 'normal' - 400 (default)
TextWeight.Medium    // 'medium' - 500
TextWeight.SemiBold  // 'semibold' - 600
TextWeight.Bold      // 'bold' - 700

// Text colors
TextColor.Primary    // 'primary' - highest contrast
TextColor.Secondary  // 'secondary' - medium contrast
TextColor.Disabled   // 'disabled' - lowest contrast
TextColor.Success    // 'success' - green
TextColor.Warning    // 'warning' - orange
TextColor.Error      // 'error' - red
TextColor.Info       // 'info' - blue
TextColor.Inherit    // 'inherit' - inherit from parent

// Text alignment
TextAlign.Left      // 'left' (default)
TextAlign.Center    // 'center'
TextAlign.Right     // 'right'
TextAlign.Justify   // 'justify'

// HTML elements
TextElement.Paragraph // 'p' (default)
TextElement.Span      // 'span'
TextElement.Div       // 'div'
TextElement.Heading1  // 'h1'
TextElement.Heading2  // 'h2'
TextElement.Heading3  // 'h3'
TextElement.Heading4  // 'h4'
TextElement.Heading5  // 'h5'
TextElement.Heading6  // 'h6'

// Usage examples
<Text 
  as={TextElement.Heading1}
  size={TextSize.ExtraLarge4}
  weight={TextWeight.Bold}
  color={TextColor.Primary}
  align={TextAlign.Center}
>
  Main Title
</Text>

<Text 
  size={TextSize.Base}
  color={TextColor.Secondary}
  lineHeight="relaxed"
>
  Body text with relaxed line height
</Text>
```

### Input

```tsx
import { Input, ComponentSize } from '@your-ui-lib';

// Input sizes (uses ComponentSize)
ComponentSize.Small   // 'sm'
ComponentSize.Medium  // 'md' (default)
ComponentSize.Large   // 'lg'

// Usage examples
<Input
  label="Email Address"
  type="email"
  size={ComponentSize.Large}
  placeholder="Enter your email"
  helperText="We'll never share your email"
  leftIcon={<EmailIcon />}
/>

<Input
  label="Password"
  type="password"
  size={ComponentSize.Medium}
  error={hasError}
  helperText={hasError ? "Password is required" : "Min 8 characters"}
/>
```

## Layout Contracts

### Flex Layout

```tsx
import { 
  Flex, 
  FlexItem,
  FlexDirection,
  FlexJustify,
  FlexAlign 
} from '@your-ui-lib';

// Flex direction
FlexDirection.Row           // 'row' (default)
FlexDirection.RowReverse    // 'row-reverse'
FlexDirection.Column        // 'column'
FlexDirection.ColumnReverse // 'column-reverse'

// Flex justify (main axis)
FlexJustify.Start        // 'start'
FlexJustify.Center       // 'center'
FlexJustify.End          // 'end'
FlexJustify.SpaceBetween // 'between'
FlexJustify.SpaceAround  // 'around'
FlexJustify.SpaceEvenly  // 'evenly'

// Flex align (cross axis)
FlexAlign.Start    // 'start'
FlexAlign.Center   // 'center'
FlexAlign.End      // 'end'
FlexAlign.Stretch  // 'stretch'
FlexAlign.Baseline // 'baseline'

// Usage examples
<Flex 
  direction={FlexDirection.Column}
  justify={FlexJustify.SpaceBetween}
  align={FlexAlign.Center}
  gap={Spacing.Large}
>
  <FlexItem flex="1">Takes remaining space</FlexItem>
  <FlexItem>Fixed size</FlexItem>
  <FlexItem alignSelf={FlexAlign.End}>Aligned to end</FlexItem>
</Flex>
```

### Spacing System

```tsx
import { Spacing } from '@your-ui-lib';

// Spacing scale
Spacing.ExtraSmall  // 'xs' - 4px
Spacing.Small       // 'sm' - 8px
Spacing.Medium      // 'md' - 16px (base unit)
Spacing.Large       // 'lg' - 24px
Spacing.ExtraLarge  // 'xl' - 32px
Spacing.ExtraLarge2 // '2xl' - 48px
Spacing.ExtraLarge3 // '3xl' - 64px
Spacing.ExtraLarge4 // '4xl' - 96px

// Usage in Box component
<Box 
  p={Spacing.Large}
  m={Spacing.Medium}
  gap={Spacing.Small}
>
  Content
</Box>
```

## Import Patterns

### Individual Imports

```tsx
import { 
  Button, 
  ButtonVariant, 
  ComponentSize 
} from '@your-ui-lib';
```

### Consolidated Contracts

```tsx
import { 
  Button,
  Contracts 
} from '@your-ui-lib';

// Use via Contracts object
<Button 
  variant={Contracts.ButtonVariant.Primary}
  size={Contracts.ComponentSize.Large}
>
  Button
</Button>
```

### Component Options (for discovery)

```tsx
import { ComponentOptions } from '@your-ui-lib';

// Discover all available options
const buttonVariants = ComponentOptions.Button.variants;
// ['primary', 'secondary', 'outline', 'ghost']

const textSizes = ComponentOptions.Text.sizes;
// ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl']
```

## TypeScript Integration

### Type Guards

```tsx
import { ButtonVariant } from '@your-ui-lib';

function isPrimaryVariant(variant: string): variant is typeof ButtonVariant.Primary {
  return variant === ButtonVariant.Primary;
}
```

### Configuration Objects

```tsx
import { ButtonVariant, ComponentSize, CardVariant, CardPadding } from '@your-ui-lib';

// Define reusable configurations
const UI_CONFIG = {
  primaryButton: {
    variant: ButtonVariant.Primary,
    size: ComponentSize.Large
  },
  card: {
    variant: CardVariant.Elevated,
    padding: CardPadding.Large,
    hoverable: true
  }
} as const;

// Use in components
<Card {...UI_CONFIG.card}>
  <Button {...UI_CONFIG.primaryButton}>
    Action
  </Button>
</Card>
```

### Theme Integration

```tsx
import { useTheme, ButtonVariant } from '@your-ui-lib';

function ThemedComponent() {
  const { updateTheme } = useTheme();
  
  const applyCustomTheme = () => {
    updateTheme({
      components: {
        button: {
          colors: {
            primary: {
              background: '#ff6b35'
            }
          }
        }
      }
    });
  };
  
  return (
    <Button 
      variant={ButtonVariant.Primary}
      onClick={applyCustomTheme}
    >
      Apply Theme
    </Button>
  );
}
```

## Advanced Usage

### Custom Variants

You can extend the type system for custom components:

```tsx
// Define custom variants
export const CustomVariant = {
  Special: 'special',
  Featured: 'featured'
} as const;

export type CustomVariant = typeof CustomVariant[keyof typeof CustomVariant];

// Use in component props
interface MyComponentProps {
  variant?: CustomVariant | ComponentVariant;
}
```

### Runtime Option Discovery

```tsx
import { ComponentOptions } from '@your-ui-lib';

function DynamicButtonGrid() {
  return (
    <div>
      {ComponentOptions.Button.variants.map(variant => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}
```

### Conditional Rendering

```tsx
import { ButtonVariant, ComponentSize } from '@your-ui-lib';

interface ConditionalButtonProps {
  isPrimary: boolean;
  isLarge: boolean;
}

function ConditionalButton({ isPrimary, isLarge }: ConditionalButtonProps) {
  return (
    <Button
      variant={isPrimary ? ButtonVariant.Primary : ButtonVariant.Secondary}
      size={isLarge ? ComponentSize.Large : ComponentSize.Medium}
    >
      Conditional Button
    </Button>
  );
}
```

## Migration Guide

### From String Literals

```tsx
// Before
<Button variant="primary" size="lg">Button</Button>

// After (gradual migration possible)
<Button variant={ButtonVariant.Primary} size="lg">Button</Button>

// After (full migration)
<Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
  Button
</Button>
```

### Backwards Compatibility

All components still accept string literals, so migration can be gradual:

```tsx
// All of these work:
<Button variant="primary" />
<Button variant={ButtonVariant.Primary} />
<Button variant={Contracts.ButtonVariant.Primary} />
```

## Best Practices

1. **Use constants for reusable configurations**
2. **Prefer type-safe contracts for new code**
3. **Migrate gradually from string literals**
4. **Use ComponentOptions for discovery**
5. **Leverage IntelliSense for documentation**
6. **Create custom type guards for complex logic**
7. **Use the Contracts object for namespace organization**

This type contract system provides the same benefits as C# interfaces while maintaining the flexibility and ease of use that React developers expect.
