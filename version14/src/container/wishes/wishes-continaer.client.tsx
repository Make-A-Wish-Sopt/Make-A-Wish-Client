'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import { cakeDataList } from '@/constant/cakeData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StarImg } from '../../../public/assets/images';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';

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
          <>
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
                    key={item.id}
                    style={{ width: '105%' }}
                    onClick={() => console.log('hello')}
                  >
                    <Image src={item.image} alt="선물 이미지" />
                    <span className="font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl">
                      {item.itemName}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
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

export function WishesCreateBeforeCakesMessage() {
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  return (
    <h1 className="text-[24px] font-bitbit text-center text-white mt-10 whitespace-pre-wrap">
      {`${loginUserInfo.nickName}님, 친구들을 초대해\n케이크 접시를 꾸며봐요!`}
    </h1>
  );
}
