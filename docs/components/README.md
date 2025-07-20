# Components

This directory contains documentation for all BLUI components. Each component is automatically documented from JSDoc comments in the source code.

## Available Components

### [Badge](./Badge.md)

Props for the Badge component

**Source:** [`/src/components/Badge.tsx`](../src/components/Badge.tsx)  
**Since:** v1.0.0

### [Box](./Box.md) ⚠️ *Needs Documentation*

Box component (documentation pending)

**Source:** [`/src/components/Box.tsx`](../src/components/Box.tsx)  
**Since:** v1.0.0

### [Button](./Button.md)

Props for the Button component

**Source:** [`/src/components/Button.tsx`](../src/components/Button.tsx)  
**Since:** v1.0.0

### [Card](./Card.md)

Props for the Card component

**Source:** [`/src/components/Card.tsx`](../src/components/Card.tsx)  
**Since:** v1.0.0

### [Input](./Input.md)

Props for the Input component

**Source:** [`/src/components/Input.tsx`](../src/components/Input.tsx)  
**Since:** v1.0.0

### [Navbar](./Navbar.md) ⚠️ *Needs Documentation*

Navbar component (documentation pending)

**Source:** [`/src/components/Navbar.tsx`](../src/components/Navbar.tsx)  
**Since:** v1.0.0

### [Text](./Text.md)

Props for the Text component

**Source:** [`/src/components/Text.tsx`](../src/components/Text.tsx)  
**Since:** v1.0.0



## Component Categories

### Layout Components
- [Box](./Box.md) ⚠️ - Box component (documentation pending)

### UI Components  
- [Badge](./Badge.md) - Props for the Badge component
- [Button](./Button.md) - Props for the Button component
- [Card](./Card.md) - Props for the Card component
- [Input](./Input.md) - Props for the Input component
- [Text](./Text.md) - Props for the Text component

### Navigation Components
- [Navbar](./Navbar.md) ⚠️ - Navbar component (documentation pending)

## Documentation Status

📚 **Fully Documented:** 5 components  
⚠️ **Needs Documentation:** 2 components

Components marked with ⚠️ need JSDoc comments to generate complete documentation.

## Usage Patterns

All components follow consistent patterns:

```tsx
import { ComponentName } from 'blui';

function MyComponent() {
  return (
    <ComponentName prop="value">
      Content
    </ComponentName>
  );
}
```

## Contributing

When adding new components:
1. Add comprehensive JSDoc comments to your component
2. Include `@example` tags with usage examples
3. Document all props with descriptions
4. Run `npm run docs:generate` to update documentation

---

*Generated automatically on 2025-07-20*
