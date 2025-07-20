# Text

Props for the Text component. Extends standard HTML element attributes with comprehensive typography options. The Text component provides a flexible, semantic, and theme-aware way to render text content with consistent styling across the application.

## Installation

```tsx
import { Text } from 'blui';
```

## Basic Usage

```tsx
<Text>
  Content
</Text>
```

## Examples

### Example 1

```tsx
// Basic usage with type-safe options
import { Text, TextSize, TextWeight, TextColor } from '
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `as` | `TextElement | 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'` | ❌ | Props for the Text component. Extends standard HTML element attributes with comprehensive typography options. The Text component provides a flexible, semantic, and theme-aware way to render text content with consistent styling across the application. |
| `size` | `TextSize | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'` | ❌ | Font size following the design system's typographic scale. - `xs`: Extra small (12px) - for fine print and captions - `sm`: Small (14px) - for secondary information - `base`: Base size (16px) - for body text (default) - `lg`: Large (18px) - for emphasized body text - `xl`-`4xl`: Extra large sizes (20px-36px) - for headings |
| `weight` | `TextWeight | 'light' | 'normal' | 'medium' | 'semibold' | 'bold'` | ❌ | Font weight for emphasis and hierarchy. - `light`: Light weight (300) - for subtle text - `normal`: Normal weight (400) - for body text (default) - `medium`: Medium weight (500) - for slight emphasis - `semibold`: Semi-bold weight (600) - for sub-headings - `bold`: Bold weight (700) - for headings and strong emphasis |
| `color` | `TextColor | 'primary' | 'secondary' | 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'inherit'` | ❌ | Text color for semantic meaning and visual hierarchy. - `primary`: Highest contrast text for main content - `secondary`: Medium contrast text for secondary content - `disabled`: Low contrast text for disabled states - `success`/`warning`/`error`/`info`: Semantic colors for feedback - `inherit`: Inherits color from parent element |
| `align` | `TextAlign | 'left' | 'center' | 'right' | 'justify'` | ❌ | Text alignment within its container. - `left`: Left-aligned text (default) - `center`: Center-aligned text - `right`: Right-aligned text - `justify`: Justified text with even edges |
| `lineHeight` | `'tight' | 'normal' | 'relaxed'` | ❌ | Line height for text readability and vertical rhythm. - `tight`: Compact line height (1.25) - for headings - `normal`: Standard line height (1.5) - for body text (default) - `relaxed`: Spacious line height (1.75) - for long-form content |
| `fontFamily` | `'primary' | 'secondary' | 'mono'` | ❌ | Font family from the design system's typography scale. - `primary`: Primary font family for body text (default) - `secondary`: Secondary font family for headings - `mono`: Monospace font family for code |
| `truncate` | `boolean` | ❌ | Enable text truncation with ellipsis for overflow content. When true, text that exceeds the container width will be cut off and display an ellipsis (...). Requires a fixed width container. |

## Source

[`/src/components/Text.tsx`](../src/components/Text.tsx)

---

*Generated automatically from JSDoc comments. Last updated: 2025-07-20*
