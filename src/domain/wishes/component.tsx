'use client';

import { CakeTreeDataType, defaultCakeTreeDataObject } from '@/constant/model/cakesTreeData';
import Image from 'next/image';
import { CakeDishTopRibbonImg } from '../../../public/assets/images';
import { PropsWithChildren } from 'react';
import CloseIconInModalWithVitaminCake from '@/components/Common/Modal/CloseIconInModalWithVitaminCake';
import CloseTopModal from '@/components/Common/Modal/CloseTopModal';
import { presentListObject } from '@/constant/model/present';
import { CakePresentMessageDataType } from '@/types/api/response';
import { convertMoneyText } from '@/utils/common/convert';
import ShareLinkModal from '@/components/Common/Modal/ShareLinkModal';

export function CakeMessageModalUI({
  modalState,
  handleModalState,
  messageData,
  nickName,
  children,
}: {
  modalState: boolean;
  handleModalState: () => void;
  messageData: CakePresentMessageDataType & { isAdminMessage: boolean };
  nickName: string;
} & PropsWithChildren) {
  const { cakeId, message, name, isAdminMessage, giftMenuId } = messageData;

  return (
    <CloseTopModal isOpen={modalState} handleState={handleModalState} bgColor={'background'}>
      <div className={`flex flex-col items-center w-full h-full font-galmuri`}>
        <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">{`${name}님이\n${nickName}님에게 남긴 편지에요\n이미지를 저장해보세요!`}</span>
        <div
          className={`flex flex-col items-center w-full h-full p-20  rounded-2xl  ${
            isAdminMessage ? 'bg-main_blue text-dark_blue ' : 'bg-dark_green text-white'
          }`}
        >
          <span
            className={`text-[16px] px-14 py-8 ${
              isAdminMessage ? 'bg-white' : 'bg-black '
            } bg-opacity-50 rounded-4xl`}
          >
            {name}
          </span>
          <Image
            src={defaultCakeTreeDataObject[cakeId].cakeImg}
            alt="보낸 케이크 아바타 이미지"
            width={160}
          />
          <span className="h-110 text-[14px] mb-13 text-center whitespace-pre-wrap ">
            {message}
          </span>

          <div
            className={`flex justify-between items-center w-full h-54 p-12 rounded-xl border  font-bitbit text-[16px] ${
              isAdminMessage ? 'border-dark_blue' : 'border-main_blue'
            }`}
          >
            <span className="font-galmuri">선물한 항목</span>
            <span>
              {isAdminMessage ? (
                giftMenuId
              ) : giftMenuId === 0 ? (
                <>{'정성 담은 편지'}</>
              ) : (
                <>
                  <div className="flex gap-4 items-center font-bitbit text-[16px] text-white">
                    <Image
                      src={presentListObject[Number(giftMenuId)].image}
                      alt="선물한 선물 이미지"
                      height={43}
                    />
                    {`${presentListObject[Number(giftMenuId)].itemName} ${convertMoneyText(
                      presentListObject[Number(giftMenuId)].price.toString(),
                    )}원`}
                  </div>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      {children}
    </CloseTopModal>
  );
}

export function MessageText({ children }: PropsWithChildren) {
  return (
    <div className="text-[24px] font-bitbit text-center text-white whitespace-pre-wrap">
      <span className="transition-opacity duration-500 opacity-100 leading-tight">{children}</span>
    </div>
  );
}

export function WishesCreateTitleInputModalContainer({
  isOpen,
  handleState,
  children,
}: {
  isOpen: boolean;
  handleState: () => void;
} & PropsWithChildren) {
  return (
    <CloseIconInModalWithVitaminCake
      modalTitle="생일 잔치상 만들기"
      isOpen={isOpen}
      handleState={handleState}
    >
      {children}
    </CloseIconInModalWithVitaminCake>
  );
}

export function CakeTree({
  cakeList,
  handleSelectOne,
  handleSetCakeData,
}: {
  cakeList: CakeTreeDataType[];
  handleSelectOne: (id: number) => void;
  handleSetCakeData?: (cake: CakeTreeDataType) => void;
}) {
  const numberOfRows = Math.max(4, Math.ceil(cakeList.length / 3 - 1));

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-375 h-screen mt-40">
        {/* 케이크 상단의 리본이미지 */}
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

        {/* 케이크 접시 구성 */}
        {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
          <div
            className="absolute top-128 w-375 h-222 bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')]"
            key={rowIndex}
            style={{
              top: `${rowIndex * 165}px`,
              backgroundPosition: 'center 1px',
            }}
          >
            {/* 층별로 3개씩 케이크 배치 */}
            <ul className="grid grid-cols-3 justify-center gap-x-[1px] custom-grid w-full h-full mt-70 px-50">
              {cakeList.slice(rowIndex * 3, rowIndex * 3 + 3).map((cake) => (
                <li
                  className="z-5 flex flex-col items-center aspect-square p-4 transform translate-y-[-30px] justify-self-center"
                  key={cake.name}
                  onClick={() => {
                    handleSelectOne(cake.presentId);
                    handleSetCakeData(cake);
                  }}
                  style={{ width: '105%' }}
                >
                  <Image src={cake.cakeImg} alt="케이크 이미지" />
                  <span className="font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl">
                    {cake.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
