import { RegisterOptions, useFormContext, UseFormRegisterReturn, useWatch } from 'react-hook-form';
import InputForm from './InputForm';
import InputText from '../Common/Input/inputText';
import InputTextarea from '../Common/Input/inputTextarea';
import { ReactNode } from 'react';

export default function InputTextForm<T>({
  inputType,
  inputTitle,
  register,
  registerName,
  validate,
  placeholder,
  maxLength,
  children,
}: {
  inputType: 'text' | 'textarea';
  inputTitle: string;
  register: UseFormRegisterReturn<keyof T & string>;
  registerName?: keyof T;
  validate?: RegisterOptions;
  placeholder?: string;
  maxLength?: number;
  children?: ReactNode;
}) {
  // const { register, control } = useFormContext();

  // const text = useWatch({
  //   control,
  //   name: registerName as string,
  // }) as string;

  return (
    <InputForm title={inputTitle}>
      {inputType === 'text' ? (
        <InputText register={register} placeholder={placeholder}>
          {children}
          {/* {maxLength && <TextCount textLength={text.length} maxLength={maxLength} />} */}
        </InputText>
      ) : (
        <InputTextarea register={register} placeholder={placeholder}>
          {children}
          {/* {maxLength && <TextCount textLength={text.length} maxLength={maxLength} />} */}
        </InputTextarea>
      )}
    </InputForm>
  );
}

export function TextCount({ textLength, maxLength }: { textLength: number; maxLength: number }) {
  return (
    <span className="font-galmuri text-[12px] text-gray2">{`${textLength}/${maxLength}`}</span>
  );
}
