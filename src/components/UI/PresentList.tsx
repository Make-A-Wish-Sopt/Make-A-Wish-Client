'use client';

import { presentList } from '@/constant/model/present';
import useSelectItem from '@/hooks/common/useSelectItem';
import { convertMoneyText } from '@/utils/common/convert';
import Image from 'next/image';

export default function PresentList({
  changeGiftMenutId,
  readonly,
}: {
  changeGiftMenutId?: (id: number) => void;
  readonly?: boolean;
}) {
  const { isSelected, handleSelectOne } = useSelectItem();

  function handleSelectPresent(id: number) {
    if (readonly) return;

    handleSelectOne(id);
    changeGiftMenutId(id);
  }

  return (
    <div className="flex w-full flex-wrap gap-5 justify-between">
      {presentList.map((item) => (
        <div
          className={`flex flex-col items-center p-9 flex-grow flex-shrink basis-[calc(33%-10px)] ${
            isSelected(item.id) ? 'bg-main_blue text-black' : 'bg-dark_green text-white'
          }
            font-bitbit rounded-xl`}
          onClick={() => handleSelectPresent(item.id)}
          key={item.id}
        >
          <Image src={item.image} alt="선물 이미지" />
          <span className="font-bitbit text-[12px]">{item.itemName}</span>
          <span className="font-bitbit text-[12px]">
            {convertMoneyText(item.price.toString())}원
          </span>
        </div>
      ))}
    </div>
  );
}
