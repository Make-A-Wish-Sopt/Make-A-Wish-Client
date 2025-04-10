'use client';

import Button from '@/components/Elements/Button';
import useModalContent from '@/hooks/useModalContent';
import { useRouters } from '@/hooks/useRouters';
import { PropsWithChildren } from 'react';

export function PreviewGiftFlowButton({
  wishId,
  children,
}: { wishId: string } & PropsWithChildren) {
  const { handleRouter } = useRouters();

  return (
    <Button
      onClick={() => {
        handleRouter(`/wishes/preview/${wishId}`);
      }}
    >
      {children}
      생일잔치 체험해보기
    </Button>
  );
}

export function LinkShareSaveButton({
  children,
  wishId,
  nickName,
}: {
  wishId: string;
  nickName: string;
} & PropsWithChildren) {
  const { Modal, openModal, ShareWishLinkModalContent } = useModalContent<['share']>();

  return (
    <Modal
      modalKey="share"
      Trigger={
        <Button
          bgColor="gray4"
          fontColor="white"
          onClick={() => {
            openModal('share');
          }}
        >
          {children}
        </Button>
      }
    >
      <Modal.ModalOverlay>
        <Modal.ModalLayout>
          <ShareWishLinkModalContent wishId={wishId} nickName={nickName} />
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    </Modal>
  );
}
