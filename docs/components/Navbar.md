# Navbar

Props for the Navbar component. Extends standard HTML nav attributes with a headless design pattern for maximum flexibility and theming capabilities.

## Installation

```tsx
import { Navbar } from 'blui';
```

## Basic Usage

```tsx
<Navbar>
  Content
</Navbar>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `brand` | `ReactNode` | ❌ | Props for the Navbar component. Extends standard HTML nav attributes with a headless design pattern for maximum flexibility and theming capabilities. |
| `navigation` | `ReactNode` | ❌ | Content to display in the main navigation section (center) |
| `actions` | `ReactNode` | ❌ | Content to display in the actions section (right side) |
| `children` | `ReactNode` | ❌ | Optional children to completely override the default layout |
| `sticky` | `boolean` | ❌ | Whether to use sticky positioning |
| `theme` | `Partial<NavbarTheme>` | ❌ | Custom theme overrides for this instance |

## Source

[`/src/components/Navbar.tsx`](../src/components/Navbar.tsx)

---

*Generated automatically from JSDoc comments. Last updated: 2025-07-20*
