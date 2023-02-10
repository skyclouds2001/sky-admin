/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
