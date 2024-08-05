import styled, { css } from 'styled-components';
import theme from '@/styles/theme';

export type ColorSystemType =
  | 'mainBlue_white'
  | 'yellow_black'
  | 'pastelBlue_white'
  | 'pastelBlue_mainBlue'
  | 'pastelBlue_gray2'
  | 'pastelBlue_darkBlue'
  | 'white_mainBlue'
  | 'gray1_gray2'
  | 'gray1_white'
  | 'lightRed_warningRed';

export const StyledCommon = styled.div<{ size?: ButtonSizeType }>`
  ${(props) => getButtonSize(props.size)}
  height:5rem;

  border-radius: 1rem;
  border-color: transparent;

  &.default {
    background-color: ${theme.colors.main_blue};
    color: ${theme.colors.white};
  }

  &.gray1_white {
    background-color: ${theme.colors.gray1};
    color: ${theme.colors.white};
  }

  &.mainBlue_white {
    background-color: ${theme.colors.main_blue};
    color: ${theme.colors.white};
  }

  &.yellow_black {
    background-color: ${theme.colors.yellow};
    color: ${theme.colors.black};
  }

  &.pastelBlue_white {
    background-color: ${theme.colors.pastel_blue};
    color: ${theme.colors.white};
  }

  &.pastelBlue_mainBlue {
    background-color: ${theme.colors.pastel_blue};
    color: ${theme.colors.main_blue};
  }

  &.pastelBlue_gray2 {
    background-color: ${theme.colors.pastel_blue};
    color: ${theme.colors.gray2};
  }

  &.pastelBlue_darkBlue {
    background-color: ${theme.colors.pastel_blue};
    color: ${theme.colors.dark_blue};
  }

  &.white_mainBlue {
    background-color: ${theme.colors.white};
    color: ${theme.colors.main_blue};
  }

  &.gray1_gray2 {
    background-color: ${theme.colors.gray1};
    color: ${theme.colors.gray2};
  }

  &.lightRed_warningRed {
    background: rgba(190, 33, 33, 0.1);
    color: ${theme.colors.warning_red};
  }
`;

export type ButtonSizeType = 'small' | 'medium' | 'large' | 'full' | 'half';

const getButtonSize = (size?: ButtonSizeType): ReturnType<typeof css> => {
  switch (size) {
    case 'small':
      return css`
        width: 5rem;
      `;
    case 'medium':
      return css`
        width: 10rem;
      `;
    case 'large':
      return css`
        width: 30rem;
      `;

    case 'full':
      return css`
        width: 100%;
      `;

    case 'half':
      return css`
        width: 50%;
      `;

    default:
      return css`
        width: 20rem;
      `;
  }
};
