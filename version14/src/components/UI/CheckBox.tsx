'use client';

import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { CheckedBoxIc, UnCheckedBoxIc } from '../../../public/assets/icons';

interface CheckBoxProps {
  checkBoxState: boolean;
  checkBoxText: string;
  handleClickFn: () => void;
}

export default function CheckBox(props: PropsWithChildren<CheckBoxProps>) {
  const { checkBoxState, checkBoxText, handleClickFn } = props;
  return (
    <div className="flex items-center h-full">
      {checkBoxState ? (
        <Image src={CheckedBoxIc} alt="체크박스 아이콘" onClick={handleClickFn} />
      ) : (
        <Image src={UnCheckedBoxIc} alt="체크박스 아이콘" onClick={handleClickFn} />
      )}
      <span className="text-main_blue font-galmuri text-[14px] ml-8">{checkBoxText}</span>
    </div>
  );
}
