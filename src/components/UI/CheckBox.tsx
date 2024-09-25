'use client';

import { PropsWithChildren } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface CheckBoxProps<T> {
  checkBoxText: string;
  registerName?: keyof T;
}

export default function CheckBox<T>(props: PropsWithChildren<CheckBoxProps<T>>) {
  const { register, control } = useFormContext();
  const { checkBoxText, registerName } = props;

  const checkState = useWatch({
    control,
    name: registerName as string,
  });

  return (
    <div className="flex items-center h-full">
      <input
        className="w-20 h-20"
        type="checkbox"
        {...register(registerName as string)}
        style={{
          backgroundImage: `url(${
            checkState ? '/assets/icons/checkedBoxIc.svg' : '/assets/icons/unCheckedBoxIc.svg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <span className="font-galmuri text-[14px] ml-8">{checkBoxText}</span>
    </div>
  );
}
