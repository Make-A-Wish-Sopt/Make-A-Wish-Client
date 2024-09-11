import theme from '@/styles/theme';
import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CSSProperties } from 'styled-components';

interface InputTextProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  boxStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  disabled?: boolean;
}

export default function InputText(props: PropsWithChildren<InputTextProps>) {
  const { placeholder, register, boxStyle, inputStyle, disabled, children } = props;
  return (
    <div className="flex justify-between items-center w-full h-50 p-10 pl-12 text-white bg-dark_green rounded-xl">
      <input
        className="w-full h-full font-galmuri text-[14px] plachoder-gray2"
        placeholder={placeholder}
        {...register}
        disabled={disabled}
      ></input>
      {children}
    </div>
  );
}
