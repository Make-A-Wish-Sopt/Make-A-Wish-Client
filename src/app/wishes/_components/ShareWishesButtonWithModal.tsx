'use client';

import Button from '@/components/Elements/Button';
import { FixedBottomButtonWrapper } from '@/components/Elements/Button/FixedBottomButton';
import { useModalContent } from '@/hooks/useModalContent';

const ShareWishesButtonWithModal = ({ wishId, nickName }: { wishId: string; nickName: string }) => {
  const { Modal, ShareWishLinkModalContent, openModal } = useModalContent<['share']>();

  return (
    <Modal
      modalKey="share"
      Trigger={
        <FixedBottomButtonWrapper>
          <Button onClick={() => openModal('share')} className="z-30">
            {'생일잔치 링크 공유하기'}
          </Button>
        </FixedBottomButtonWrapper>
      }
    >
      <Modal.ModalOverlay>
        <Modal.ModalLayout className="flex justify-center items-center">
          <ShareWishLinkModalContent wishId={wishId} nickName={nickName} />
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    </Modal>
  );
};

export default ShareWishesButtonWithModal;
