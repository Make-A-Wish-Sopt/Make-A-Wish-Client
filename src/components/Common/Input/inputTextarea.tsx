import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  blur?: boolean;
}

export default function InputTextarea(props: PropsWithChildren<InputTextProps>) {
  const { placeholder, register, blur = false, children, ...rest } = props;

  return (
    <div className="flex flex-col justify-between w-full h-150 p-10 pb-12 text-white bg-dark_green rounded-xl">
      <textarea
        className="w-full h-105 font-galmuri text-[14px] resize-none"
        placeholder={placeholder}
        {...register}
        style={blur ? { filter: 'blur(5px)' } : {}}
        {...rest}
      />
      <div className="text-right w-full">{children}</div>
    </div>
  );
}
