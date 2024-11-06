'use client';

import useToggle from '@/hooks/common/useToggle';
import { PropsWithChildren, useEffect } from 'react';

interface CheckBoxProps<T> {
  checkBoxText: string;
  changeCheckedState: (state: boolean) => void;
}

export default function CheckBox<T>(props: PropsWithChildren<CheckBoxProps<T>>) {
  const { checkBoxText, changeCheckedState } = props;
  const { state, handleState } = useToggle();

  useEffect(() => {
    changeCheckedState(state);
  }, [state]);

  return (
    <div className="flex items-center h-full">
      <input
        className="w-20 h-20"
        type="checkbox"
        onChange={handleState}
        style={{
          backgroundImage: `url(${
            state ? '/assets/icons/checkedBoxIc.svg' : '/assets/icons/unCheckedBoxIc.svg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <span className="font-galmuri text-[14px] ml-8">{checkBoxText}</span>
    </div>
  );
}
