import { getCakePresentMessage } from '@/api/cakes';
import { CakeTreeDataType, defaultCakeTreeDataObject } from '@/constant/model/cakesTreeData';
import useSelectItem from '@/hooks/common/useSelectItem';
import Image from 'next/image';
import { useEffect } from 'react';
import { CakeDishTopRibbonImg } from '../../../../public/assets/images';

export default function PresentSuccess({
  giverName,
  wishesName,
}: {
  giverName: string;
  wishesName: string;
}) {
  return (
    <div className="flex flex-col items-center w-full h-full mt-65">
      <span className="text-white font-bitbit text-[24px] whitespace-pre-wrap text-center leading-tight mt-2 mb-40">
        {`${giverName}님,\n${wishesName}의 생일잔치에\n와주셔서 감사해요!`}
      </span>
    </div>
  );
}

export function PresentSuccessCakeTree({ cakeList }: { cakeList: CakeTreeDataType[] }) {
  const numberOfRows = Math.max(4, Math.ceil(cakeList.length / 3 - 1));
  const wishId = '254';

  const { selectedId: selectedPresentId, handleSelectOne } = useSelectItem();
  console.log(selectedPresentId);

  const [firstCake, ...restCake] = cakeList;

  useEffect(() => {
    if (selectedPresentId > 0) {
      getCakePresentMessage(wishId, selectedPresentId).then((response) => {
        console.log(response);
        // setCakePresentMessageData(response);
      });
    }
  }, [selectedPresentId]);

  return (
    <>
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
          <div
            className="absolute top-128 flex justify-center w-375 h-222  bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')]"
            style={{
              top: `${0}px`,
            }}
          >
            <Image
              src={firstCake.cakeImg}
              alt="선물보낸 케이크 이미지"
              width={187}
              style={{ transform: 'translate(0%, -10%)', zIndex: 100 }}
            />
          </div>

          {/* 케이크 접시 구성 */}
          {Array.from({ length: numberOfRows }).map((_, rowIndex) => (
            <div
              className="absolute top-128 w-375 h-222 bg-cover bg-no-repeat bg-[url('/assets/images/cakeDishImg.png')]"
              key={rowIndex}
              style={{
                top: `${rowIndex * 165 + 165}px`,
                backgroundPosition: 'center 1px',
              }}
            >
              {/* 층별로 3개씩 케이크 배치 */}
              <ul className="grid grid-cols-3 justify-center gap-x-[1px] custom-grid w-full h-full mt-70 px-50">
                {restCake.slice(rowIndex * 3, rowIndex * 3 + 3).map((cake) => (
                  <li
                    className="z-5 flex flex-col items-center aspect-square p-4 transform translate-y-[-30px] justify-self-center"
                    key={cake.name}
                    onClick={() => {
                      handleSelectOne(cake.presentId);
                    }}
                    style={{ width: '105%' }}
                  >
                    <Image
                      src={defaultCakeTreeDataObject[cake.cakeId].cakeImg}
                      alt="케이크 이미지"
                    />
                    <p className="flex items-center justify-center font-galmuri max-w-[85px] h-20 px-8 py-3 text-white text-[10px]  bg-black bg-opacity-50 rounded-4xl text-ellipsis overflow-hidden whitespace-nowrap">
                      {cake.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
