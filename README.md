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

- **Extensible Theme System** - Customize every aspect of component styling
- **Layout Provider** - Spatial configuration for different layout contexts
- **Responsive Design** - Built-in breakpoint system
- **TypeScript Support** - Full type safety and IntelliSense
- **Type Contracts** - Consistent, type-safe component APIs
- **Runtime Updates** - Dynamic theme and layout changes

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build library
npm run build

# Generate documentation
npm run docs:generate
```