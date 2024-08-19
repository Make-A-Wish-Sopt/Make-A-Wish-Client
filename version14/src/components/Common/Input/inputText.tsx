import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled, { CSSProperties } from 'styled-components';

interface InputTextProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  boxStyle?: CSSProperties;
  inputStyle?: CSSProperties;
}

export default function InputText(props: PropsWithChildren<InputTextProps>) {
  const { placeholder, register, boxStyle, inputStyle, children } = props;
  return (
    <StInputBox style={boxStyle}>
      <StInput placeholder={placeholder} {...register} style={inputStyle}></StInput>
      {children}
    </StInputBox>
  );
}

const StInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 5rem;

  padding: 1rem 1rem 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.pastel_blue};

  border: 0.1rem solid ${({ theme }) => theme.colors.main_blue};
  border-radius: 1rem;
`;

const StInput = styled.input`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.dark_blue};
`;
