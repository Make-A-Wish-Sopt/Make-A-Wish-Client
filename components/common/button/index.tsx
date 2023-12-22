import { ReactNode } from 'react';
import { BoxTypes, ColorSystemType } from '@/types/common/box/boxStyleType';
import styled from 'styled-components';
import { StyledBox } from '../box';
import theme from '@/styles/theme';

interface ButtonProps {
  boxType: BoxTypes;
  colorSystem: ColorSystemType;
  handleClickFn?: (parameter?: unknown) => void | unknown;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { boxType, colorSystem, handleClickFn, children } = props;

  return (
    <StyledBtnBox as="button" className={`${boxType} ${colorSystem} `} onClick={handleClickFn}>
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
`;
