import theme from '@/styles/theme';
import { WishesDataInputType } from '@/types/common/input';
import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps {
  width?: number;
  placeholder?: string;
  readOnly?: boolean;
  register: UseFormRegisterReturn<keyof WishesDataInputType>;
}

export default function Input(props: PropsWithChildren<InputProps>) {
  const { width, placeholder, readOnly, register, children } = props;

  return (
    <Container width={width}>
      <StyledInput placeholder={placeholder} readOnly={readOnly} {...register} />
      {children}
    </Container>
  );
}

const Container = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;

  width: ${(props) => (props.width ? `${props.width}rem` : '100%')};
  height: 5rem;

  padding: 1.2rem 1rem 1.2rem 1.2rem;
  background-color: ${theme.colors.pastel_blue};
  border: 0.1rem solid ${theme.colors.main_blue};
  border-radius: 1rem;
`;

export const StyledInput = styled.input`
  ${theme.fonts.body12};
  color: ${theme.colors.dark_blue};
  width: 100%;
`;
