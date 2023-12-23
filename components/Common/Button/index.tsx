import { ReactNode } from 'react';
import { BoxTypes, ColorSystemType } from '@/types/common/box/boxStyleType';
import styled from 'styled-components';
import { StyledBox } from '../Box';
import theme from '@/styles/theme';

interface ButtonProps {
  width?: string;
  boxType?: BoxTypes;
  colorSystem: ColorSystemType;
  handleClickFn?: (parameter?: unknown) => void | unknown;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { width, boxType, colorSystem, handleClickFn, children } = props;

  return (
    <StyledBtnBox
      as="button"
      width={width}
      className={`${boxType} ${colorSystem} `}
      onClick={handleClickFn}
    >
      {children}
    </StyledBtnBox>
  );
}

export const StyledBtnBox = styled(StyledBox)<{ width?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => (props.width ? props.width : '100%')};
  height: 5rem;

  ${theme.fonts.button18};
`;
