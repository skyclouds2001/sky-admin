module.exports = {
  '*.{js,jsx,ts,tsx,json,vue,html,md,mdx}': ['eslint --fix'],
  '*.{js,jsx,ts,tsx,json,vue,html,md,mdx,css,sass,scss,less,styl,stylus,sss}': ['prettier --write'],
  '*.{vue,html,md,mdx,css,sass,scss,less,styl,stylus,sss}': ['stylelint --fix'],
}
