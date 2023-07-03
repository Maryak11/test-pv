/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans'],
      },
      // backgroundImage: {
      //   'gradient-error-modal':
      //     'radial-gradient(circle, rgba(251,63,78,0.9318321078431373) 0%, rgba(0,5,25,1) 100%)',
      // },
    },
  },
};
