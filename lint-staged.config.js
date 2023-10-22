module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix'],
  '*.{js,jsx,ts,tsx,json,html,vue,css,scss}': ['prettier --write'],
  '*.{vue,css,scss}': ['stylelint --fix'],
}
