# BLUI Documentation & Changelog System

This document describes the automated documentation and changelog generation system for the BLUI React component library.

## 🎯 Overview

The system provides:
- **Auto-generated component documentation** from JSDoc comments
- **Version-specific changelogs** from git commits
- **Automated version management** with one command
- **CI/CD integration** for releases

## 📁 File Structure

```
blui/
├── docs/                           # Auto-generated documentation
│   ├── README.md                   # Main docs index
│   ├── components/                 # Component documentation
│   │   ├── Button.md
│   │   ├── Card.md
│   │   └── ...
│   ├── themes/                     # Architecture docs
│   │   └── README.md
│   └── layouts/
│       └── README.md
├── changelogs/                     # Version-specific changelogs
│   ├── TEMPLATE.md                 # Changelog writing guide
│   ├── v1.0.0.md                   # Version changelog
│   └── ...
├── scripts/                        # Automation scripts
│   ├── generate-docs.js            # Documentation generator
│   ├── generate-changelog.js       # Changelog generator
│   ├── version-bump.js             # Version management
│   └── watch-docs.js               # Development watcher
├── .github/workflows/              # CI/CD automation
│   ├── release.yml                 # Release automation
│   └── docs.yml                    # Doc auto-updates
├── CHANGELOG.md                    # Main changelog
└── README.md                       # Main project readme
```

## 🚀 Usage

### Development Workflow

```bash
# Start development with auto-updating docs
npm run docs:watch

# Generate documentation manually
npm run docs:generate

# Generate changelog manually  
npm run changelog:generate
```

### Release Workflow

```bash
# Bump version and generate everything
npm run version patch    # 1.0.0 -> 1.0.1
npm run version minor    # 1.0.0 -> 1.1.0
npm run version major    # 1.0.0 -> 2.0.0

# Or set specific version
npm run version 2.1.3

# Push release (triggers CI/CD)
git push origin main
git push origin v2.1.3
```

## 📝 Documentation Generation

### Component Documentation
- **Source**: JSDoc comments in component files
- **Output**: Individual markdown files in `docs/components/`
- **Includes**: Installation, usage, examples, props table, source links

### Architecture Documentation
- **Theme System**: Explains theming architecture
- **Layout System**: Documents layout provider system
- **Main Index**: Links to all documentation

### Auto-Generation Triggers
- Manual: `npm run docs:generate`
- Development: `npm run docs:watch` (file changes)
- Build: `npm run prepublishOnly`
- CI/CD: On code pushes (GitHub Actions)

## 📋 Changelog Generation

### Commit Analysis
- **Conventional Commits**: Recognizes feat, fix, docs, etc.
- **Breaking Changes**: Detects BREAKING CHANGE, `!` syntax
- **Categorization**: Groups changes by type
- **Git Integration**: Links to commits and comparisons

### Output Files
- **Version-Specific**: `changelogs/vX.Y.Z.md` (detailed)
- **Main Changelog**: `CHANGELOG.md` (summary of all versions)

### Auto-Generation Triggers
- Version Bump: `npm run version <type>`
- Manual: `npm run changelog:generate`
- Build: `npm run prepublishOnly`
- Release: GitHub Actions on git tags

## 🔄 Version Management

### Version Bump Process
1. Updates `package.json` version
2. Generates documentation
3. Generates changelog for new version
4. Creates git tag
5. Commits all changes

### Commands
```bash
npm run version patch    # Bug fixes (1.0.0 -> 1.0.1)
npm run version minor    # New features (1.0.0 -> 1.1.0)  
npm run version major    # Breaking changes (1.0.0 -> 2.0.0)
npm run version 1.2.3    # Specific version
```

## 🤖 CI/CD Integration

### Release Automation (`release.yml`)
- **Trigger**: Git tags (v*)
- **Process**: Build, test, generate docs/changelog, create GitHub release, publish to NPM
- **Requirements**: NPM_TOKEN secret

### Documentation Updates (`docs.yml`)
- **Trigger**: Pushes to main branch with component changes
- **Process**: Auto-generates and commits updated documentation
- **Benefit**: Keeps docs in sync automatically

## 📚 Writing Good Documentation

### JSDoc Best Practices
```tsx
/**
 * A themeable button component with multiple variants and sizes.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Click me
 * </Button>
 * ```
 * 
 * @since 1.0.0
 */
export interface ButtonProps {
  /** 
   * Visual variant of the button.
   * @default ButtonVariant.Primary
   */
  variant?: ButtonVariant;
}
```

### Commit Message Guidelines
```bash
# Good examples
feat(button): add loading state with spinner
fix(theme): resolve dark mode contrast issues  
docs: update component API documentation
perf(layout): optimize grid rendering

# Breaking changes
feat!: redesign theme API structure
feat(theme): new API structure

BREAKING CHANGE: theme.colors.primary is now theme.palette.primary
```

## 🔧 Configuration

### Script Configuration
- **Documentation**: Modify `scripts/generate-docs.js`
- **Changelog**: Modify `scripts/generate-changelog.js`
- **Version**: Modify `scripts/version-bump.js`

### CI/CD Configuration
- **Release**: Modify `.github/workflows/release.yml`
- **Docs**: Modify `.github/workflows/docs.yml`

## 📈 Benefits

### For Developers
- Zero-maintenance documentation
- Consistent changelog format
- One-command releases
- Type-safe documentation

### For Users
- Always up-to-date documentation
- Clear release notes
- Easy navigation to source code
- Rich examples and usage guides

### For Maintainers
- Automated quality checks
- Consistent release process
- Version history tracking
- CI/CD integration

## 🎉 Summary

This system provides a complete, automated solution for documentation and changelog management that:

1. **Eliminates manual work** - Everything is generated automatically
2. **Stays in sync** - Documentation always matches the code
3. **Improves quality** - Consistent, comprehensive documentation
4. **Enhances DX** - Clear examples, type information, and navigation
5. **Streamlines releases** - One-command version management
6. **Integrates with CI/CD** - Fully automated pipeline

The system is designed to grow with your project and can be easily customized to fit specific needs.
