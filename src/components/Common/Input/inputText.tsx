import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Box from '../Box';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  boxStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  onClick?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export default function InputText({
  placeholder,
  register,
  boxStyles,
  styles,
  onClick,
  readOnly,
  disabled,
  children,
  ...rest
}: InputTextProps) {
  return (
    <Box bgColor="dark_green" fontColor="white" font="galmuri" styles={boxStyles}>
      <div className="flex justify-between items-center w-full h-full " style={styles}>
        <input
          className="w-full h-full font-galmuri text-[14px] plachoder-gray2"
          placeholder={placeholder}
          {...register}
          onClick={onClick}
          readOnly={readOnly}
          disabled={disabled}
          {...rest}
        ></input>
        {children}
      </div>
    </Box>
  );
}
