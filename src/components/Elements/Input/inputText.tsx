import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Box from '../Box';
import InputField from './InputField';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  boxStyles?: React.CSSProperties;
  inputStyles?: React.CSSProperties;
  blur?: boolean;
  children?: ReactNode;
}

export default function InputText({
  register,
  boxStyles,
  inputStyles,
  readOnly,
  children,
  blur = false,

  ...rest
}: InputTextProps) {
  return (
    <Box bgColor="dark_green" fontColor="white" font="galmuri" styles={boxStyles}>
      <div className="flex justify-between items-center w-full h-full" style={inputStyles}>
        <InputField register={register} blur={blur} readOnly={readOnly} {...rest} />
        {children}
      </div>
    </Box>
  );
}
