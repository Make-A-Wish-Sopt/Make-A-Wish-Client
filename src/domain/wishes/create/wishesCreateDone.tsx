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
  disabled = false,
  shareBtnText,
  children,
}: {
  progressWishesData: MainProgressDataType;
  nickName: string;
  disabled?: boolean;
  shareBtnText: string;
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
      <SharePageFixedButtons
        handleClick={handleShareModalState}
        disabled={disabled}
        shareBtnText={shareBtnText}
      />
    </>
  );
}

function SharePageFixedButtons({
  handleClick,
  disabled = false,
  shareBtnText,
}: {
  handleClick: () => void;
  disabled?: boolean;
  shareBtnText: string;
}) {
  const { handleRouter } = useRouters();

  return (
    <>
      <div className="flex flex-col gap-10">
        <Button onClick={handleClick} disabled={disabled}>
          {shareBtnText}
        </Button>
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
