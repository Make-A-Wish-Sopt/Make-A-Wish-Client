'use client';

import CheckBox from '@/components/UI/CheckBox';
import { PropsWithChildren } from 'react';

export default function DisclaimerNotice({
  changeCheckedState,
  children,
}: { changeCheckedState: (state: boolean) => void } & PropsWithChildren) {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl">
      {children}
      <div className="flex justify-end w-full h-20">
        <div className="flex justify-end">
          <CheckBox changeCheckedState={changeCheckedState}>
            <span className="font-galmuri text-[14px] text-main_blue ml-8">{'동의함'}</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
}
