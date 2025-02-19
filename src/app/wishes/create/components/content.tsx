import Image from 'next/image';

import { PropsWithChildren } from 'react';
import { PresentListSample } from '@/components/UI/PresentList';
import { WishStatusType } from '@/types/wishesType';
import { WishesFormPresentIc } from '@assets/icons';
import { SharePageCakeImg } from '@assets/images';
import { checkComp } from '@/utils/common/checkComponent';

export function WishesCreateTitleText({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center gap-10 mt-26 mb-20">
      <Image src={WishesFormPresentIc} alt="선물 아이콘 이미지" />
      <h1 className="font-bitbit text-main_blue text-[24px]">{children}</h1>
    </div>
  );
}
export default function DropDownContent() {
  return (
    <div className="w-full px-10 pb-12">
      <div className="w-full  bg-background  px-12 py-14 rounded-xl">
        <span className="font-galmuri text-gray2 text-[14px]">
          현금으로 선물 받을 수 있는 항목이에요
        </span>
        <div className="w-full my-10 p-10 font-galmuri text-gray2 text-[12px] rounded-xl border border-dark_green">
          ※ 친구가 보게 될 화면이에요!
          <br />
          6개 중 하나를 선택해 선물할 수 있어요
        </div>

        <PresentListSample />
      </div>
    </div>
  );
}

export function WishesCreateDoneMessage({
  nickName,
  status,
  dDay,
}: {
  nickName: string;
  status: WishStatusType;
  dDay: number;
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bitbit text-[24px] text-main_blue mt-76 mb-20 leading-10 text-center">
        {nickName}의 생일잔치
        <br />
        링크 생성 완료!{' '}
      </h1>
      <span className="font-galmuri text-[14px] text-white mb-44">
        {status === 'WHILE' && '생일 축하 받으로 가볼까요?'}
        {status === 'BEFORE' && `${dDay}일 뒤부터 링크를 공유할 수 있어요`}
      </span>
      <Image src={SharePageCakeImg} alt="링크생성 완료 케이크 이미지" width={221} />
    </div>
  );
}
