import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface InputTextProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export default function InputText(props: InputTextProps) {
  const { placeholder, register } = props;
  return <StInput placeholder={placeholder} {...register}></StInput>;
}

const StInput = styled.input`
  width: 100%;
  height: 5rem;

  ${({ theme }) => theme.fonts.body12}

  padding: 1rem 1rem 1rem 1.2rem;

  background-color: ${({ theme }) => theme.colors.pastel_blue};

  border: 0.1rem solid ${({ theme }) => theme.colors.main_blue};
  border-radius: 1rem;
`;
