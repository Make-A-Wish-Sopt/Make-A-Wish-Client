import { useFormContext } from 'react-hook-form';
import InputForm from './InputForm';
import InputText from '../Common/Input/inputText';
import InputTextarea from '../Common/Input/inputTextarea';
import { memo, ReactNode } from 'react';

export default function InputTextForm<T>({
  inputType,
  inputTitle,
  registerName,
  placeholder,
  children,
}: {
  inputType: 'text' | 'textarea';
  inputTitle: string;
  registerName: keyof T;
  placeholder?: string;
  children?: ReactNode;
}) {
  const { register } = useFormContext();
  return (
    <InputForm title={inputTitle}>
      {inputType === 'text' ? (
        <InputText register={register(registerName as string)} placeholder={placeholder}>
          {children}
        </InputText>
      ) : (
        <InputTextarea register={register(registerName as string)} placeholder={placeholder}>
          {children}
        </InputTextarea>
      )}
    </InputForm>
  );
}

// export default memo(InputTextForm);

export const TextCount = memo(
  ({ textLength, maxLength }: { textLength: number; maxLength: number }) => {
    return (
      <span className="font-galmuri text-[12px] text-gray2">{`${textLength}/${maxLength}`}</span>
    );
  },
);
