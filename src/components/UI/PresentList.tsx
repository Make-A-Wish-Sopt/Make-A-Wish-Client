import { presentList } from '@/constant/presentList';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import Image from 'next/image';
import { useState } from 'react';

export default function PresentList({ readonly }: { readonly?: boolean }) {
  const [selectedId, setSelectedId] = useState(0);

  function handleClick(id: number) {
    if (readonly) return;

    setSelectedId(id);
  }

  function isSelected(id: number) {
    return selectedId === id;
  }

  return (
    <div className="flex w-full flex-wrap gap-5 justify-between">
      {presentList.map((item) => (
        <div
          className={`flex flex-col items-center p-9 flex-grow flex-shrink basis-[calc(33%-10px)] ${
            isSelected(item.id) ? 'bg-main_blue text-black' : 'bg-dark_green text-white'
          }
            font-bitbit rounded-xl`}
          onClick={() => handleClick(item.id)}
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
