export const colors = {
  background: '#04061F',
  yellow: '#FEE500',
  main_blue: '#00C2FF',
  dark_blue: '#1D3F61',
  dark_green: '#003D50',
  pastel_blue: '#C6E3FF',
  warning_red: '#BE2121',
  white: '#FFFFFF',
  black: '#000000',
  gray1: '#CCCCCC',
  gray2: '#999999',
  gray3: '#666666',
  gray4: '#333333',
  card_hover: 'rgba(47, 47, 47, 0.4)',
  icon_hover: 'rgba(235, 235, 235, 0.5);',
};

export type ColorsTypes = typeof colors;

const sizeList = Object.fromEntries(
  Array.from({ length: 400 }, (_, i) => [i + 1, `${(i + 1) * 0.1}rem`]),
);

export const sizes = {
  ...sizeList,
  500: '50rem',
  608: '60.8rem',

  'fixed-bottom': '5.4rem',
  '91.4%': '91.4%',
};

export type SizesTypes = typeof sizes;

export const fonts = {
  bitbit: ['bitbit', 'sans-serif'],
  galmuri: ['Galmuri11', 'sans-serif'],
};

export type FontsTypes = typeof fonts;
