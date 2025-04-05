import { getMainProgressWishesData } from '@/api/wishes';
import ErrorPage from '@/app/error';
import Button from '@/components/Elements/Button';
import { Step } from '@/components/Modules/Funnel';
import { getLoginUserCookiesData } from '@/utils/common/cookies';
import { SharePageCakeImg } from '@public/assets/images';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import { LinkShareSaveButton, PreviewGiftFlowButton } from './WishCreateFinishForm.Client';

const WishCreateFinishForm = async () => {
  const progressWishesData = await getMainProgressWishesData();
  const { nickName } = await getLoginUserCookiesData();

  if (!progressWishesData) {
    return <ErrorPage alertMessage="진행중인 소원이 없어요!" errorText={'OPPS...'} />;
  }

  const { dayCount, status } = progressWishesData;

  const dDay = status === 'WHILE' ? dayCount : Math.abs(dayCount - 7);

  const getDayMessage = () => {
    if (status === 'WHILE') return '생일 축하 받으로 가볼까요?';
    if (status === 'BEFORE') return `${dayCount + 1}일 뒤부터 링크를 공유할 수 있어요`;

    return '';
  };

  const tryGiveCakeMessage =
    progressWishesData?.status === 'BEFORE' ? '링크 미리 저장해두기' : '바로 친구 초대하기';

  return (
    <>
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

      <Step.ButtonWrapper vertical className="gap-10">
        <PreviewGiftFlowButton />
        <LinkShareSaveButton wishId={progressWishesData.wishId} nickName={nickName}>
          {tryGiveCakeMessage}
        </LinkShareSaveButton>
      </Step.ButtonWrapper>
    </>
  );
};

export default WishCreateFinishForm;
