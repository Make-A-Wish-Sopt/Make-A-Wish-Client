'use client';

import Button from '@/components/Common/Button';
import { FixedBottomButtonWrapper } from '@/components/Common/Button/FixedBottomButton';
import { WishesPageModalKey } from '../page';
import useModals from '@/hooks/common/useModals';
import Image from 'next/image';
import { VitaminCakeImg } from '@public/assets/images';
import InputText from '@/components/Common/Input/inputText';

const CreateWishesButtonWithModal = () => {
  const { Modal, openModal } = useModals<WishesPageModalKey>();

  return (
    <>
      <Modal
        modalKey="create"
        Trigger={
          <FixedBottomButtonWrapper>
            <Button onClick={() => openModal('create')}>{'생일잔치 링크 생성하기'}</Button>
          </FixedBottomButtonWrapper>
        }
      >
        <Modal.ModalOverlay>
          <Modal.ModalLayout className="flex justify-center items-center">
            <Modal.ContentFrame>
              <Modal.ContentHeader className="flex justify-end" onCloseButton />
              <Modal.ContentBody>
                <WishesCreateTitleInput />
              </Modal.ContentBody>
              <Modal.ButtonWrapper className="flex justify-center mt-20">
                <Button
                  bgColor="dark_green"
                  fontColor="white"
                  style={{ width: '13.8rem' }}
                  onClick={() => {}}
                >
                  입장하기
                </Button>
              </Modal.ButtonWrapper>
            </Modal.ContentFrame>
          </Modal.ModalLayout>
        </Modal.ModalOverlay>
      </Modal>
    </>
  );
};

export default CreateWishesButtonWithModal;

const WishesCreateTitleInput = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full ">
        <Image src={VitaminCakeImg} alt="케이크 이미지" width={60} height={60} className="mb-6" />
        <p className="font-bitbit text-[24px] text-background leading-none text-center whitespace-pre-line mb-20">
          {'생일잔치상 만들기'}
        </p>
        <div className="w-full">
          <label className="font-galmuri text-[14px] text-background mb-5">제목 정하기</label>
          <InputText
            // register={register('wishesTitle')}
            placeholder="ex) 에어팟맥스 받게 해주세요"
          />
        </div>
      </div>
    </>
  );
};
