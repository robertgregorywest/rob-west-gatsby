const js = require('@eslint/js');
const globals = require('globals');
const babelParser = require('@babel/eslint-parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const importX = require('eslint-plugin-import-x');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['public/', '.cache/', 'node_modules/', 'src/gatsby-types.d.ts'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  importX.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: { presets: ['babel-preset-gatsby'] },
      },
      globals: { ...globals.browser, ...globals.node, graphql: 'readonly' },
    },
    settings: {
      react: { version: 'detect' },
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import-x/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      'arrow-body-style': [
        'error',
        'as-needed',
        { requireReturnForObjectLiteral: true },
      ],
      'no-console': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
  ...[
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ].map((config) => {
    return { ...config, files: ['**/*.{ts,tsx}'] };
  }),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      globals: { ...globals.browser, ...globals.node, graphql: 'readonly' },
    },
    settings: {
      react: { version: 'detect' },
      'import-x/extensions': ['.js', '.jsx', '.ts', '.tsx'],
      'import-x/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      'arrow-body-style': [
        'error',
        'as-needed',
        { requireReturnForObjectLiteral: true },
      ],
      'no-console': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      // The codebase uses `type` aliases throughout, not interfaces.
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
    },
  },
  prettier,
];
