import theme from '@/styles/theme';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import InputBox from '../box/inputBox';
import { InputBoxTypes } from '@/types/common/box/boxStyleType';
import { CakesDataInputType } from '@/types/common/input/cakesInput';

interface InputProps {
  width?: string;
  boxType?: InputBoxTypes;
  placeholder?: string;
  readOnly?: boolean;
  register: UseFormRegisterReturn<keyof WishesDataInputType | keyof CakesDataInputType>;
}

export default function Input(props: PropsWithChildren<InputProps>) {
  const { width, boxType, placeholder, readOnly, register, children } = props;

  return (
    <InputBox
      width={width}
      boxType={boxType || 'inputBox--large'}
      colorSystem="pastelBlue_darkBlue"
    >
      <StyledInput placeholder={placeholder} readOnly={readOnly} {...register} />
      {children}
    </InputBox>
  );
}

const StyledInput = styled.input`
  ${theme.fonts.body12};
  color: ${theme.colors.dark_blue};
  width: 100%;
  height: 100%;
`;
