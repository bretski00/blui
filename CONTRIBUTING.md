# Contributing to BLUI

Thank you for your interest in contributing to BLUI! This guide will help you get started with contributing to our React component library.

## 📋 Quick Reference

- [Adding a New Component](#adding-a-new-component)
- [Development Setup](#development-setup)
- [Documentation](#documentation)
- [Testing](#testing)
- [Release Process](#release-process)

## 🚀 Development Setup

BLUI is structured as a monorepo with the main library in `packages/blui-core/` and documentation app in `packages/blui-docs/`.

```bash
# Clone the repository
git clone https://github.com/bretski00/blui.git
cd blui

# Install all dependencies for the monorepo
npm run install:all

# Start development environment (runs documentation app)
npm run dev

# Watch documentation changes
npm run docs:watch
```

## 🧩 Adding a New Component

Follow this comprehensive checklist when contributing a new component:

### 1. Component Implementation
- [ ] Create component file: `packages/blui-core/src/components/YourComponent.tsx`
- [ ] Implement with proper TypeScript interfaces
- [ ] Use theme integration via `useTheme()` and `getComponentTheme()`
- [ ] Export from `packages/blui-core/src/components/index.ts`
- [ ] Follow existing component patterns and naming conventions

### 2. Theme Integration
- [ ] Create theme file: `packages/blui-core/src/components/YourComponent/theme.ts`
- [ ] Define component theme interface with proper TypeScript types
- [ ] Export default theme configuration
- [ ] Register theme in component file: `registerComponentTheme('yourComponent', defaultTheme)`
- [ ] Ensure theme follows existing color and sizing patterns

### 3. Type Contracts
- [ ] Add component-specific enums to `packages/blui-core/src/contracts/index.ts`
- [ ] Use existing contracts where applicable (`ComponentSize`, `ComponentVariant`, etc.)
- [ ] Ensure type safety throughout the component
- [ ] Add type exports to the main index file

### 4. Documentation (JSDoc)
- [ ] Add comprehensive JSDoc comments to component interface
- [ ] Include `@example` blocks with practical, realistic usage
- [ ] Document all props with descriptions, types, and default values
- [ ] Add `@since` version information
- [ ] Use proper markdown formatting in descriptions

### 5. Testing
- [ ] Create test file: `packages/blui-core/src/components/YourComponent.test.tsx`
- [ ] Test all variants and sizes
- [ ] Test theme integration and customization
- [ ] Test accessibility features (ARIA attributes, keyboard navigation)
- [ ] Test error states and edge cases

### 6. Examples & Integration
- [ ] Add usage example to `src/examples/CompleteUsageExamples.tsx`
- [ ] Demonstrate different variants and configurations
- [ ] Show integration with other BLUI components
- [ ] Include real-world usage scenarios

### 7. Build & Validation
```bash
# Generate documentation (creates component docs automatically)
npm run docs:generate

# Build and test
npm run build
npm run lint

# Verify documentation was generated correctly
# Check that docs/components/YourComponent.md exists and is complete
```

### 8. Version & Release 🚀
```bash
# For new features (minor version bump)
npm run version minor

# For bug fixes (patch version bump)  
npm run version patch

# This automatically:
# - Updates package.json version
# - Generates changelog with your changes
# - Creates git tag
# - Updates all documentation
```

## Component Template

Use this template as a starting point for new components:

```tsx
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { useTheme } from '../theme';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { defaultYourComponentTheme, type YourComponentTheme } from './YourComponent/theme';
import { ComponentSize, ComponentVariant } from '../contracts';

// Register the component theme
registerComponentTheme('yourComponent', defaultYourComponentTheme);

/**
 * YourComponent provides [brief description of what the component does].
 * 
 * This component is fully theme-aware and integrates seamlessly with the BLUI
 * design system. It supports multiple variants, sizes, and can be customized
 * through the theme system.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <YourComponent variant="primary" size="md">
 *   Content goes here
 * </YourComponent>
 * 
 * // With additional props
 * <YourComponent 
 *   variant="secondary" 
 *   size="lg"
 *   disabled={isLoading}
 *   onClick={handleClick}
 * >
 *   Click me
 * </YourComponent>
 * ```
 * 
 * @since 1.1.0
 */
export interface YourComponentProps extends HTMLAttributes<HTMLDivElement> {
  /** 
   * Visual variant of the component that determines its appearance.
   * 
   * - `primary`: Main action or emphasis (default)
   * - `secondary`: Secondary actions
   * - `outline`: Outlined style with transparent background
   * - `ghost`: Minimal style with no background
   * 
   * @default ComponentVariant.Primary
   */
  variant?: ComponentVariant;
  
  /** 
   * Size of the component affecting padding, font size, and dimensions.
   * 
   * - `sm`: Small size for compact layouts
   * - `md`: Medium size for standard use (default)
   * - `lg`: Large size for prominent placement
   * 
   * @default ComponentSize.Medium
   */
  size?: ComponentSize;
  
  /** 
   * Whether the component is in a disabled state.
   * When disabled, the component becomes non-interactive and visually muted.
   * 
   * @default false
   */
  disabled?: boolean;
}

/**
 * A themeable component that [describe the component's purpose].
 * 
 * Features:
 * - Multiple visual variants (primary, secondary, outline, ghost)
 * - Three size options (sm, md, lg)
 * - Full theme integration and customization
 * - Accessibility support
 * - TypeScript support with full type safety
 */
export const YourComponent = forwardRef<HTMLDivElement, YourComponentProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const componentTheme = getComponentTheme<YourComponentTheme>(theme, 'yourComponent');

    // Build styles from theme
    const variantStyles = componentTheme.variants[variant];
    const sizeStyles = componentTheme.sizes[size];

    const componentStyles: React.CSSProperties = {
      // Base styles
      borderRadius: componentTheme.borderRadius,
      transition: componentTheme.transition,
      
      // Variant styles
      backgroundColor: variantStyles.background,
      color: variantStyles.text,
      border: `1px solid ${variantStyles.border}`,
      
      // Size styles
      padding: sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      
      // State styles
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      
      // Merge with custom styles
      ...style,
    };

    return (
      <div
        ref={ref}
        className={className}
        style={componentStyles}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

YourComponent.displayName = 'YourComponent';
```

## 🎨 Theme Template

Create a theme file for your component:

```tsx
// packages/blui-core/src/components/YourComponent/theme.ts

export interface YourComponentTheme {
  /** Border radius for the component */
  borderRadius: string;
  /** Transition animation */
  transition: string;
  /** Visual variants */
  variants: {
    [key: string]: {
      background: string;
      text: string;
      border: string;
      backgroundHover?: string;
      backgroundActive?: string;
    };
  };
  /** Size variations */
  sizes: {
    [key: string]: {
      padding: string;
      fontSize: string;
      height?: string;
    };
  };
}

export const defaultYourComponentTheme: YourComponentTheme = {
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  variants: {
    primary: {
      background: '#3b82f6',
      text: '#ffffff',
      border: '#3b82f6',
      backgroundHover: '#2563eb',
      backgroundActive: '#1d4ed8',
    },
    secondary: {
      background: '#6b7280',
      text: '#ffffff',
      border: '#6b7280',
      backgroundHover: '#4b5563',
      backgroundActive: '#374151',
    },
    outline: {
      background: 'transparent',
      text: '#3b82f6',
      border: '#3b82f6',
      backgroundHover: '#eff6ff',
      backgroundActive: '#dbeafe',
    },
    ghost: {
      background: 'transparent',
      text: '#374151',
      border: 'transparent',
      backgroundHover: '#f3f4f6',
      backgroundActive: '#e5e7eb',
    },
  },
  sizes: {
    sm: {
      padding: '8px 12px',
      fontSize: '14px',
      height: '32px',
    },
    md: {
      padding: '12px 16px',
      fontSize: '16px',
      height: '40px',
    },
    lg: {
      padding: '16px 24px',
      fontSize: '18px',
      height: '48px',
    },
  },
};
```

## Documentation Standards

### JSDoc Best Practices

1. **Component Description**: Start with a clear, concise description
2. **Examples**: Include practical, working examples
3. **Props Documentation**: Document every prop with type, description, and default
4. **Version Information**: Add `@since` for new components

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `chore`: Build process, dependency updates

**Examples:**
```bash
feat(button): add loading state with spinner
fix(theme): resolve dark mode contrast issues
docs: update component API documentation
perf(layout): optimize grid rendering performance
```

**Breaking Changes:**
```bash
feat!: redesign theme API structure

BREAKING CHANGE: theme.colors.primary is now theme.palette.primary
```

## Testing Guidelines

### Component Testing
- Test all variants and sizes
- Test theme integration
- Test accessibility (ARIA attributes, keyboard navigation)
- Test error states and edge cases
- Test responsive behavior

### Example Test Structure
```tsx
import { render, screen } from '@testing-library/react';
import { YourComponent } from './YourComponent';
import { ThemeProvider } from '../theme';

describe('YourComponent', () => {
  it('renders with default props', () => {
    render(
      <ThemeProvider>
        <YourComponent>Test content</YourComponent>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    // Test variant styles
  });

  it('handles disabled state', () => {
    // Test disabled behavior
  });
});
```

## Automated Systems

BLUI includes several automated systems to help maintain quality:

### Documentation Generation
- Automatically generates component docs from JSDoc
- Updates on every build and release
- Watch mode available for development

### Changelog Generation
- Analyzes git commits using conventional commit format
- Categorizes changes by type (features, fixes, breaking changes)
- Generates version-specific changelogs

### CI/CD Integration
- Automatic releases on version tags
- Documentation updates on code changes
- NPM publishing automation

## Code Quality

### TypeScript Standards
- Use strict TypeScript configuration
- Provide comprehensive type definitions
- Use generic types for reusable components
- Export all public interfaces

### Performance Considerations
- Use `React.memo()` for expensive components
- Implement proper dependency arrays in hooks
- Minimize theme computations with `useMemo()`
- Consider bundle size impact

### Accessibility (a11y)
- Include proper ARIA attributes
- Support keyboard navigation
- Ensure adequate color contrast
- Test with screen readers

## Review Process

1. **Create Feature Branch**: `git checkout -b feat/your-component`
2. **Implement Component**: Follow the checklist above
3. **Generate Documentation**: `npm run docs:generate`
4. **Test Thoroughly**: Run tests and manual testing
5. **Create Pull Request**: Include description and testing notes
6. **Address Review Feedback**: Make requested changes
7. **Merge & Release**: Maintainers will handle versioning

## Getting Help

- **Documentation**: Check the [docs/](./docs/) directory
- **Examples**: See [src/examples/](./src/examples/)
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions for questions

## License

By contributing to BLUI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to BLUI! 🎉
