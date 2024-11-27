import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Box from '../Box';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  boxStyles?: React.CSSProperties;
  inputStyles?: React.CSSProperties;
  blur?: boolean;
  keyPrevent?: boolean;
  children?: ReactNode;
}

export default function InputText({
  register,
  boxStyles,
  inputStyles,
  readOnly,
  children,
  blur = false,
  keyPrevent = false,
  ...rest
}: InputTextProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (keyPrevent && !event.ctrlKey && event.key !== 'v') {
      // Ctrl+V (붙여넣기) 허용, 나머지 키보드 입력 차단
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('text');
    if (!pastedData) {
      event.preventDefault(); // 빈 값 붙여넣기 방지
    }
  };

  return (
    <Box bgColor="dark_green" fontColor="white" font="galmuri" styles={boxStyles}>
      <div className="flex justify-between items-center w-full h-full " style={inputStyles}>
        <input
          className="w-full h-full font-galmuri text-[14px] plachoder-gray2"
          onClick={rest.onClick}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          style={blur ? { filter: 'blur(5px)' } : {}}
          readOnly={readOnly}
          {...register}
          {...rest}
        />
        {children}
      </div>
    </Box>
  );
}
