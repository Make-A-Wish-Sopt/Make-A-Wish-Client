import { DefaultTheme } from 'styled-components';

const colors = {
  bg_yellow: '#FFF8D4',
  main_blue: '#00ABFF',
  dark_blue: '#1D3F61',
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

interface Font {
  family: boolean;
  weight: 300 | 400 | 500 | 600 | 700 | 800;
  size: number;
  lineHeight: string;
  letterSpacing?: number;
}

function FONT({ family, weight, size, lineHeight, letterSpacing }: Font): string {
  return `
      font-family: ${family ? 'bitbit' : 'Galmuri11'};
      font-weight: ${weight};
      font-size: ${size}rem;
      line-height: ${lineHeight};
      ${letterSpacing && `letter-spacing: -0.0${letterSpacing}rem;`}
    `;
}

const fonts = {
  title56: FONT({ family: true, weight: 400, size: 5.6, lineHeight: '100%' }),
  headline20: FONT({ family: true, weight: 400, size: 2, lineHeight: '130%' }),
  headline24_100: FONT({ family: true, weight: 400, size: 2.4, lineHeight: '100%' }),
  headline24_130: FONT({ family: true, weight: 400, size: 2.4, lineHeight: '130%' }),
  headline30: FONT({ family: true, weight: 400, size: 3, lineHeight: '100%' }),
  body16: FONT({ family: false, weight: 400, size: 1.6, lineHeight: '130%' }),
  body14: FONT({ family: false, weight: 400, size: 1.4, lineHeight: '130%' }),
  body12: FONT({ family: false, weight: 400, size: 1.2, lineHeight: '2.2rem' }),
  button16: FONT({ family: true, weight: 400, size: 1.6, lineHeight: '3rem' }),
};

export type FontsTypes = typeof fonts;

const theme = {
  colors,
  fonts,
};

export default theme;
