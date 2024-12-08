'use client';

import useToggle from '@/hooks/common/useToggle';
import { PropsWithChildren, useEffect } from 'react';

interface CheckBoxProps {
  changeCheckedState?: (state: boolean) => void;
  readOnly?: boolean;
}

export default function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
  const { changeCheckedState, readOnly = false, children } = props;
  const { state, handleState } = useToggle();

  useEffect(() => {
    changeCheckedState && changeCheckedState(state);
  }, [state]);

  return (
    <div className="flex items-center w-full h-full ">
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

      {children}
    </div>
  );
}
