# Button

Props for the Button component. Extends standard HTML button attributes with theme-aware styling options. The Button component provides a consistent, accessible, and themeable button implementation with multiple variants, sizes, and states.

## Installation

```tsx
import { Button } from 'blui';
```

## Basic Usage

```tsx
<Button>
  Content
</Button>
```

## Examples

### Example 1

```tsx
// Basic usage with type-safe variants
import { Button, ButtonVariant, ComponentSize } from '
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `ButtonVariant | 'primary' | 'secondary' | 'outline' | 'ghost'` | ❌ | Props for the Button component. Extends standard HTML button attributes with theme-aware styling options. The Button component provides a consistent, accessible, and themeable button implementation with multiple variants, sizes, and states. |
| `size` | `ComponentSize | 'sm' | 'md' | 'lg'` | ❌ | Size of the button that affects padding, font size, and overall dimensions. - `sm`: Small button for compact layouts - `md`: Medium button for standard use (default) - `lg`: Large button for prominent actions |
| `isLoading` | `boolean` | ❌ | Shows loading state with disabled interaction and optional loading indicator. When true, the button becomes non-interactive and can display a loading spinner. |
| `leftIcon` | `React.ReactNode` | ❌ | Icon or element to display on the left side of the button text. Automatically handles spacing and alignment with the button content. |
| `rightIcon` | `React.ReactNode` | ❌ | Icon or element to display on the right side of the button text. Commonly used for dropdown indicators or action confirmations. |

## Source

[`./packages/blui-core/src/components/Button.tsx`](../../packages/blui-core/src/components/Button.tsx)

---

*Generated automatically from JSDoc comments. Last updated: 2025-07-20*
