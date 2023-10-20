module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'no-empty-source': null,
  },
  plugins: [],
  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-standard-vue'],
    },
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    },
  ],
}
