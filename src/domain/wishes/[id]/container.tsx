'use client';

import { avatarCakeList } from '@/constant/model/cakes';
import useCarousel, { CarouselType } from '@/hooks/common/useCarousel';
import { useRouters } from '@/hooks/common/useRouters';
import Image from 'next/image';
import { ArrowLeftIc, ArrowRightIc } from '../../../../public/assets/icons';
import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from '@/components/Common/Button';

export default function WishesIdPageContainer({
  wishId,
  children,
}: { wishId: string } & PropsWithChildren) {
  const carousel = useCarousel(avatarCakeList.length - 1);
  const { center } = carousel;

  return (
    <>
      {children}
      <SelectAvatarCakes carousel={carousel} />
      <WishesIdPageSubmitButton wishId={wishId} avatarCakeId={center} />
    </>
  );
}

function SelectAvatarCakes({ carousel }: { carousel: CarouselType }) {
  const { center, left, right, next, prev } = carousel;

  return (
    <>
      <ul className="relative flex justify-center w-full h-300 mb-46">
        <li className="absolute opacity-50" style={{ top: 0, left: '-50%' }}>
          <Image src={avatarCakeList[left].image} alt="이전 케이크 이미지" width={250} priority />
        </li>

        <li
          className="absolute flex justify-center items-center  top w-30 h-30"
          onClick={prev}
          style={{
            top: '50%',
            left: '15%',
            zIndex: 1,
          }}
        >
          <Image src={ArrowLeftIc} alt="왼쪽 화살표" width={10} priority />
        </li>

        <li>
          <Image
            src={avatarCakeList[center].image}
            alt="선택한 케이크 이미지"
            width={250}
            priority
          />
        </li>

        <li
          className="absolute flex justify-center items-center w-30 h-30"
          onClick={next}
          style={{
            top: '50%',
            left: 'calc(85% + -15px)',
            zIndex: 1,
          }}
        >
          <Image src={ArrowRightIc} alt="오른쪽 화살표" priority />
        </li>

        <li className="absolute opacity-50" style={{ top: 0, right: '-50%' }}>
          <Image src={avatarCakeList[right].image} alt="이미지" width={250} priority />
        </li>
      </ul>
    </>
  );
}

function WishesIdPageSubmitButton({
  wishId,
  avatarCakeId,
}: {
  wishId: string;
  avatarCakeId: number;
}) {
  const { handleRouter } = useRouters();

  const handleClick = () => {
    handleRouter(`/present/${wishId}/?presentStep=present&avatarCakeId=${avatarCakeId}`);
  };

  return <Button onClick={handleClick}>친구 생일잔치 입장하기</Button>;
}
