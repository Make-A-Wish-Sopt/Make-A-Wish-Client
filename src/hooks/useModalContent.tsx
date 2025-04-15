'use client';

import Image from 'next/image';
import { PropsWithChildren } from 'react';
import InputText from '@/components/Elements/Input/inputText';
import { snsShareListArray } from '@/constant/model/snsShareList';
import { CakeMessageContent } from '@/app/wishes/_components/CakePresentList';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { CloseSmallIc, LinkCopyIc } from '@public/assets/icons';
import { VitaminCakeImg } from '@public/assets/images';
import clipboardCopy from '@/utils/clipboardCopy';
import useModals from './useModals';

const useModalContent = <T extends [string]>() => {
  const { Modal, openModal, ...rest } = useModals<T>();

  function PresentMessageModalContent({
    선물받은사람이름,
    cakePresentMessage,
  }: {
    선물받은사람이름: string;
    cakePresentMessage: ReceivedCakeTreeMessageDataType;
  }) {
    const { isAdminMessage, name } = cakePresentMessage;

    return (
      <Modal.ModalOverlay className="bg-background">
        <Modal.ModalLayout className="flex flex-col justify-center items-center">
          <Modal.ModalHeader className="flex flex-col" onCloseButton>
            <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">
              {`${name}님이\n${선물받은사람이름}님에게 남긴 편지에요\n이미지를 저장해보세요!`}
            </span>
          </Modal.ModalHeader>

          <Modal.ContentFrame
            className={`${isAdminMessage ? 'text-dark_blue' : 'text-white'} max-[412px]`}
            bgColor={isAdminMessage ? 'main_blue' : 'dark_green'}
          >
            <Modal.ContentBody className="flex flex-col items-center">
              <CakeMessageContent cakePresentMessage={cakePresentMessage} />
            </Modal.ContentBody>
          </Modal.ContentFrame>
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    );
  }

  function ConfirmModalContent({
    contentTitle,
    children,
  }: { contentTitle: string } & PropsWithChildren) {
    return (
      <Modal.ModalOverlay>
        <Modal.ModalLayout>
          <Modal.ContentFrame>
            <Modal.ContentHeader
              className="flex justify-end"
              CloseIcon={<Image src={CloseSmallIc} alt="닫기" />}
            />
            <Modal.ContentBody className="flex flex-col items-center w-full gap-20">
              <div className="flex flex-col items-center w-full">
                <Image src={VitaminCakeImg} alt="케이크 이미지" width={60} height={60} />
                <p className="font-bitbit text-[24px] text-background leading-none text-center whitespace-pre-line">
                  {contentTitle}
                </p>
              </div>
              {children}
            </Modal.ContentBody>
          </Modal.ContentFrame>
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    );
  }

  function ShareWishLinkModalContent({ wishId, nickName }: { wishId: string; nickName: string }) {
    const wishLink = `sunmulzu.com/wishes/${wishId}`;

    return (
      <Modal.ContentFrame>
        <Modal.ContentHeader
          className="flex justify-end -mb-25"
          CloseIcon={<Image src={CloseSmallIc} alt="닫기" />}
        />
        <Modal.ContentBody>
          <div className="flex gap-10 justify-center w-full p-10 mb-10">
            {snsShareListArray.map((snsItem) => (
              <button
                type="button"
                onClick={() => snsItem.onClick(wishLink, nickName)}
                key={snsItem.name}
              >
                <Image src={snsItem.image} alt="sns아이콘" />
              </button>
            ))}
          </div>

          <InputText onClick={() => clipboardCopy(wishLink)} value={wishLink} readOnly>
            <button type="button" onClick={() => clipboardCopy(wishLink)}>
              <Image src={LinkCopyIc} alt="링크복사" />
            </button>
          </InputText>
        </Modal.ContentBody>
      </Modal.ContentFrame>
    );
  }

  return {
    Modal,
    openModal,
    ShareWishLinkModalContent,
    PresentMessageModalContent,
    ConfirmModalContent,
    ...rest,
  };
};

export default useModalContent;
