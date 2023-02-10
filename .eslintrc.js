module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    commonjs: true,
    'shared-node-browser': true,
    worker: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:n/recommended', 'plugin:promise/recommended', 'plugin:import/recommended', 'plugin:security/recommended', 'plugin:jsdoc/recommended', 'plugin:jsx-a11y/recommended', 'plugin:json/recommended', 'plugin:markdown/recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
    extraFileExtensions: ['.vue', '.json', '.html', '.md', '.mdx'],
  },
  plugins: ['@typescript-eslint', 'html', 'tsdoc'],
  globals: {},
  rules: {
    'n/no-missing-import': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        directory: 'tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['**/tests/**/*.[jt]s?(x)'],
      extends: ['plugin:testing-library/vue', 'plugin:playwright/playwright-test'],
      plugins: ['vitest'],
    },
  ],
}
