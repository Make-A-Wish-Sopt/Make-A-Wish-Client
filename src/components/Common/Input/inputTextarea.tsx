import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputTextProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export default function InputTextarea(props: PropsWithChildren<InputTextProps>) {
  const { placeholder, register, children } = props;

  return (
    <div className="flex flex-col justify-between w-full h-150 p-10 pb-12 text-white bg-dark_green rounded-xl">
      <textarea
        className="w-full h-105 font-galmuri text-[14px] resize-none"
        placeholder={placeholder}
        {...register}
      />
      <div className="text-right w-full">{children}</div>
    </div>
  );
}
