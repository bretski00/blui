# Input

Props for the Input component. Extends standard HTML input attributes with theme-aware styling options. The Input component provides a consistent, accessible, and feature-rich text input with validation states, icons, and helper text support.

## Installation

```tsx
import { Input } from 'blui';
```

## Basic Usage

```tsx
<Input>
  Content
</Input>
```

## Examples

### Example 1

```tsx
// Basic usage with type-safe size
import { Input, ComponentSize } from '
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `size` | `ComponentSize | 'sm' | 'md' | 'lg'` | ❌ | Props for the Input component. Extends standard HTML input attributes with theme-aware styling options. The Input component provides a consistent, accessible, and feature-rich text input with validation states, icons, and helper text support. |
| `error` | `boolean` | ❌ | Error state that changes the input's visual appearance to indicate validation issues. When true, the input will display error styling (red border, error colors) and should be paired with descriptive helperText. |
| `helperText` | `string` | ❌ | Descriptive text displayed below the input to provide additional context, validation feedback, or usage instructions. Color and styling automatically adapt based on the error state. |
| `label` | `string` | ❌ | Label text displayed above the input for accessibility and user guidance. Creates a proper label-input association for screen readers and enables click-to-focus behavior on the label. |
| `leftIcon` | `React.ReactNode` | ❌ | Icon or element displayed on the left side of the input field. Commonly used for contextual icons like search, user, or lock icons. Automatically handles spacing and alignment. |
| `rightIcon` | `React.ReactNode` | ❌ | Icon or element displayed on the right side of the input field. Often used for action buttons like clear, visibility toggle, or submit. Can be interactive elements that respond to user actions. |

## Source

[`./packages/blui-core/src/components/Input.tsx`](../../packages/blui-core/src/components/Input.tsx)

---

*Generated automatically from JSDoc comments. Last updated: 2025-07-20*
