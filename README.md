# BLUI - React Component Library

A React-based UI framework with a powerful, extensible theme system that allows developers to customize every aspect of the design while maintaining consistency across components.

## 🚀 Quick Start

```bash
npm install blui
```

```tsx
import { ThemeProvider, Button, Card, Text } from 'blui';

function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Text as="h1" size="2xl" weight="bold">
          Welcome to BLUI
        </Text>
        <Button variant="primary" size="lg">
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
- [Complete Documentation](./docs/README.md)

## ✨ Features

- 🎨 **Extensible Theme System** - Customize every aspect of component styling
- 🔧 **Layout Provider** - Spatial configuration for different layout contexts
- 📱 **Responsive Design** - Built-in breakpoint system
- 💪 **TypeScript Support** - Full type safety and IntelliSense
- 🎯 **Type Contracts** - Consistent, type-safe component APIs
- 🔄 **Runtime Updates** - Dynamic theme and layout changes

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
