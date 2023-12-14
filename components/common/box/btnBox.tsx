import styled from 'styled-components';
import { BoxSize, StyledBox } from '.';
import theme from '@/styles/theme';
import { BtnBoxTypes, ColorSystemType } from '@/types/common/box/boxStyleType';
import { PropsWithChildren } from 'react';

interface BtnBoxProps {
  width?: number;
  boxType: BtnBoxTypes;
  colorSystem: ColorSystemType;
  handleClickFn: () => void | unknown;
}

export default function BtnBox(props: PropsWithChildren<BtnBoxProps>) {
  const { width, boxType, colorSystem, handleClickFn, children } = props;

  return (
    <StyledBtnBox
      as="button"
      className={`${boxType} ${colorSystem} `}
      width={width}
      onClick={handleClickFn}
    >
      {children}
    </StyledBtnBox>
  );
}

const StyledBtnBox = styled(StyledBox)<{ width?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5rem;

  ${theme.fonts.button18};

  //Button Style System
  &.btn--half {
    ${BoxSize.Half}
  }

  &.btn--large {
    ${BoxSize.Large}
  }

  &.btn--custom {
    width: ${(props) => props.width && props.width}rem;

    ${theme.fonts.body14};
  }
`;
