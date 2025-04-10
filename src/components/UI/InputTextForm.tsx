import { ReactNode } from 'react';
import { Control, Path, UseFormRegisterReturn, useWatch } from 'react-hook-form';
import InputText from '../Elements/Input/inputText';
import InputTextarea from '../Elements/Input/inputTextarea';

export function TextCount({ textLength, maxLength }: { textLength: number; maxLength: number }) {
  return (
    <span className="font-galmuri text-[12px] text-gray2">{`${textLength}/${maxLength}`}</span>
  );
}

export function InputTextForm<T>({
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

  return inputType === 'text' ? (
    <InputText register={register} placeholder={placeholder} maxLength={maxLength}>
      {children}
      {maxLength && <TextCount textLength={enteredText.length} maxLength={maxLength} />}
    </InputText>
  ) : (
    <InputTextarea register={register} placeholder={placeholder} maxLength={maxLength}>
      {children}
      {maxLength && <TextCount textLength={enteredText.length} maxLength={maxLength} />}
    </InputTextarea>
  );
}
