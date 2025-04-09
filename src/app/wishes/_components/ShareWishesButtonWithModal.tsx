'use client';

import Button from '@/components/Elements/Button';
import { useModalContent } from '@/hooks/useModalContent';

export const ShareWishesButton = ({
  wishId,
  nickName,
  buttonText,
}: {
  wishId: string;
  nickName: string;
  buttonText: string;
}) => {
  const { Modal, ShareWishLinkModalContent, openModal } = useModalContent<['share']>();

  return (
    <Modal
      modalKey="share"
      Trigger={<Button onClick={() => openModal('share')}>{buttonText}</Button>}
    >
      <Modal.ModalOverlay>
        <Modal.ModalLayout className="flex justify-center items-center">
          <ShareWishLinkModalContent wishId={wishId} nickName={nickName} />
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    </Modal>
  );
};
