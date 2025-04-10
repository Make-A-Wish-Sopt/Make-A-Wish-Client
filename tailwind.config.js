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
        sm: ['10px', '12px', '14px'],
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
      // ✅ 여기에 애니메이션 추가
      animation: {
        appear: 'appearAnimation 0.3s ease-out forwards',
      },
      keyframes: {
        appearAnimation: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
};
