# Changelog Template

This file serves as a template and guide for writing good changelog entries.

## Conventional Commit Types

The changelog generation recognizes these conventional commit prefixes:

- `feat:` - New features ✨
- `fix:` - Bug fixes 🐛  
- `docs:` - Documentation changes 📚
- `style:` - Code style changes (formatting, etc.) 💄
- `refactor:` - Code refactoring 🔧
- `perf:` - Performance improvements 🚀
- `test:` - Test additions/changes 🧪
- `chore:` - Build process, dependency updates 🏠

## Breaking Changes

Mark breaking changes in commits by:
- Adding `BREAKING CHANGE:` in the commit body
- Using `!` after the type: `feat!: new api`
- Including `breaking:` in the commit message

## Commit Message Examples

### Good Examples
```
feat(button): add loading state with spinner
fix(theme): resolve dark mode contrast issues  
docs: update component API documentation
perf(layout): optimize grid rendering performance
BREAKING CHANGE: remove deprecated theme properties
```

### What Gets Generated

**Features** → ✨ New Features
**Bug Fixes** → 🐛 Bug Fixes  
**Breaking Changes** → ⚠️ Breaking Changes
**Performance** → 🚀 Performance Improvements
**Documentation** → 📚 Documentation
**Refactoring** → 🔧 Code Refactoring
**Styles** → 💄 Styles
**Tests** → 🧪 Tests
**Chore** → 🏠 Chore

## Automatic Generation

Changelogs are automatically generated when:
1. Version is bumped: `npm run version patch|minor|major`
2. Manual generation: `npm run changelog:generate`
3. During build/publish: `npm run prepublishOnly`

## Files Generated

- `changelogs/vX.Y.Z.md` - Detailed version-specific changelog
- `CHANGELOG.md` - Main changelog with summaries of all versions
