#!/usr/bin/env node

/**
 * Documentation Generation Script
 * 
 * This script automatically generates documentation by:
 * 1. Extracting JSDoc comments from component files
 * 2. Creating individual component documentation files
 * 3. Generating a comprehensive docs index
 * 4. Updating the root README with component links
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const SRC_DIR = join(ROOT_DIR, 'src');
const DOCS_DIR = join(ROOT_DIR, 'docs');
const COMPONENTS_DIR = join(SRC_DIR, 'components');

// Ensure docs directory exists
if (!existsSync(DOCS_DIR)) {
  mkdirSync(DOCS_DIR, { recursive: true });
}

// Ensure subdirectories exist
['components', 'themes', 'layouts'].forEach(subdir => {
  const dir = join(DOCS_DIR, subdir);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

/**
 * Extract JSDoc comments and component information from TypeScript files
 */
function extractComponentInfo(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const fileName = basename(filePath, '.tsx');
  
  // Skip test files
  if (fileName.includes('.test') || fileName.includes('.spec')) {
    return null;
  }

  // Extract main component interface JSDoc
  const interfaceMatch = content.match(/\/\*\*([\s\S]*?)\*\/\s*export interface (\w+Props)/);
  const componentMatch = content.match(/\/\*\*([\s\S]*?)\*\/\s*export const (\w+) = forwardRef/);
  
  if (!interfaceMatch && !componentMatch) {
    return null;
  }

  // Extract component name
  const componentName = interfaceMatch ? interfaceMatch[2].replace('Props', '') : componentMatch[2];
  
  // Extract main JSDoc comment
  const mainJSDoc = interfaceMatch ? interfaceMatch[1] : componentMatch[1];
  
  // Extract interface props if available
  let propsInfo = [];
  if (interfaceMatch) {
    const interfaceContent = content.substring(content.indexOf(interfaceMatch[0]));
    const propsMatches = interfaceContent.matchAll(/\/\*\*([\s\S]*?)\*\/\s*(\w+)\??\s*:\s*([^;]+);/g);
    
    for (const propMatch of propsMatches) {
      const [, jsDoc, propName, propType] = propMatch;
      propsInfo.push({
        name: propName,
        type: propType.trim(),
        description: jsDoc.trim(),
        optional: propMatch[0].includes('?:')
      });
    }
  }

  // Extract examples from JSDoc
  const exampleMatches = [...mainJSDoc.matchAll(/@example\s*([\s\S]*?)(?=@|\*\/|$)/g)];
  const examples = exampleMatches.map(match => 
    match[1]
      .replace(/\s*\*\s?/g, '\n')
      .replace(/```tsx\s*\n?/g, '')
      .replace(/```\s*\n?/g, '')
      .trim()
  );

  // Extract description
  const description = mainJSDoc
    .split('@')[0]
    .replace(/\s*\*\s?/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Extract @since version
  const sinceMatch = mainJSDoc.match(/@since\s+([\d.]+)/);
  const since = sinceMatch ? sinceMatch[1] : '1.0.0';

  return {
    name: componentName,
    fileName,
    description,
    since,
    examples,
    props: propsInfo,
    filePath: filePath.replace(ROOT_DIR, '').replace(/\\/g, '/')
  };
}

/**
 * Generate markdown documentation for a component
 */
function generateComponentMarkdown(componentInfo) {
  const { name, description, since, examples, props, filePath } = componentInfo;
  
  let markdown = `# ${name}

${description}

## Installation

\`\`\`tsx
import { ${name} } from 'blui';
\`\`\`

## Basic Usage

\`\`\`tsx
<${name}>
  Content
</${name}>
\`\`\`

`;

  // Add examples if available
  if (examples.length > 0) {
    markdown += `## Examples

`;
    examples.forEach((example, index) => {
      markdown += `### Example ${index + 1}

\`\`\`tsx
${example}
\`\`\`

`;
    });
  }

  // Add props table if available
  if (props.length > 0) {
    markdown += `## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
`;
    props.forEach(prop => {
      const required = prop.optional ? '❌' : '✅';
      const description = prop.description
        .replace(/\s*\*\s?/g, ' ')
        .replace(/\s+/g, ' ')
        .split('@')[0]
        .trim();
      
      markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${required} | ${description} |
`;
    });
    markdown += `
`;
  }

  // Add footer
  markdown += `## Source

[\`${filePath}\`](..${filePath})

---

*Generated automatically from JSDoc comments. Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return markdown;
}

/**
 * Generate the main docs index
 */
function generateDocsIndex(components) {
  const markdown = `# BLUI Documentation

Welcome to the BLUI component library documentation. This documentation is automatically generated from JSDoc comments in the source code.

## Components

${components.map(comp => `- [${comp.name}](./components/${comp.fileName}.md) - ${comp.description.split('.')[0]}`).join('\n')}

## Architecture

- [Theme System](./themes/README.md) - Learn about the theming architecture
- [Layout System](./layouts/README.md) - Understand the layout provider system
- [Type Contracts](./contracts/README.md) - Type-safe component configuration

## Getting Started

1. **Installation**: Add BLUI to your project
2. **Theme Setup**: Configure your theme provider
3. **Component Usage**: Start using components with type safety

## Development

This documentation is automatically generated from JSDoc comments. To update:

\`\`\`bash
npm run docs:generate
\`\`\`

---

*Generated automatically on ${new Date().toISOString().split('T')[0]}*
`;

  return markdown;
}

/**
 * Generate theme system documentation
 */
function generateThemeDocumentation() {
  const markdown = `# Theme System

The BLUI theme system provides a powerful and flexible way to customize the appearance of your components.

## Overview

The theme system consists of:
- **Theme Provider**: Central theme management
- **Component Themes**: Individual component styling
- **Theme Registry**: Runtime theme registration
- **CSS Variables**: Automatic custom property generation

## Basic Usage

\`\`\`tsx
import { ThemeProvider } from 'blui';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
\`\`\`

## Custom Themes

\`\`\`tsx
const customTheme = {
  colors: {
    primary: '#8b5cf6',
    secondary: '#ec4899',
  },
  components: {
    button: {
      colors: {
        primary: {
          background: '#8b5cf6',
          foreground: '#ffffff',
        }
      }
    }
  }
};
\`\`\`

## Advanced Features

- Runtime theme updates
- Component-specific theme overrides
- CSS variable generation
- TypeScript integration

---

*For more details, see the source code in \`src/theme/\`*
`;

  return markdown;
}

/**
 * Generate layout system documentation
 */
function generateLayoutDocumentation() {
  const markdown = `# Layout System

The BLUI layout system manages spatial relationships and layout-specific configurations.

## Overview

The layout system provides:
- **Layout Provider**: Context for layout themes
- **Layout Themes**: Spatial configuration per layout type
- **Flex Components**: Flexible layout primitives
- **Grid Components**: Grid-based layouts

## Basic Usage

\`\`\`tsx
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
\`\`\`

## Layout Themes

\`\`\`tsx
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
\`\`\`

## Components

- **Flex**: Flexible box layout
- **FlexItem**: Flex container children
- **Grid**: CSS Grid layout
- **Box**: Generic container

---

*For more details, see the source code in \`src/layouts/\`*
`;

  return markdown;
}

/**
 * Update the root README with component links
 */
function updateRootReadme(components) {
  const componentLinks = components
    .map(comp => `- [${comp.name}](./docs/components/${comp.fileName}.md)`)
    .join('\n');

  const newReadme = `# BLUI - React Component Library

A React-based UI framework with a powerful, extensible theme system that allows developers to customize every aspect of the design while maintaining consistency across components.

## 🚀 Quick Start

\`\`\`bash
npm install blui
\`\`\`

\`\`\`tsx
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
\`\`\`

## 📚 Documentation

### Components
${componentLinks}

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

\`\`\`bash
# Install dependencies
npm install

# Start development
npm run dev

# Build library
npm run build

# Generate documentation
npm run docs:generate
\`\`\`

## 📖 API Reference

For detailed API documentation, see [API_REFERENCE.md](./API_REFERENCE.md).

---

*Documentation auto-generated from JSDoc comments. Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return newReadme;
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Generating BLUI documentation...');
  
  // Get all component files
  const componentFiles = readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx') && !file.includes('.test'))
    .map(file => join(COMPONENTS_DIR, file))
    .filter(file => statSync(file).isFile());

  console.log(`📁 Found ${componentFiles.length} component files`);

  // Extract component information
  const components = componentFiles
    .map(extractComponentInfo)
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`📝 Extracted info for ${components.length} components`);

  // Generate individual component docs
  components.forEach(component => {
    const markdown = generateComponentMarkdown(component);
    const outputPath = join(DOCS_DIR, 'components', `${component.fileName}.md`);
    writeFileSync(outputPath, markdown);
    console.log(`  ✅ Generated docs for ${component.name}`);
  });

  // Generate main docs index
  const docsIndex = generateDocsIndex(components);
  writeFileSync(join(DOCS_DIR, 'README.md'), docsIndex);

  // Generate architecture docs
  writeFileSync(join(DOCS_DIR, 'themes', 'README.md'), generateThemeDocumentation());
  writeFileSync(join(DOCS_DIR, 'layouts', 'README.md'), generateLayoutDocumentation());

  // Update root README
  const newReadme = updateRootReadme(components);
  writeFileSync(join(ROOT_DIR, 'README.md'), newReadme);

  console.log('✨ Documentation generation complete!');
  console.log(`📚 Generated docs for ${components.length} components`);
  console.log(`📂 Documentation available in: docs/`);
}

main();
