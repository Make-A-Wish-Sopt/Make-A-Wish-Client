import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Box from '../Box';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  boxStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  onClick?: () => void;
  children?: ReactNode;
}

export default function InputText({
  register,
  boxStyles,
  styles,
  onClick,
  readOnly,
  children,
  ...rest
}: InputTextProps) {
  return (
    <Box bgColor="dark_green" fontColor="white" font="galmuri" styles={boxStyles}>
      <div className="flex justify-between items-center w-full h-full " style={styles}>
        <input
          className="w-full h-full font-galmuri text-[14px] plachoder-gray2"
          {...register}
          onClick={onClick}
          readOnly={readOnly}
          {...rest}
        ></input>
        {children}
      </div>
    </Box>
  );
}
