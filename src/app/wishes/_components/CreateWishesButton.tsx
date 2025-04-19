'use client';

import Button from '@/components/Elements/Button';
import Image from 'next/image';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useRouters } from '@/hooks/useRouters';
import { CloseSmallIc } from '@public/assets/icons';
import Box from '@/components/Elements/Box';
import InputField from '@/components/Elements/Input/InputField';
import ItemWrapper from '@/components/Elements/Button/FixedBottomButton';
import useModalContent from '@/hooks/useModalContent';
import { LoadingCake } from '@/components/UI/Loading';

function WishesCreateTitleInput() {
  const methods = useFormContext<{ wishTitle: string }>();
  const { register } = methods;

  const { handleRouter, handleDelayRouter, LoadingModal } = useRouters();

  const handleModalSubmit = () => {
    const wishTitle = methods.getValues('wishTitle');

    if (wishTitle) {
      handleDelayRouter(`/wishes/create?wishTitle=${wishTitle}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const wishTitle = methods.getValues('wishTitle');
      if (wishTitle) {
        handleRouter(`/wishes/create?&wishTitle=${wishTitle}`);
      }
    }
  };

  return (
    <>
      <LoadingModal render={<LoadingCake text="입장 중" />} />
      <div className="w-full ">
        <label className="font-galmuri text-[14px] text-background mb-5">제목 정하기</label>
        <Box bgColor="sub_blue">
          <InputField
            register={{
              ...register('wishTitle'),
            }}
            placeholder="ex) 에어팟맥스 받게 해주세요"
            onKeyDown={handleKeyDown}
            className="plachoder-gray1"
            autoFocus
          />
        </Box>
      </div>

      <ItemWrapper className="flex justify-center">
        <Button
          bgColor="dark_green"
          fontColor="white"
          style={{ width: '13.8rem' }}
          onClick={handleModalSubmit}
        >
          입장하기
        </Button>
      </ItemWrapper>
    </>
  );
}

export default function CreateWishesButton() {
  const { Modal, openModal, ConfirmModalContent } = useModalContent<['create']>();
  const createWishMethods = useForm<{ wishTitle: string }>({
    mode: 'onChange',
    defaultValues: {
      wishTitle: '',
    },
  });

  return (
    <Modal
      modalKey="create"
      Trigger={<Button onClick={() => openModal('create')}>생일잔치 링크 생성하기</Button>}
    >
      <Modal.ModalOverlay>
        <Modal.ModalLayout className="flex justify-center items-center">
          <Modal.ContentFrame>
            <Modal.ContentHeader
              className="flex justify-end"
              CloseIcon={<Image src={CloseSmallIc} alt="닫기" />}
            />
            <ConfirmModalContent contentTitle="생일잔치상 만들기">
              <FormProvider {...createWishMethods}>
                <WishesCreateTitleInput />
              </FormProvider>
            </ConfirmModalContent>
          </Modal.ContentFrame>
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    </Modal>
  );
}
