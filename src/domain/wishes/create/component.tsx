import Image from 'next/image';
import { WishesFormPresentIc } from '../../../../public/assets/icons';
import { PropsWithChildren } from 'react';
import PresentList from '@/components/UI/PresentList';

export function WishesCreateTitleText({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-10 mt-26 mb-20">
      <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지" />
      <h1 className="font-bitbit text-main_blue text-[24px]">{children}</h1>
    </div>
  );
}
export function DropDownContent() {
  return (
    <div className="w-full  bg-background mt-12 px-12 py-14 rounded-xl">
      <span className="font-galmuri text-gray2 text-[14px]">
        현금으로 선물 받을 수 있는 항목이에요
      </span>
      <div className="w-full my-10 p-10 font-galmuri text-gray2 text-[12px] rounded-xl border border-dark_green">
        ※ 친구가 보게 될 화면이에요!
        <br />
        6개 중 하나를 선택해 선물할 수 있어요
      </div>

      <PresentList readonly />
    </div>
  );
}
