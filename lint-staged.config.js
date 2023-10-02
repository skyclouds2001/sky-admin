module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix'],
  '*.{js,jsx,ts,tsx,json,html,vue,css,scss,less}': ['prettier --write'],
  '*.{vue,css,scss,less}': ['stylelint --fix'],
}
