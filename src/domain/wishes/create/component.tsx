import Image from 'next/image';
import { WishesFormPresentIc } from '../../../../public/assets/icons';
import { PropsWithChildren } from 'react';
import PresentList, { PresentListSample } from '@/components/UI/PresentList';
import {
  PayCodeGuideStep1Img,
  PayCodeGuideStep2Img,
  PayCodeGuideStep3Img,
  SharePageCakeImg,
} from '../../../../public/assets/images';
import { WishStatusType } from '@/types/wishesType';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';

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

      <PresentListSample />
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

export function PayCodeGuideModal({
  modalState,
  handleModalState,
}: {
  modalState: boolean;
  handleModalState: () => void;
}) {
  return (
    <CloseIconInModal isOpen={modalState} handleState={handleModalState}>
      <h2 className="font-bitbit text-[24px] text-background text-center mb-20">
        송금코드 가져오는 법
      </h2>
      <ul className="flex flex-col gap-6">
        <li>
          <Image src={PayCodeGuideStep1Img} alt="송금코드 가져오기 단계1 이미지" />
        </li>
        <li>
          <Image src={PayCodeGuideStep2Img} alt="송금코드 가져오기 단계1 이미지" />
        </li>
        <li>
          <Image src={PayCodeGuideStep3Img} alt="송금코드 가져오기 단계1 이미지" />
        </li>
      </ul>
    </CloseIconInModal>
  );
}
