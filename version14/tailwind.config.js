/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/styles/styles');
const { sizes } = require('./src/styles/styles');
const { fonts } = require('./src/styles/styles');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      ...fonts,
    },
    extend: {
      fontSize: {
        sm: ['12px', '14px'],
        base: ['16px', '18px'],
        lg: ['20px', '24px'],
        xl: ['56px'],
      },
      spacing: {
        ...sizes,
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
