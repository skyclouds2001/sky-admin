/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx,vue}'],
  theme: {
    extend: {},
  },
  important: true,
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/container-queries')],
}
