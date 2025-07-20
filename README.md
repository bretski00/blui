# BLUI - React Component Library

A React-bas- **TypeScript Support** - Full type safety and IntelliSense
- **Modular Type System** - Organized contracts and advanced TypeScript utilities
- **Runtime Updates** - Dynamic theme and layout changesUI framework with a powerful, extensible theme system that allows developers to customize every aspect of the design while maintaining consistency across components.

## 🚀 Quick Start

```bash
npm install blui
```

```tsx
import { ThemeProvider, Button, Card, Text, ButtonVariant, ComponentSize, TextSize, TextWeight } from 'blui';

function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Text as="h1" size={TextSize.ExtraLarge2} weight={TextWeight.Bold}>
          Welcome to BLUI
        </Text>
        <Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

## 📚 Documentation

### Components
- [All Components](./docs/components/README.md) - Complete component library reference
- [Individual Component Docs](./docs/components/) - Detailed documentation for each component

### Architecture
- [Theme System](./docs/themes/README.md)
- [Layout System](./docs/layouts/README.md)
- [Type Contracts](./docs/contracts/README.md) - Type-safe component constants and enums
- [TypeScript Utilities](./docs/types/README.md) - Advanced type utilities and patterns
- [Complete Documentation](./docs/README.md)

## ✨ Features

- **Extensible Theme System** - Customize every aspect of component styling
- **Layout Provider** - Spatial configuration for different layout contexts
- **Responsive Design** - Built-in breakpoint system
- **TypeScript Support** - Full type safety and IntelliSense
- **Type Contracts** - Consistent, type-safe component APIs
- **Runtime Updates** - Dynamic theme and layout changes

## 🛠️ Development

### Initial Setup

```bash
# Install all dependencies for the monorepo
npm run install:all

# Start development with documentation app
npm run dev
```

### Other Commands

```bash
# Build library
npm run build

# Generate documentation
npm run docs:generate
```

### Contributing

For detailed information on contributing to BLUI, including adding new components and following our development standards, please see our [Contributing Guide](./CONTRIBUTING.md).
