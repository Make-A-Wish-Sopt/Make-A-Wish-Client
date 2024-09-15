'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import { cakeDataList } from '@/constant/cakeData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StarImg } from '../../../public/assets/images';
import { useAuthContext } from '@/context/authContext';
import { useEffect, useState } from 'react';

export function WishesCreateBeforeCakesList() {
  return (
    <>
      <div className="relative w-375 h-screen mt-40">
        <Image
          src={StarImg}
          alt="별 이미지"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
          }}
        />
        {Array.from({ length: Math.ceil(cakeDataList.length / 3) }).map((_, rowIndex) => (
          <div
            className="absolute top-128 w-375 bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')] "
            key={rowIndex}
            style={{
              top: `${rowIndex * 165}px`, // 각 배경 이미지 행의 간격을 조정
              backgroundPosition: 'center 1px',
            }}
          >
            <ul className="grid grid-cols-3 justify-center gap-x-[1px] custom-grid w-full h-full mt-70 px-50">
              {cakeDataList.slice(rowIndex * 3, rowIndex * 3 + 3).map((item) => (
                <li
                  className="z-5 flex flex-col items-center aspect-square p-4 transform translate-y-[-30px] justify-self-center"
                  key={item.itemName}
                  style={{ width: '105%' }}
                >
                  <Image src={item.image} alt="선물 이미지" />
                  <span className="font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl">
                    {item.itemName}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export function WishesCreateButton() {
  const router = useRouter();
  const handleWishesCreate = () => {
    router.push('/wishes/create');
  };

  return (
    <FixedBottomButton bgColor="main_blue" fontColor="black" onClick={handleWishesCreate}>
      생일잔치 링크 생성하기
    </FixedBottomButton>
  );
}

export default function WishesCreateBeforeCakesMessage() {
  const { loginUserInfo } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loginUserInfo.nickName) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [loginUserInfo]);

  return (
    // <span className="text-[24px] font-bitbit text-center text-white mt-10 whitespace-pre-wrap">
    //   {`${loginUserInfo.nickName || 'ㅇㅇ'}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}
    // </span>
    <div className="text-[24px] font-bitbit text-center text-white mt-10 whitespace-pre-wrap">
      {isLoading ? (
        // 로딩 중 로딩 메시지 또는 간단한 UI
        <div className="text-white transition-opacity duration-500 opacity-80">로딩 중...</div>
      ) : (
        // 페이드 인 효과를 적용한 실제 텍스트
        <span className="transition-opacity duration-500 opacity-100">{`${
          isLoading ? 'ㅇㅇ' : loginUserInfo.nickName
        }님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}</span>
      )}
    </div>
  );
}
