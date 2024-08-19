import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface InputTextProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export default function InputTextarea(props: PropsWithChildren<InputTextProps>) {
  const { placeholder, register, children } = props;

  return (
    <StTextareaBox>
      <StInputTextarea placeholder={placeholder} {...register} />
      {children}
    </StTextareaBox>
  );
}

const StTextareaBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
  height: 15rem;

  padding: 1rem 1rem 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.pastel_blue};

  border: 0.1rem solid ${({ theme }) => theme.colors.main_blue};
  border-radius: 1rem;
`;

const StInputTextarea = styled.textarea`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.fonts.body12}

  resize: none;
`;
