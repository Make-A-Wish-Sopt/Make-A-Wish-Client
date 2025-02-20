import Image from 'next/image';
import { WishesFormPresentIc } from '../../../../public/assets/icons';
import { PropsWithChildren } from 'react';
import { PresentListSample } from '@/components/UI/PresentList';
import { SharePageCakeImg } from '../../../../public/assets/images';

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
    <div className="w-full px-10 pb-12">
      <div className="w-full  bg-background  px-12 py-14 rounded-xl">
        <span className="font-galmuri text-gray2 text-[14px]">
          현금으로 선물 받을 수 있는 항목이에요
        </span>
        <div className="w-full my-15" />

        <PresentListSample />
      </div>
    </div>
  );
}

export function WishesCreateDoneMessage({
  nickName,
  dDayMessage,
}: {
  nickName: string;
  dDayMessage: string;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bitbit text-[24px] text-main_blue mt-13 mb-20 leading-10 text-center">
        {nickName}의 생일잔치
        <br />
        링크 생성 완료!{' '}
      </h1>
      <span className="font-galmuri text-[14px] text-white mb-44">{dDayMessage}</span>
      <Image src={SharePageCakeImg} alt="링크생성 완료 케이크 이미지" width={221} />
    </div>
  );
}
