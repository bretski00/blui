# Components

This directory contains documentation for all BLUI components. Each component is automatically documented from JSDoc comments in the source code.

## Available Components

### [Badge](./Badge.md)

Props for the Badge component

**Source:** [`./packages/blui-core/src/components/Badge.tsx`](../../packages/blui-core/src/components/Badge.tsx)  
**Since:** v1.0.0

### [Box](./Box.md)

Props for the Box component

**Source:** [`./packages/blui-core/src/components/Box.tsx`](../../packages/blui-core/src/components/Box.tsx)  
**Since:** v1.0.0

### [Button](./Button.md)

Props for the Button component

**Source:** [`./packages/blui-core/src/components/Button.tsx`](../../packages/blui-core/src/components/Button.tsx)  
**Since:** v1.0.0

### [Card](./Card.md)

Props for the Card component

**Source:** [`./packages/blui-core/src/components/Card.tsx`](../../packages/blui-core/src/components/Card.tsx)  
**Since:** v1.0.0

### [Input](./Input.md)

Props for the Input component

**Source:** [`./packages/blui-core/src/components/Input.tsx`](../../packages/blui-core/src/components/Input.tsx)  
**Since:** v1.0.0

### [Navbar](./Navbar.md)

Props for the Navbar component

**Source:** [`./packages/blui-core/src/components/Navbar.tsx`](../../packages/blui-core/src/components/Navbar.tsx)  
**Since:** v1.0.0

### [Text](./Text.md)

Props for the Text component

**Source:** [`./packages/blui-core/src/components/Text.tsx`](../../packages/blui-core/src/components/Text.tsx)  
**Since:** v1.0.0



## Component Categories

### Layout Components
- [Box](./Box.md) - Props for the Box component

### UI Components  
- [Badge](./Badge.md) - Props for the Badge component
- [Button](./Button.md) - Props for the Button component
- [Card](./Card.md) - Props for the Card component
- [Input](./Input.md) - Props for the Input component
- [Text](./Text.md) - Props for the Text component

### Navigation Components
- [Navbar](./Navbar.md) - Props for the Navbar component

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
