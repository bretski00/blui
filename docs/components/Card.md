# Card

Props for the Card component. Extends standard HTML div attributes with theme-aware styling options. The Card component provides a flexible container with consistent styling, elevation, and responsive behavior across different variants.

## Installation

```tsx
import { Card } from 'blui';
```

## Basic Usage

```tsx
<Card>
  Content
</Card>
```

## Examples

### Example 1

```tsx
// Basic usage with type-safe variants
import { Card, CardVariant, CardPadding } from '
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `CardVariant | 'elevated' | 'outlined' | 'filled'` | ❌ | Props for the Card component. Extends standard HTML div attributes with theme-aware styling options. The Card component provides a flexible container with consistent styling, elevation, and responsive behavior across different variants. |
| `padding` | `CardPadding | 'sm' | 'md' | 'lg' | 'none'` | ❌ | Internal padding of the card content area. - `none`: No internal padding - `sm`: Small padding for compact content - `md`: Medium padding for standard content (default) - `lg`: Large padding for spacious layouts |
| `hoverable` | `boolean` | ❌ | Enables hover effects and interactive styling. When true, the card will respond to mouse hover with visual feedback such as elevation changes or color transitions. |

## Source

[`/src/components/Card.tsx`](../src/components/Card.tsx)

---

*Generated automatically from JSDoc comments. Last updated: 2025-07-20*
