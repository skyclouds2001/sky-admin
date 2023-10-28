module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix'],
  '*.{js,jsx,ts,tsx,vue,html,json,md,css,scss}': ['prettier --write'],
  '*.{vue,css,scss}': ['stylelint --fix'],
}
