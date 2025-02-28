'use client';

import Button from '@/components/Common/Button';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';
import { useRouters } from '@/hooks/common/useRouters';
import useToggle from '@/hooks/common/useToggle';
import { MainProgressDataType } from '@/types/wishesType';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { CloseBlueIc } from '../../../../public/assets/icons';

export default function WishesCreateDone({
  progressWishesData,
  nickName,
  tryGiveCakeMessage,
  shareBtnText,
  children,
}: {
  progressWishesData: MainProgressDataType;
  nickName: string;
  tryGiveCakeMessage: string;
  shareBtnText: string;
} & PropsWithChildren) {
  const { state: shareModalState, handleState: handleShareModalState } = useToggle();
  const { handleRouter } = useRouters();

  return (
    <>
      <div className="flex flex-row-reverse">
        <Image
          src={CloseBlueIc}
          alt="닫기"
          onClick={() => {
            handleRouter('/wishes');
          }}
        />
      </div>

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
        handleShareModalState={handleShareModalState}
        shareBtnText={shareBtnText}
        tryGiveCakeMessage={tryGiveCakeMessage}
        wishId={progressWishesData.wishId}
      />
    </>
  );
}

function SharePageFixedButtons({
  handleShareModalState,
  shareBtnText,
  tryGiveCakeMessage,
  wishId,
}: {
  handleShareModalState: () => void;
  disabled?: boolean;
  shareBtnText: string;
  tryGiveCakeMessage: string;
  wishId: string;
}) {
  const { handleRouter } = useRouters();

  return (
    <>
      <div className="flex flex-col gap-10">
        <Button
          onClick={() => {
            handleRouter(`/wishes/create?step=try&wishId=${wishId}`);
          }}
        >
          {shareBtnText}
        </Button>

        <Button bgColor="gray4" fontColor="white" onClick={handleShareModalState}>
          {tryGiveCakeMessage}
        </Button>
      </div>
    </>
  );
}
