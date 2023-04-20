const colors = {
  yellow: '#FBF26C',
  black: '#1E2025',
  card_hover: 'rgba(47, 47, 47, 0.4)',
  icon_hover: 'rgba(235, 235, 235, 0.5);',
} as const;

interface Font {
  weight: 300 | 400 | 500 | 600 | 700 | 800;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
}

function FONT({ weight, size, lineHeight, letterSpacing }: Font): string {
  return `
      font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
      font-weight: ${weight};
      font-size: ${size}rem;
      line-height: ${lineHeight}rem;
      ${letterSpacing && `letter-spacing: -0.0${letterSpacing}rem;`}
    `;
}

const fonts = {
  title1: FONT({ weight: 700, size: 4, lineHeight: 5.4 }),
} as const;

const theme = {
  colors,
  fonts,
} as const;

export default theme;
