'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIc, ArrowRightIc } from '../../../../public/assets/icons';
import useCarousel from '@/hooks/common/useCarousel';
import Button from '@/components/Common/Button';
import { AvatarCakeType, CakeItemType } from '@/constant/model/cakes';

export function SelectCakes<T extends CakeItemType | AvatarCakeType>({
  avatarCakeList,
}: {
  avatarCakeList: Array<T>;
}) {
  const { center, left, right, next, prev } = useCarousel(avatarCakeList.length - 1);

  const router = useRouter();

  const { wishId } = useParams<{ wishId: string }>();

  const handleClick = () => {
    router.push(`/present/${wishId}/?presentStep=present&avatarCakeId=${center}`);
  };

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
          <Image src={ArrowLeftIc} alt="왼쪽 화살표" width={10} priority></Image>
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
          <Image src={ArrowRightIc} alt="오른쪽 화살표" priority></Image>
        </li>

        <li className="absolute opacity-50" style={{ top: 0, right: '-50%' }}>
          <Image src={avatarCakeList[right].image} alt="이미지" width={250} priority />
        </li>
      </ul>
      <Button bgColor="main_blue" fontColor="black" onClick={handleClick}>
        친구 생일잔치 입장하기
      </Button>
    </>
  );
}
