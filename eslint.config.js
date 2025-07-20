import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsdoc from 'eslint-plugin-jsdoc'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
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
      'jsdoc/require-example': 'warn',
      'jsdoc/require-param': 'error',
      'jsdoc/require-returns': 'error',
    },
  },
])