'use client';

import { cakeImageWithId, CakeItemType } from '@/constant/model/cakes';
import Image from 'next/image';
import { CakeDishTopRibbonImg } from '../../../public/assets/images';
import useToggle from '@/hooks/common/useToggle';
import useSelectItem from '@/hooks/common/useSelectItem';

export function CakesTree({ cakeList }: { cakeList: CakeItemType[] }) {
  const numberOfRows = Math.max(4, Math.ceil(cakeList.length / 3));
  const { toggleState, handleToggle } = useToggle();
  const { selectedId: selectedPresentId, handleSelectOne } = useSelectItem();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-375 h-screen mt-40">
        {/* 케이크 상단의 리본이미지 */}
        <CakesTreeTopDecorationImg />

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
                    handleToggle();
                  }}
                  style={{ width: '105%' }}
                >
                  <Image src={cakeImageWithId[cake.cakeId]} alt="선물 이미지" />
                  <span className="font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl">
                    {cake.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* {toggleState && selectedPresentId > 0 && (
        <CakeMessageModal
          // wishId={loginUserInfo.wishId}
          wishId={'205'}
          presentId={selectedPresentId}
          toggleState={toggleState}
          handleToggle={handleToggle}
        />
      )} */}
    </div>
  );
}

function CakesTreeTopDecorationImg() {
  return (
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
  );
}
