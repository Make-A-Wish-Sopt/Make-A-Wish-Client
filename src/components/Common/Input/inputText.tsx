import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Box from '../Box';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  boxStyles?: React.CSSProperties;
  inputStyles?: React.CSSProperties;
  onClick?: () => void;
  blur?: boolean;
  children?: ReactNode;
}

export default function InputText({
  register,
  boxStyles,
  inputStyles,
  onClick,
  readOnly,
  children,
  blur = false,
  ...rest
}: InputTextProps) {
  return (
    <Box bgColor="dark_green" fontColor="white" font="galmuri" styles={boxStyles}>
      <div className="flex justify-between items-center w-full h-full " style={inputStyles}>
        <input
          className="w-full h-full font-galmuri text-[14px] plachoder-gray2"
          {...register}
          onClick={onClick}
          style={blur ? { filter: 'blur(5px)' } : {}}
          readOnly={readOnly}
          {...rest}
        ></input>
        {children}
      </div>
    </Box>
  );
}
