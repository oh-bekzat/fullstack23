/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      garamond: ['Apple Garamond', 'sans-serif'],
    },
  },

  // eslint-disable-next-line no-undef
  plugins: [
    // Other plugins
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}
