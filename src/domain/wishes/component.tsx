'use client';

import { CakeTreeDataType, defaultCakeTreeDataArray } from '@/constant/model/cakesTreeData';
import Image from 'next/image';
import { CakeDishTopRibbonImg } from '../../../public/assets/images';
import { PropsWithChildren } from 'react';
import CloseIconInModal from '@/components/Common/Modal/CloseIconInModal';

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
    <CloseIconInModal modalTitle="생일 잔치상 만들기" isOpen={isOpen} handleState={handleState}>
      {children}
    </CloseIconInModal>
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
  const numberOfRows = Math.max(4, Math.ceil(cakeList.length / 3));

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
