'use client';

import { getCakePresentMessage } from '@/api/cakes';
import { ReceivedCakeTreeMessageDataType } from '@/constant/model/cakesTreeData';
import { presentListObject } from '@/constant/model/present';
import useModals from '@/hooks/useModals';
import convertMoneyText from '@/utils/regex';
import { GiftBoxIc } from '@public/assets/icons';
import { CakeDishTopRibbonImg } from '@public/assets/images';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

const cakeNameStyle =
  'absolute top-[100px] font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl -mt-13 truncate';

export function CakeTreeLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-375 h-screen mt-40">
        <Image
          src={CakeDishTopRibbonImg}
          alt="케이크 꾸미기 리본 이미지"
          width={96}
          height={68}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '2rem',
            zIndex: 5,
          }}
        />
        {children}
      </div>
    </div>
  );
}

export function CakeMessageContent({
  cakePresentMessage,
}: {
  cakePresentMessage: ReceivedCakeTreeMessageDataType;
}) {
  const { cakeImg, giftMenuId, isAdminMessage, message, name } = cakePresentMessage;

  return (
    <>
      <p
        className={`flex justify-center items-center text-[16px] px-14 py-8 ${
          isAdminMessage ? 'bg-light_blue' : 'bg-black '
        } bg-opacity-50 rounded-4xl font-galmuri mb-11`}
      >
        {name}
      </p>

      <Image
        src={cakeImg}
        alt="보낸 케이크 아바타 이미지"
        width={160}
        height={160}
        style={{ objectFit: 'contain' }}
        loading="eager"
      />

      <p className="max-[340px] text-[14px] mb-13 text-center whitespace-pre-wrap font-galmuri">
        {message}
      </p>

      <div
        className={`flex justify-center items-center w-full h-54 p-12 rounded-xl font-bitbit text-[16px] ${
          isAdminMessage ? 'bg-light_blue' : 'bg-black'
        } bg-opacity-50`}
      >
        {isAdminMessage || giftMenuId === 0 ? (
          <div className="flex gap-4 items-center font-bitbit text-[16px]">
            <Image src={GiftBoxIc} alt="선물박스 아이콘" />
            <p>선물 | </p>
            <p>정성 담은 편지</p>
          </div>
        ) : (
          <div className="flex gap-4 items-center font-bitbit text-[16px] text-white">
            <div className="flex align-center h-full gap-4">
              <Image src={GiftBoxIc} alt="선물박스 아이콘" />
              <p>선물 | </p>
            </div>
            <Image
              src={presentListObject[Number(giftMenuId)].image}
              alt="선물한 선물 이미지"
              height={30}
            />
            <p>
              {`${presentListObject[Number(giftMenuId)].itemName}\n${convertMoneyText(
                presentListObject[Number(giftMenuId)].price.toString(),
              )}원`}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export function CakePresentList({
  cakeList,
  readonly = false,
  nickName,
  wishId,
}: {
  cakeList: ReceivedCakeTreeMessageDataType[];
  readonly?: boolean;
  nickName?: string;
  wishId?: string;
}) {
  const numberOfRows = Math.max(4, Math.floor((cakeList.length - 1) / 3) + 1);
  const { Modal, openModal } = useModals<['cakeMessage']>();
  const [cakePresentMessage, setCakePresentMessage] =
    useState<ReceivedCakeTreeMessageDataType | null>(null);

  async function handleSelectCake(cake: ReceivedCakeTreeMessageDataType) {
    if (readonly || !wishId) return;

    try {
      if (cake.presentId > 0) {
        const response = await getCakePresentMessage(wishId, cake.presentId);
        setCakePresentMessage({
          ...response,
          cakeImg: cake.cakeImg,
          isAdminMessage: false,
          presentId: cake.presentId,
        });
      } else {
        setCakePresentMessage({ ...cake });
      }
      openModal('cakeMessage');
    } catch (error) {
      toast.error('케이크 메세지를 가져오는 중 에러가 발생했어요ㅠㅠ');
    }
  }

  return (
    <>
      <CakeTreeLayout>
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <div
            className="absolute top-128 w-375 h-222 bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')]"
            key={`dish-${rowIndex}`}
            style={{
              top: `${rowIndex * 165}px`,
              backgroundPosition: 'center 1px',
            }}
          >
            <ul className="grid grid-cols-3 justify-center gap-x-[-10px] custom-grid w-full h-full mt-70 px-65">
              {cakeList.slice(rowIndex * 3, rowIndex * 3 + 3).map((cake) => (
                <li key={`cake-${cake.cakeId}`} className="justify-self-center">
                  <button
                    type="button"
                    onClick={() => handleSelectCake(cake)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleSelectCake(cake);
                    }}
                    className="relative z-10 flex flex-col items-center w-100 aspect-square transform translate-y-[-30px] cursor-pointer"
                  >
                    <Image src={cake.cakeImg} alt="케이크 이미지" width={100} />
                    <span className={cakeNameStyle}>
                      {cake.name.length > 10 ? `${cake.name.slice(0, 9)}...님` : `${cake.name}님`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CakeTreeLayout>

      {cakePresentMessage && (
        <Modal modalKey="cakeMessage">
          <Modal.ModalOverlay bgColor="background">
            <Modal.ModalLayout className="flex flex-col justify-center items-center">
              <Modal.ModalHeader className="flex flex-col" onCloseButton>
                <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">
                  {`${cakePresentMessage.name}님이\n${nickName}님에게 남긴 편지에요\n이미지를 저장해보세요!`}
                </span>
              </Modal.ModalHeader>
              <Modal.ContentFrame
                className={cakePresentMessage.isAdminMessage ? 'text-dark_blue' : 'text-white'}
                bgColor={cakePresentMessage.isAdminMessage ? 'main_blue' : 'dark_green'}
              >
                <Modal.ContentBody className="flex flex-col items-center">
                  <CakeMessageContent cakePresentMessage={cakePresentMessage} />
                </Modal.ContentBody>
                <Modal.ButtonWrapper className="flex justify-center mt-20" />
              </Modal.ContentFrame>
            </Modal.ModalLayout>
          </Modal.ModalOverlay>
        </Modal>
      )}
    </>
  );
}
