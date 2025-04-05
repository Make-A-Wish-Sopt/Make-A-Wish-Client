'use client';

import { snsShareListArray } from '@/constant/model/snsShareList';
import useModals from './useModals';
import Image from 'next/image';
import InputText from '@/components/Elements/Input/inputText';
import { LinkCopyIc } from '@public/assets/icons';
import { CakeMessageContent } from '@/app/wishes/Components/CakePresentList';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';

export const useShareModal = <T extends [string]>() => {
  const { Modal, openModal, ...rest } = useModals<T>();

  const PresentMessageModalContent = ({
    선물받은사람이름,
    cakePresentMessage,
  }: {
    선물받은사람이름: string;
    cakePresentMessage: ReceivedCakeTreeMessageDataType;
  }) => {
    const { isAdminMessage, name } = cakePresentMessage;

    return (
      <Modal.ModalOverlay bgColor="background">
        <Modal.ModalLayout className="flex flex-col justify-center items-center">
          <Modal.ModalHeader className="flex flex-col" onCloseButton>
            <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">
              {`${name}님이\n${선물받은사람이름}님에게 남긴 편지에요\n이미지를 저장해보세요!`}
            </span>
          </Modal.ModalHeader>

          <Modal.ContentFrame
            className={`${isAdminMessage ? 'text-dark_blue' : 'text-white'}`}
            bgColor={isAdminMessage ? 'main_blue' : 'dark_green'}
          >
            <Modal.ContentBody className="flex flex-col items-center">
              <CakeMessageContent cakePresentMessage={cakePresentMessage} />
            </Modal.ContentBody>
            <Modal.ButtonWrapper className="flex justify-center mt-20"></Modal.ButtonWrapper>
          </Modal.ContentFrame>
        </Modal.ModalLayout>
      </Modal.ModalOverlay>
    );
  };

  const ShareWishLinkModalContent = ({
    wishId,
    nickName,
  }: {
    wishId: string;
    nickName: string;
  }) => {
    const wishLink = `sunmulzu.com/wishes/${wishId}`;

    async function handleAccountWishesLink() {
      try {
        await navigator.clipboard.writeText(wishLink);
        alert('링크가 복사됐어요!');
      } catch (error) {}
    }

    return (
      <>
        <Modal.ModalOverlay>
          <Modal.ModalLayout className="flex justify-center items-center">
            <Modal.ContentFrame>
              <Modal.ContentHeader className="flex justify-end" onCloseButton />
              <Modal.ContentBody>
                <div className="flex gap-10 justify-center w-full p-10 mb-10">
                  {snsShareListArray.map((snsItem) => (
                    <button
                      onClick={() => {
                        snsItem.onClick(wishLink, nickName);
                      }}
                      key={snsItem.name}
                    >
                      <Image src={snsItem.image} alt="sns아이콘" />
                    </button>
                  ))}
                </div>

                <InputText onClick={handleAccountWishesLink} value={wishLink} readOnly>
                  <button onClick={handleAccountWishesLink}>
                    <Image src={LinkCopyIc} alt="링크복사" />
                  </button>
                </InputText>
              </Modal.ContentBody>
            </Modal.ContentFrame>
          </Modal.ModalLayout>
        </Modal.ModalOverlay>
      </>
    );
  };

  return { Modal, openModal, ShareWishLinkModalContent, PresentMessageModalContent, ...rest };
};
