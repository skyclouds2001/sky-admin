module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.md'],
      customSyntax: 'postcss-markdown',
    },
    {
      files: ['**/*.html'],
      extends: ['stylelint-config-html'],
    },
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-standard-vue'],
    },
    {
      files: ['**/*.sass'],
      customSyntax: 'postcss-sass',
    },
    {
      files: ['**/*.scss'],
      extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    },
    {
      files: ['**/*.less'],
      extends: ['stylelint-config-recommended-less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.styl', '**/*.stylus'],
      extends: ['stylelint-stylus/standard'],
    },
    {
      files: ['**/*.sss'],
      customSyntax: 'sugarss',
    },
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
}
