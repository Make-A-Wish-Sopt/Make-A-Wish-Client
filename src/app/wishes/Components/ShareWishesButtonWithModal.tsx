'use client';

import Button from '@/components/Elements/Button';
import { FixedBottomButtonWrapper } from '@/components/Elements/Button/FixedBottomButton';
import { WishesPageModalKey } from '../page';
import useModals from '@/hooks/useModals';
import Image from 'next/image';
import InputText from '@/components/Elements/Input/inputText';
import { snsShareListArray } from '@/constant/model/snsShareList';
import { LinkCopyIc } from '@public/assets/icons';

const ShareWishesButtonWithModal = ({ wishId, nickName }: { wishId: string; nickName: string }) => {
  const { Modal, openModal } = useModals<WishesPageModalKey>();
  const wishLink = `sunmulzu.com/wishes/${wishId}`;

  async function handleAccountWishesLink() {
    try {
      await navigator.clipboard.writeText(wishLink);
      alert('링크가 복사됐어요!');
    } catch (error) {}
  }

  //링크 공유 텍스트 상황별로 변경되는거
  return (
    <>
      <Modal
        modalKey="share"
        Trigger={
          <FixedBottomButtonWrapper>
            <Button onClick={() => openModal('share')}>{'생일잔치 링크 공유하기'}</Button>
          </FixedBottomButtonWrapper>
        }
      >
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
      </Modal>
    </>
  );
};

export default ShareWishesButtonWithModal;
