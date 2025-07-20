/**
 * Documentation content loader
 * This module contains the documentation content from the docs folder
 * In a real implementation, this could be generated at build time
 */

export const docsContent = {
  main: `# BLUI Documentation

Welcome to the BLUI component library documentation. This documentation is automatically generated from JSDoc comments in the source code.

## Components

For a complete list of all components with descriptions and examples, see the [Components Overview](./components/README.md).

## Architecture

- [Theme System](./themes/README.md) - Learn about the theming architecture
- [Layout System](./layouts/README.md) - Understand the layout provider system
- [Type Contracts](./contracts/README.md) - Type-safe component configuration
- [TypeScript Utilities](./types/README.md) - Advanced type utilities and patterns

## Getting Started

1. **Installation**: Add BLUI to your project
2. **Theme Setup**: Configure your theme provider
3. **Component Usage**: Start using components with type safety

### Installation

\`\`\`bash
npm install blui
\`\`\`

### Basic Usage

\`\`\`tsx
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
\`\`\`

### Type-Safe Configuration

\`\`\`tsx
// Use type contracts for better IntelliSense and safety
import { ButtonVariant, ComponentSize, TextSize } from 'blui/contracts';

// Or import from specific modules for better tree-shaking
import { ButtonVariant } from 'blui/contracts/variants';
import { ComponentSize } from 'blui/contracts/sizing';
import { TextSize } from 'blui/contracts/typography';
\`\`\`

## Development

This documentation is automatically generated from JSDoc comments. To update:

\`\`\`bash
npm run docs:generate
\`\`\`

---

*Documentation auto-generated from JSDoc comments. Last updated: 2025-07-20*`,

  components: `# Components Overview

BLUI provides a comprehensive set of React components with full TypeScript support and extensive theming capabilities.

## Available Components

### Badge
Status indicators and labels with customizable variants.

**Props:**
- \`variant\`: "default" | "primary" | "secondary" | "success" | "warning" | "error"
- \`children\`: ReactNode

**Example:**
\`\`\`tsx
<Badge variant="success">Ready</Badge>
\`\`\`

### Button
Interactive action triggers with multiple styling options.

**Props:**
- \`variant\`: "primary" | "secondary" | "outline" | "ghost"
- \`size\`: "sm" | "md" | "lg"
- \`disabled\`: boolean
- \`onClick\`: (event) => void

**Example:**
\`\`\`tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
\`\`\`

### Card
Content containers with flexible padding and styling options.

**Props:**
- \`padding\`: "sm" | "md" | "lg" | "xl"
- \`variant\`: "default" | "outlined" | "elevated"
- \`children\`: ReactNode

**Example:**
\`\`\`tsx
<Card padding="lg" variant="elevated">
  <Text>Card content</Text>
</Card>
\`\`\`

### Input
Form input components with validation and theming support.

**Props:**
- \`type\`: "text" | "email" | "password" | "number"
- \`placeholder\`: string
- \`value\`: string
- \`onChange\`: (event) => void
- \`disabled\`: boolean

**Example:**
\`\`\`tsx
<Input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
\`\`\`

### Text
Typography component with comprehensive styling and semantic elements.

**Props:**
- \`as\`: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
- \`size\`: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"
- \`weight\`: "light" | "normal" | "medium" | "semibold" | "bold"
- \`color\`: "primary" | "secondary" | "success" | "warning" | "error"

**Example:**
\`\`\`tsx
<Text as="h1" size="3xl" weight="bold" color="primary">
  Heading
</Text>
\`\`\`

### Box
Layout building blocks for creating flexible layouts.

**Props:**
- \`as\`: HTML element type
- \`children\`: ReactNode
- Standard HTML attributes

**Example:**
\`\`\`tsx
<Box as="section" style={{ padding: '16px' }}>
  Content
</Box>
\`\`\`

### Navbar
Navigation components with responsive behavior.

**Props:**
- \`children\`: ReactNode
- \`variant\`: "default" | "transparent"

**Example:**
\`\`\`tsx
<Navbar>
  <NavItem href="/">Home</NavItem>
  <NavItem href="/about">About</NavItem>
</Navbar>
\`\`\``
};
