import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import testingLibrary from 'eslint-plugin-testing-library';

export default antfu({
  react: true,
  typescript: true,

  lessOpinionated: true,
  isInEditor: false,

  stylistic: {
    semi: true,
  },

  formatters: {
    css: true,
  },

  ignores: [
    'migrations/**/*',
    'next-env.d.ts',
    'src/components/ui/**.tsx',
  ],
}, jsxA11y.flatConfigs.recommended, {
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
  },
}, {
  files: [
    '**/*.test.ts?(x)',
  ],
  ...testingLibrary.configs['flat/react'],
  ...jestDom.configs['flat/recommended'],
}, {
  files: [
    '**/*.spec.ts',
    '**/*.e2e.ts',
  ],
  ...playwright.configs['flat/recommended'],
}, {
  rules: {
    'antfu/no-top-level-await': 'off', // Allow top-level await
    'style/brace-style': ['error', '1tbs'], // Use the default brace style
    'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
    'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'node/prefer-global/process': 'off', // Allow using `process.env`
    'test/padding-around-all': 'error', // Add padding in test files
    'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
  },
});
