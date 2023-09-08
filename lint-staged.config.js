module.exports = {
  '*.{js,jsx,ts,tsx,vue}': ['eslint --fix'],
  '*.{js,jsx,ts,tsx,json,vue,html,md,mdx,css,sass,scss,less,styl,stylus,pcss,sss}': ['prettier --write'],
  '*.{vue,html,md,mdx,css,sass,scss,less,styl,stylus,pcss,sss}': ['stylelint --fix'],
}
