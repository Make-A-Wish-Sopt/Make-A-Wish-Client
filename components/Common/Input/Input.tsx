import theme from '@/styles/theme';
import { WishesDataInputType } from '@/types/wishesType';
import { HTMLInputTypeAttribute, PropsWithChildren } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

import { InputBoxTypes } from '@/types/common/box/boxStyleType';
import { CakesDataInputType } from '@/types/common/input/cakesInput';
import AlertTextBox from '../AlertTextBox';
import InputBox from '../Box/InputBox';

interface InputProps {
  width?: string;
  boxType?: InputBoxTypes;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  register: UseFormRegisterReturn<keyof WishesDataInputType | keyof CakesDataInputType>;
  errors?: FieldError;
}

export default function Input(props: PropsWithChildren<InputProps>) {
  const { width, inputType, boxType, placeholder, readOnly, disabled, register, errors, children } =
    props;

  return (
    <>
      <InputBox width={width} boxType={boxType} colorSystem="pastelBlue_darkBlue">
        <StyledInput
          type={inputType || 'text'}
          pattern={inputType === 'number' ? '\\d*' : undefined}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          {...register}
        />
        {children}
      </InputBox>
      {errors?.message && <AlertTextBox>{errors.message}</AlertTextBox>}
    </>
  );
}

export const StyledInput = styled.input<{ disabled?: boolean }>`
  width: 100%;
  height: 100%;

  ${theme.fonts.body12};
  color: ${(props) => (props.disabled ? theme.colors.gray2 : theme.colors.dark_blue)};
`;
