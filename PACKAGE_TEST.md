# BLUI Package Test

To test the package locally before publishing:

## 1. Pack the library
```bash
npm pack
```

## 2. Test in a separate project
```bash
# Create a test React project
npx create-react-app test-blui --template typescript
cd test-blui

# Install the local package
npm install ../blui/blui-1.0.0.tgz

# Add peer dependencies
npm install react@^18.0.0 react-dom@^18.0.0
```

## 3. Test basic usage
Create a test component in src/App.tsx:

```tsx
import React from 'react';
import { 
  ThemeProvider, 
  Button, 
  Badge, 
  Text,
  ButtonVariant,
  ComponentVariant,
  ComponentSize 
} from 'blui';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px' }}>
        <Text size="xl">BLUI Library Test</Text>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
            Primary Button
          </Button>
          <Badge variant={ComponentVariant.Success}>
            Success Badge
          </Badge>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## 4. Publishing to npm

When ready to publish:

```bash
# Login to npm (if not already logged in)
npm login

# Publish the package
npm publish
```

## Package Contents

The published package includes:
- ✅ Core components (Button, Badge, Card, Text, Input, etc.)
- ✅ Theme system with type safety
- ✅ Layout components (Flex, Grid, Box)
- ✅ Type contracts and builders
- ✅ TypeScript declarations
- ✅ Source maps for debugging
- ❌ Demo pages and examples (excluded)
- ❌ Test files (excluded)
- ❌ Development configuration files (excluded)

## File Structure in Package

```
dist/
├── blui.js              # ES module build
├── blui.umd.js          # UMD build for browser
├── index.d.ts           # Main type declarations
├── components/          # Component type declarations
├── theme/               # Theme type declarations
├── layouts/             # Layout type declarations
├── contracts/           # Contract type declarations
└── types/               # Utility type declarations
```
