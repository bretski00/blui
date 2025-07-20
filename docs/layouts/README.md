# Layout System

The BLUI layout system manages spatial relationships and layout-specific configurations.

## Overview

The layout system provides:
- **Layout Provider**: Context for layout themes
- **Layout Themes**: Spatial configuration per layout type
- **Flex Components**: Flexible layout primitives
- **Grid Components**: Grid-based layouts

## Basic Usage

```tsx
import { LayoutProvider, Flex, Grid } from 'blui';

function App() {
  return (
    <LayoutProvider layoutTheme={layoutConfig}>
      <Flex direction="column" gap="md">
        <YourContent />
      </Flex>
    </LayoutProvider>
  );
}
```

## Layout Themes

```tsx
const layoutConfig = {
  dashboard: {
    spacing: 24,
    columns: 12,
    gutters: 16
  },
  form: {
    spacing: 16,
    maxWidth: 600
  }
};
```

## Components

- **Flex**: Flexible box layout
- **FlexItem**: Flex container children
- **Grid**: CSS Grid layout
- **Box**: Generic container

---

*For more details, see the source code in `src/layouts/`*
