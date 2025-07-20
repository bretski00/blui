import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsdoc from 'eslint-plugin-jsdoc'

export default tseslint.config([
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      jsdoc,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Basic JSDoc rules for all files
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/empty-tags': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns-description': 'error',
      // Relax react-refresh rules for provider files and utility exports
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Allow @ts-expect-error but warn about @ts-ignore
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
        },
      ],
    },
  },
  // Relaxed rules for index files (just re-exports, no need for extensive docs)
  {
    files: ['**/index.{ts,tsx}'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-example': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-description': 'off',
    },
  },
  // Stricter rules for component files
  {
    files: ['**/components/**/*.{ts,tsx}', '**/src/components/**/*.{ts,tsx}', '**/src/layouts/**/*.{ts,tsx}', '**/src/theme/**/*.{ts,tsx}', '**/src/types/**/*.{ts,tsx}'],
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false, // Disable for arrow functions (like event handlers)
            FunctionExpression: false, // Disable for function expressions (like forwardRef callbacks)
          },
          contexts: [
            'TSInterfaceDeclaration',
            'TSTypeAliasDeclaration',
            // Remove these problematic contexts that catch forwardRef and displayName assignments
            // 'ExportDefaultDeclaration > *',
            // 'ExportNamedDeclaration > *',
          ],
          exemptEmptyFunctions: true,
          exemptEmptyConstructors: true,
        },
      ],
      'jsdoc/require-example': 'warn', // Change to warning instead of error
      'jsdoc/require-param': 'warn', // Change to warning for destructured params
      'jsdoc/require-returns': 'warn', // Change to warning
      'jsdoc/require-param-description': 'warn', // Change to warning
      'jsdoc/require-returns-description': 'warn', // Already a warning
      '@typescript-eslint/no-explicit-any': 'warn', // Change to warning for now
    },
  },
])