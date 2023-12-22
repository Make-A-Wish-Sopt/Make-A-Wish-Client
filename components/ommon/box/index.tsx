import theme from '@/styles/theme';
import { BoxTypes, ColorSystemType } from '@/types/common/box/boxStyleType';
import styled from 'styled-components';

interface BoxProps {
  width?: number;
  boxType?: BoxTypes;
  colorSystem: ColorSystemType;
  children: React.ReactNode;
}

export default function Box(props: BoxProps) {
  const { boxType, colorSystem, children } = props;

  return <StyledBox className={`${colorSystem} ${boxType}`}>{children}</StyledBox>;
}

export const StyledBox = styled.div`
  border-radius: 1rem;

  .small {
    width: 7.4rem;
    height: 4.6rem;
  }

  .half {
    width: calc(100% / 2);
    height: 5rem;
  }

  .large {
    width: 100%;
    height: 5rem;
  }

  .image {
    width: 100%;
    height: 15rem;
  }

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
`;

export const EmptyBox = styled.div`
  width: 100%;
`;
