'use client';

import useToggle from '@/hooks/common/useToggle';
import { PropsWithChildren, useEffect } from 'react';

interface CheckBoxProps<T> {
  checkBoxText: string;
  changeCheckedState: (state: boolean) => void;
}

export default function CheckBox<T>(props: PropsWithChildren<CheckBoxProps<T>>) {
  const { checkBoxText, changeCheckedState } = props;
  const { toggleState, handleToggle } = useToggle();

  useEffect(() => {
    changeCheckedState(toggleState);
  }, [toggleState]);

  return (
    <div className="flex items-center h-full">
      <input
        className="w-20 h-20"
        type="checkbox"
        onChange={handleToggle}
        style={{
          backgroundImage: `url(${
            toggleState ? '/assets/icons/checkedBoxIc.svg' : '/assets/icons/unCheckedBoxIc.svg'
          })`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
      <span className="font-galmuri text-[14px] ml-8">{checkBoxText}</span>
    </div>
  );
}
