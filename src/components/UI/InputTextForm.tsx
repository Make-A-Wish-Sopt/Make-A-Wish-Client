import { Control, Path, UseFormRegisterReturn, useWatch } from 'react-hook-form';
import InputText from '../Common/Input/inputText';
import InputTextarea from '../Common/Input/inputTextarea';
import { ReactNode } from 'react';

export default function InputTextForm<T>({
  inputType = 'text',
  register,
  control,
  placeholder,
  maxLength,
  children,
}: {
  inputType?: 'text' | 'textarea';
  register?: UseFormRegisterReturn<keyof T & string>;
  control?: Control<T>;
  placeholder?: string;
  maxLength?: number;
  children?: ReactNode;
}) {
  const registerName = register.name as Path<T> & string;

  const enteredText = useWatch({
    control,
    name: registerName,
  }) as string;

  return (
    <>
      {inputType === 'text' ? (
        <InputText register={register} placeholder={placeholder}>
          {children}
          {maxLength && <TextCount textLength={enteredText.length} maxLength={maxLength} />}
        </InputText>
      ) : (
        <InputTextarea register={register} placeholder={placeholder}>
          {children}
          {maxLength && <TextCount textLength={enteredText.length} maxLength={maxLength} />}
        </InputTextarea>
      )}
    </>
  );
}

export function TextCount({ textLength, maxLength }: { textLength: number; maxLength: number }) {
  return (
    <span className="font-galmuri text-[12px] text-gray2">{`${textLength}/${maxLength}`}</span>
  );
}
