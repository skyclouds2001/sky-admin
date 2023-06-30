const path = require('path')

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
  extends: ['standard-with-typescript', 'eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'plugin:n/recommended', 'plugin:promise/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:security/recommended', 'plugin:jsdoc/recommended', 'plugin:jsx-a11y/recommended', 'plugin:regexp/recommended', 'plugin:json/recommended', 'plugin:markdown/recommended', 'plugin:prettier/recommended'],
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
  plugins: ['html', 'tsdoc'],
  ignorePatterns: ['.eslintrc.js'],
  globals: {},
  rules: {
    'n/no-missing-import': 'off',
    'n/no-missing-require': 'off',
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true,
        ignore: ['^@', '^~'],
      },
    ],
    'promise/always-return': [
      'error',
      {
        ignoreLastCallback: true,
      },
    ],
  },
  settings: {
    node: {
      allowModules: ['vitest', '@playwright/test'],
      resolvePaths: [__dirname],
      tryExtensions: ['.ts', '.mts', '.js', '.mjs', '.jsx', '.tsx', '.json'],
    },
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
      files: ['**/tests/unit/*.[jt]s?(x)', '**/tests/components/*.[jt]s?(x)'],
      extends: ['plugin:testing-library/vue', 'plugin:vitest/recommended'],
    },
    {
      files: ['**/tests/e2e/*.[jt]s?(x)'],
      extends: ['plugin:playwright/playwright-test'],
    },
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-property-type': 'off',
        'jsdoc/require-returns-type': 'off',
      },
    },
  ],
}
