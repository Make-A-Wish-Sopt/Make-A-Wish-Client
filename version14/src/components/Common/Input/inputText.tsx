import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  styles?: React.CSSProperties;
  onClick?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export default function InputText({
  placeholder,
  register,
  styles,
  onClick,
  readOnly,
  disabled,
  children,
  ...rest
}: InputTextProps) {
  return (
    <div
      className="flex justify-between items-center w-full h-50 p-10 pl-12 text-white bg-dark_green rounded-xl"
      style={styles}
    >
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
  );
}
