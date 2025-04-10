import { InputHTMLAttributes, ClipboardEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  blur?: boolean;
  className?: string;
}

export default function InputField({
  register,
  blur = false,
  readOnly,
  className = '',
  ...rest
}: InputFieldProps) {
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text');
    if (!pastedData) {
      event.preventDefault(); // 빈 값 붙여넣기 방지
    }
  };

  return (
    <input
      {...(register || {})}
      {...rest}
      readOnly={readOnly}
      onPaste={handlePaste}
      style={blur ? { filter: 'blur(5px)' } : {}}
      className={`w-full h-full font-galmuri text-[14px] placeholder-gray2 ${className}`}
    />
  );
}
