'use client';

import Button from '@/components/Elements/Button';
import { FixedBottomButtonWrapper } from '@/components/Elements/Button/FixedBottomButton';
import ShareLinkModal from '@/components/Elements/Modal/ShareLinkModal';
import { useRouters } from '@/hooks/useRouters';
import useBoolean from '@/hooks/useBoolean';
import { MainProgressDataType } from '@/types/wishesType';
import { PropsWithChildren } from 'react';

export default function WishesCreateDone({
  progressWishesData,
  nickName,
  children,
}: {
  progressWishesData: MainProgressDataType;
  nickName: string;
} & PropsWithChildren) {
  const { state: shareModalState, handleState: handleShareModalState } = useBoolean();

  return (
    <>
      {children}
      {shareModalState && (
        <ShareLinkModal
          wishId={progressWishesData.wishId}
          nickName={nickName}
          modalState={shareModalState}
          handleModalState={handleShareModalState}
        />
      )}
      <SharePageFixedButtons handleClick={handleShareModalState} />
    </>
  );
}

function SharePageFixedButtons({ handleClick }: { handleClick: () => void }) {
  const { handleRouter } = useRouters();

  return (
    <>
      <div className="flex flex-col gap-10">
        <Button onClick={handleClick}>생일잔치에 친구 초대하기</Button>
        <Button
          bgColor="gray4"
          fontColor="white"
          onClick={() => {
            handleRouter('/wishes');
          }}
        >
          홈으로 이동하기
        </Button>
      </div>
    </>
  );
}
