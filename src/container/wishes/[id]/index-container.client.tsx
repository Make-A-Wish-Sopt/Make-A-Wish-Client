'use client';

import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';
import { CarouselType } from '@/types/carousel';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIc, ArrowRightIc } from '../../../../public/assets/icons';
import useCarousel from '@/hooks/common/useCarousel';
import { ParamsIdType } from '@/types/params';

export function SelectCakes<T extends CarouselType>({ itemList }: { itemList: Array<T> }) {
  const { center, left, right, next, prev } = useCarousel(itemList.length - 1);

  return (
    <>
      <ul className="flex justify-between items-center gap-20 w-full h-300 ">
        <li className="-ml-120 w-220 h-220 opacity-50">
          <Image src={itemList[left].image} alt="이미지" priority />
        </li>
        <div className="flex justify-center items-center w-30 h-30" onClick={prev}>
          <Image src={ArrowLeftIc} alt="왼쪽 화살표" width={10} priority></Image>
        </div>
        <li className="w-220 h-220">
          <Image src={itemList[center].image} alt="이미지" priority />
        </li>
        <div className="flex justify-center items-center w-30 h-30" onClick={next}>
          <Image src={ArrowRightIc} alt="오른쪽 화살표" priority></Image>
        </div>
        <li className="-mr-120 w-220 h-220 opacity-50">
          <Image src={itemList[right].image} alt="이미지" priority />
        </li>
      </ul>
    </>
  );
}

export function PresentButton() {
  const router = useRouter();

  const { id } = useParams<ParamsIdType>();

  const handleClick = () => {
    router.push(`/present/${id}`);
  };

  return (
    <FixedBottomButton bgColor="main_blue" fontColor="black" onClick={handleClick}>
      친구 생일잔치 입장하기
    </FixedBottomButton>
  );
}
