import theme from '@/styles/theme';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import styled, { CSSProperties } from 'styled-components';

interface BoxProps {
  style: CSSProperties;
  colorSystem: ColorSystemType;
  children: React.ReactNode;
}

export default function Box(props: BoxProps) {
  const { style, colorSystem, children } = props;

  return (
    <StyledBox style={style} className={`${colorSystem}`}>
      {children}
    </StyledBox>
  );
}

export const StyledBox = styled.div`
  border-radius: 1rem;

  // Color System
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

  &.darkGreen_white {
    background-color: ${theme.colors.dark_green};
    color: ${theme.colors.white};
  }

  &.darkGreen_gray2 {
    background-color: ${theme.colors.dark_green};
    color: ${theme.colors.gray2};
  }
`;

export const EmptyBox = styled.div`
  width: 100%;
`;

export const LargeBoxStyle: CSSProperties = {
  width: '100%',
  height: '5rem',
};

export const HalfBoxStyle: CSSProperties = {
  width: '50%',
  height: '5rem',
};
