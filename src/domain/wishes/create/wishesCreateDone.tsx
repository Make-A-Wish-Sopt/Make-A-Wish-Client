'use client';

import Button from '@/components/Common/Button';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
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
  const { state: shareModalState, handleState: handleShareModalState } = useToggle();

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
      <FixedBottomButtonWrapper>
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
      </FixedBottomButtonWrapper>
    </>
  );
}
