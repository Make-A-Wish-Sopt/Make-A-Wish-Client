export const colors = {
  background: '#04061F',
  yellow: '#FEE500',
  main_blue: '#00ABFF',
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

const sizeList: { [key: number]: string } = {};
for (let i = 1; i <= 200; i++) {
  sizeList[i] = `${i * 0.1}rem`;
}

export const sizes = {
  ...sizeList,
  220: '22rem',
  235: '23.5rem',
  300: '30rem',
  331: '33.1rem',
  350: '35rem',
  375: '37.5rem',
  500: '50rem',

  'fixed-bottom': '5.4rem',
  '91.4%': '91.4%',
};

export type SizesTypes = typeof sizes;

export const fonts = {
  bitbit: ['DNFBitBitTTF', 'sans-serif'],
  galmuri: ['Galmuri11', 'sans-serif'],
};

export type FontsTypes = typeof fonts;
