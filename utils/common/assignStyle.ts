import theme, { ColorsTypes, FontsTypes } from '@/styles/theme';

export const assignColor = (target: keyof ColorsTypes | undefined) => {
  if (!target) return;
  let color;

  switch (target) {
    case 'pastel_blue':
      color = theme.colors.pastel_blue;
      break;
    case 'gray1':
      color = theme.colors.gray1;
      break;
    case 'yellow':
      color = theme.colors.yellow;
      break;
    case 'white':
      color = theme.colors.white;
      break;
    default:
      color = theme.colors.main_blue;
  }

  return color;
};

export const assignFont = (target: keyof FontsTypes | undefined) => {
  if (!target) return;
  let font;

  switch (target) {
    case 'title56':
      font = theme.colors.pastel_blue;
      break;
    case 'body14':
      font = theme.fonts.body14;
      break;
    default:
      font = theme.fonts.body12;
  }

  return font;
};
