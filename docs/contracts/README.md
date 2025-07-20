# Type Contracts

BLUI provides a comprehensive type contract system that ensures type safety and consistency across all components. The contracts are organized into logical modules for better maintainability and tree-shaking.

## Overview

The type contracts system provides:
- **Type-safe constants** for component variants, sizes, and options
- **Modular organization** with focused, single-responsibility files
- **Full TypeScript support** with IntelliSense and autocomplete
- **Backward compatibility** through re-exports and legacy objects

## Architecture

```
contracts/
├── index.ts          # Main exports and legacy Contracts object
├── variants.ts       # Component and specific variant definitions
├── sizing.ts         # Size and spacing definitions
├── typography.ts     # Text-related constants
├── layout.ts         # Flex layout constants
├── common.ts         # Common type unions
└── options.ts        # IntelliSense-friendly component options
```

## Usage Patterns

### Basic Usage (Recommended)

```tsx
import { ButtonVariant, ComponentSize, TextSize } from 'blui/contracts';

<Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
  Click me
</Button>

<Text size={TextSize.ExtraLarge}>
  Large text
</Text>
```

### Modular Imports (Advanced)

```tsx
// Import from specific modules for better tree-shaking
import { ButtonVariant, CardVariant } from 'blui/contracts/variants';
import { TextSize, TextWeight } from 'blui/contracts/typography';
import { FlexDirection } from 'blui/contracts/layout';
```

### Legacy Contracts Object

```tsx
// Still supported for backward compatibility
import { Contracts } from 'blui/contracts';

<Button variant={Contracts.ButtonVariant.Primary}>
  Legacy style
</Button>
```

## Type Safety Features

### Compile-Time Validation

```tsx
// TypeScript will catch invalid values
<Button variant="invalid-variant" /> // Error: Type '"invalid-variant"' is not assignable
<Button variant={ButtonVariant.Primary} /> // Valid
```

### IntelliSense Support

```tsx
import { ComponentOptions } from 'blui/contracts';

// Get all available options with autocomplete
const buttonVariants = ComponentOptions.Button.variants; // ['primary', 'secondary', 'outline', 'ghost']
const cardPadding = ComponentOptions.Card.padding; // ['none', 'sm', 'md', 'lg']
```

## Contract Categories

### Component Variants

Define the visual appearance styles for components:

```tsx
import { ComponentVariant, ButtonVariant, CardVariant } from 'blui/contracts/variants';

// Generic component variants
ComponentVariant.Primary    // 'primary'
ComponentVariant.Secondary  // 'secondary'
ComponentVariant.Success    // 'success'
ComponentVariant.Warning    // 'warning'
ComponentVariant.Error      // 'error'
ComponentVariant.Info       // 'info'

// Button-specific variants
ButtonVariant.Primary    // 'primary'
ButtonVariant.Secondary  // 'secondary'
ButtonVariant.Outline    // 'outline'
ButtonVariant.Ghost      // 'ghost'

// Card-specific variants
CardVariant.Elevated  // 'elevated'
CardVariant.Outlined  // 'outlined'
CardVariant.Filled    // 'filled'
```

### Sizing and Spacing

Consistent sizing across all components:

```tsx
import { ComponentSize, CardPadding, Spacing } from 'blui/contracts/sizing';

// Component sizes
ComponentSize.Small   // 'sm'
ComponentSize.Medium  // 'md'
ComponentSize.Large   // 'lg'

// Card padding options
CardPadding.None    // 'none'
CardPadding.Small   // 'sm'
CardPadding.Medium  // 'md'
CardPadding.Large   // 'lg'

// Spacing scale
Spacing.ExtraSmall   // 'xs'  (4px)
Spacing.Small        // 'sm'  (8px)
Spacing.Medium       // 'md'  (16px)
Spacing.Large        // 'lg'  (24px)
Spacing.ExtraLarge   // 'xl'  (32px)
Spacing.ExtraLarge2  // '2xl' (48px)
Spacing.ExtraLarge3  // '3xl' (64px)
Spacing.ExtraLarge4  // '4xl' (96px)
```

### Typography

Text styling and semantic elements:

```tsx
import { TextSize, TextWeight, TextColor, TextAlign, TextElement } from 'blui/contracts/typography';

// Text sizes
TextSize.ExtraSmall   // 'xs'   (12px)
TextSize.Small        // 'sm'   (14px)
TextSize.Base         // 'base' (16px)
TextSize.Large        // 'lg'   (18px)
TextSize.ExtraLarge   // 'xl'   (20px)
TextSize.ExtraLarge2  // '2xl'  (24px)
TextSize.ExtraLarge3  // '3xl'  (30px)
TextSize.ExtraLarge4  // '4xl'  (36px)

// Font weights
TextWeight.Light     // 'light'    (300)
TextWeight.Normal    // 'normal'   (400)
TextWeight.Medium    // 'medium'   (500)
TextWeight.SemiBold  // 'semibold' (600)
TextWeight.Bold      // 'bold'     (700)

// Text colors
TextColor.Primary    // 'primary'
TextColor.Secondary  // 'secondary'
TextColor.Success    // 'success'
TextColor.Error      // 'error'
TextColor.Inherit    // 'inherit'

// Text alignment
TextAlign.Left     // 'left'
TextAlign.Center   // 'center'
TextAlign.Right    // 'right'
TextAlign.Justify  // 'justify'

// HTML elements
TextElement.Paragraph // 'p'
TextElement.Span      // 'span'
TextElement.Heading1  // 'h1'
TextElement.Heading2  // 'h2'
// ... h3, h4, h5, h6, div
```

### Layout System

Flex layout utilities:

```tsx
import { FlexDirection, FlexJustify, FlexAlign } from 'blui/contracts/layout';

// Flex direction
FlexDirection.Row           // 'row'
FlexDirection.Column        // 'column'
FlexDirection.RowReverse    // 'row-reverse'
FlexDirection.ColumnReverse // 'column-reverse'

// Justify content
FlexJustify.Start        // 'start'
FlexJustify.Center       // 'center'
FlexJustify.End          // 'end'
FlexJustify.SpaceBetween // 'between'
FlexJustify.SpaceAround  // 'around'
FlexJustify.SpaceEvenly  // 'evenly'

// Align items
FlexAlign.Start     // 'start'
FlexAlign.Center    // 'center'
FlexAlign.End       // 'end'
FlexAlign.Stretch   // 'stretch'
FlexAlign.Baseline  // 'baseline'
```

## Migration Guide

### From Previous Versions

If you were using the old single-file contracts:

```tsx
// Old way (still works)
import { ButtonVariant, ComponentSize } from 'blui/contracts';

// New modular way (optional, better for tree-shaking)
import { ButtonVariant } from 'blui/contracts/variants';
import { ComponentSize } from 'blui/contracts/sizing';
```

All existing imports continue to work exactly as before. The new modular structure is optional and provides benefits for advanced use cases.

### Type System Integration

For advanced TypeScript usage, see the [Types documentation](../types/README.md) which provides additional utilities and helpers that build on these contracts.

## Best Practices

1. **Use constants over strings**: Always prefer `ButtonVariant.Primary` over `"primary"`
2. **Import what you need**: Use modular imports for better tree-shaking when possible
3. **Leverage IntelliSense**: Use `ComponentOptions` for discovering available values
4. **Stay consistent**: Use the same patterns across your application
5. **Type safety first**: Let TypeScript catch invalid configurations at compile time

## Related Documentation

- [Theme System](../themes/README.md) - How contracts integrate with theming
- [Components](../components/README.md) - Component usage with contracts
- [Types](../types/README.md) - Advanced TypeScript utilities
