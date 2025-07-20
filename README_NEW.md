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
- [Badge](./docs/components/Badge.md)
- [Button](./docs/components/Button.md)
- [Card](./docs/components/Card.md)
- [Input](./docs/components/Input.md)
- [Text](./docs/components/Text.md)

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

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build library
npm run build

# Generate documentation
npm run docs:generate

# Watch documentation changes
npm run docs:watch

# Version management
npm run version patch    # 1.0.0 -> 1.0.1
npm run version minor    # 1.0.0 -> 1.1.0  
npm run version major    # 1.0.0 -> 2.0.0

# Generate changelog
npm run changelog:generate
```

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a complete list of changes in each version.

Version-specific changelogs are available in the [`changelogs/`](./changelogs/) directory.

## 📖 API Reference

For detailed API documentation, see [API_REFERENCE.md](./API_REFERENCE.md).

---

*Documentation auto-generated from JSDoc comments. Last updated: 2025-07-20*
