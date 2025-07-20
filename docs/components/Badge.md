# Badge

Props for the Badge component. Extends standard HTML span attributes with theme-aware styling options. The Badge component provides a compact way to display status, counts, or categorical information with consistent semantic coloring.

## Installation

```tsx
import { Badge } from 'blui';
```

## Basic Usage

```tsx
<Badge>
  Content
</Badge>
```

## Examples

### Example 1

```tsx
// Basic usage with type-safe variants
import { Badge, ComponentVariant, ComponentSize } from '
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'primary' | 'secondary' | 'success' | 'warning' | 'error'` | ❌ | Props for the Badge component. Extends standard HTML span attributes with theme-aware styling options. The Badge component provides a compact way to display status, counts, or categorical information with consistent semantic coloring. |
| `size` | `'sm' | 'md' | 'lg'` | ❌ | Size of the badge that affects padding, font size, and overall dimensions. - `sm`: Small badge for compact layouts and inline use - `md`: Medium badge for standard use (default) - `lg`: Large badge for prominent display |
| `outline` | `boolean` | ❌ | Whether to use outline style instead of filled background. When true, the badge will have a transparent background with a colored border and text instead of a filled appearance. |

## Source

[`/src/components/Badge.tsx`](../src/components/Badge.tsx)

---

*Generated automatically from JSDoc comments. Last updated: 2025-07-20*
