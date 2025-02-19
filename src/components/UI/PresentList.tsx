'use client';

import { presentListArray } from '@/constant/model/present';
import useSelectItem from '@/hooks/common/useSelectItem';
import { convertMoneyText } from '@/utils/common/convert';
import Image from 'next/image';
import { PropsWithChildren, useEffect } from 'react';

export default function PresentList({
  selectedGiftMenuId,
  changeGiftMenuId,
  messageOnlyOption,
  readonly,
  children,
}: {
  selectedGiftMenuId?: number;
  changeGiftMenuId?: (id: number) => void;
  messageOnlyOption?: boolean;
  readonly?: boolean;
} & PropsWithChildren) {
  const { isSelected, handleSelectOne } = useSelectItem();

  function handleSelectPresent(id: number) {
    if (readonly) return;

    changeGiftMenuId(id);
  }

  useEffect(() => {
    handleSelectOne(selectedGiftMenuId);
  }, [selectedGiftMenuId]);

  return (
    <>
      <div
        className="grid grid-cols-3 gap-6 w-full duration-200"
        style={{
          transition: '0.5s ease-out, opacity 0.2s ease-out',
          visibility: messageOnlyOption ? 'hidden' : 'visible',
          opacity: messageOnlyOption ? 0 : 1,
          height: messageOnlyOption ? 0 : '236px',
        }}
      >
        {presentListArray.map((item) => (
          <div
            className={`flex flex-col items-center p-9  ${
              isSelected(item.id) ? 'bg-main_blue text-black' : 'bg-dark_green text-white'
            }
            font-bitbit rounded-xl text-[14px]`}
            onClick={() => handleSelectPresent(item.id)}
            key={item.id}
          >
            <Image src={item.image} alt="선물 이미지" width={56} />
            <span>{item.itemName}</span>
            <span>{convertMoneyText(item.price.toString())}원</span>
          </div>
        ))}
      </div>
      {children}
    </>
  );
}

export function PresentListSample() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {presentListArray.map((item) => (
        <div
          className={`flex flex-col items-center p-9 font-bitbit rounded-xl text-[12px] `}
          style={{ backgroundColor: '#08232B' }}
          key={item.id}
        >
          <Image src={item.image} alt="선물 이미지" width={56} />
          <span className="opacity-70">{item.itemName}</span>
          <span className="opacity-70">{convertMoneyText(item.price.toString())}원</span>
        </div>
      ))}
    </div>
  );
}
