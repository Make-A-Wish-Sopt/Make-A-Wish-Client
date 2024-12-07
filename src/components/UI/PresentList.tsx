'use client';

import { presentListArray } from '@/constant/model/present';
import useSelectItem from '@/hooks/common/useSelectItem';
import { convertMoneyText } from '@/utils/common/convert';
import Image from 'next/image';

export default function PresentList({
  changeGiftMenuId,
  readonly,
}: {
  changeGiftMenuId?: (id: number) => void;
  readonly?: boolean;
}) {
  const { isSelected, handleSelectOne } = useSelectItem();

  function handleSelectPresent(id: number) {
    if (readonly) return;

    handleSelectOne(id);
    changeGiftMenuId(id);
  }

  return (
    <div className="flex w-full flex-wrap gap-5 justify-between">
      {presentListArray.map((item) => (
        <div
          className={`flex flex-col items-center p-9 flex-grow flex-shrink basis-[calc(33%-10px)] ${
            isSelected(item.id) ? 'bg-main_blue text-black' : 'bg-dark_green text-white'
          }
            font-bitbit rounded-xl  text-[14px]`}
          onClick={() => handleSelectPresent(item.id)}
          key={item.id}
        >
          <Image src={item.image} alt="선물 이미지" />
          <span>{item.itemName}</span>
          <span>{convertMoneyText(item.price.toString())}원</span>
        </div>
      ))}
    </div>
  );
}
