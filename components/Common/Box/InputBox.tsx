import styled from 'styled-components';
import { StyledBox } from './index';
import theme from '@/styles/theme';
import { ColorSystemType, InputBoxTypes } from '@/types/common/box/boxStyleType';
import { PropsWithChildren } from 'react';

interface InputBoxProps {
  width?: string;
  boxType: InputBoxTypes;
  colorSystem: ColorSystemType;
}

export default function InputBox(props: PropsWithChildren<InputBoxProps>) {
  const { width, boxType, colorSystem, children } = props;

  return (
    <StyledInputBox className={`${colorSystem} ${boxType}`} width={width}>
      {children}
    </StyledInputBox>
  );
}

const StyledInputBox = styled(StyledBox)<{ width?: string }>`
  height: 5rem;

  padding: 1rem 1rem 1rem 1.2rem;
  border: 0.1rem solid ${theme.colors.main_blue};
  border-radius: 1rem;

  //InputBox Style System
  &.inputBox--half {
    width: calc(100% / 2);
  }

  &.inputBox--large {
    width: 100%;

    display: flex;
    align-items: center;
  }

  &.inputBox--calendar {
    width: 16rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    ${theme.fonts.body14};
  }

  &.inputBox--custom {
    width: ${(props) => props.width};
    height: 5rem;
  }
`;
