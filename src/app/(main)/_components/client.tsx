'use client';

import useModals from '@/hooks/useModals';
import { GuideImg, MainCakeListImg } from '@public/assets/images';
import Image from 'next/image';

export function ServiceGuideModal() {
  const { Modal, openModal } = useModals<['guide']>();
  return (
    <Modal
      modalKey="guide"
      Trigger={
        <div className="flex flex-col items-center w-full">
          <Image
            src={MainCakeListImg}
            className="w-[85%]"
            onClick={() => openModal('guide')}
            alt="생일 케이크 이미지 모음"
            priority
            width={330}
            height={330}
          />
        </div>
      }
    >
      <Modal.ModalOverlay>
        <Modal.ModalLayout>
          <Image className="w-[85%]" src={GuideImg} alt="안내 이미지" />
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    </Modal>
  );
}
