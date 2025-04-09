import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  blur?: boolean;
  keyPrevent?: boolean;
  className?: string;
}

export default function InputField({
  register,
  blur = false,
  keyPrevent = false,
  readOnly,
  className,
  ...rest
}: InputFieldProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!keyPrevent) return;

    // 키보드 입력 방지 기능 (예: 숫자만 허용, 특수문자 금지 등)
    // 예시: event.preventDefault();
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text');
    if (!pastedData) {
      event.preventDefault(); // 빈 값 붙여넣기 방지
    }
  };

  return (
    <input
      className={`w-full h-full font-galmuri text-[14px] plachoder-gray2 ${className}`}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      style={blur ? { filter: 'blur(5px)' } : {}}
      readOnly={readOnly}
      {...register}
      {...rest}
    />
  );
}
