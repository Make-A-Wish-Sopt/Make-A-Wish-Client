'use client';

import useToggle from '@/hooks/common/useToggle';
import { PropsWithChildren, useEffect } from 'react';

interface CheckBoxProps<T> {
  checkBoxText: string;
  changeCheckedState?: (state: boolean) => void;
  readOnly?: boolean;
}

export default function CheckBox<T>(props: PropsWithChildren<CheckBoxProps<T>>) {
  const { checkBoxText, changeCheckedState, readOnly = false } = props;
  const { state, handleState } = useToggle();

  useEffect(() => {
    changeCheckedState && changeCheckedState(state);
  }, [state]);

  return (
    <div className="flex items-center h-full">
      <input
        className="w-20 h-20"
        type="checkbox"
        onChange={() => {
          !readOnly && handleState();
        }}
        style={{
          backgroundImage: `url(${
            state ? '/assets/icons/checkedBoxIc.svg' : '/assets/icons/unCheckedBoxIc.svg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        readOnly={readOnly}
      />
      <span className="font-galmuri text-[14px] ml-8">{checkBoxText}</span>
    </div>
  );
}
