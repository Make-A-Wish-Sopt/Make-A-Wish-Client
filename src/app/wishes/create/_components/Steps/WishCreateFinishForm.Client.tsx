'use client';

import Button from '@/components/Elements/Button';
import { PropsWithChildren } from 'react';
import { useModalContent } from '@/hooks/useModalContent';
import { useRouters } from '@/hooks/useRouters';

export const PreviewGiftFlowButton = ({ children }: PropsWithChildren) => {
  const { handleRouter } = useRouters();

  return (
    <Button
      onClick={() => {
        handleRouter('/wishes/preview');
      }}
    >
      {children}
      생일잔치 체험해보기
    </Button>
  );
};

export const LinkShareSaveButton = ({
  children,
  wishId,
  nickName,
}: {
  wishId: string;
  nickName: string;
} & PropsWithChildren) => {
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
      <ShareWishLinkModalContent wishId={wishId} nickName={nickName} />
    </Modal>
  );
};
