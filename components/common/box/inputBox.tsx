import styled from 'styled-components';
import { BoxSize, StyledBox } from '.';
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

  console.log(boxType);

  return (
    <StyledInputBox className={`${colorSystem} ${boxType}`} width={width}>
      {children}
    </StyledInputBox>
  );
}

const StyledInputBox = styled(StyledBox)<{ width?: string }>`
  padding: 1rem 1rem 1rem 1.2rem;
  border: 0.1rem solid ${theme.colors.main_blue};
  border-radius: 1rem;

  //InputBox Style System
  &.inputBox--half {
    ${BoxSize.Half}
  }

  &.inputBox--large {
    ${BoxSize.Large}

    display: flex;
    align-items: center;
  }

  &.inputBox--custom {
    width: ${(props) => props.width};
    height: 5rem;
  }
`;
