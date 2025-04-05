'use client';

import Button from '@/components/Elements/Button';
import { defaultAvatarCakesDataArray } from '@/constant/model/avatarCakesData';
import useCarousel, { CarouselType } from '@/hooks/useCarousel';
import { useRouters } from '@/hooks/useRouters';
import { ArrowLeftIc, ArrowRightIc } from '@public/assets/icons';
import Image from 'next/image';
import { useState } from 'react';

const SelectAvatarCakesButton = ({ wishId }: { wishId: string }) => {
  const selectLength = 7;
  const carousel = useCarousel(defaultAvatarCakesDataArray.length - 1, selectLength);
  const { selectArr, next, prev } = carousel;

  const [left3, left2, left1, center, right1, right2, right3] = selectArr;
  const [animationClass, setAnimationClass] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);

  const { getCenterItem } = carousel;
  const selectAvatarCakeId = getCenterItem();

  const changeTime = 500;

  const handlePrev = () => {
    if (isCooldown) return;
    setAnimationClass('slide-left');
    setIsCooldown(true);
    setTimeout(() => {
      prev();
      setAnimationClass('');
      setIsCooldown(false);
    }, changeTime);
  };

  const handleNext = () => {
    if (isCooldown) return;
    setAnimationClass('slide-right');
    setIsCooldown(true);
    setTimeout(() => {
      next();
      setAnimationClass('');
      setIsCooldown(false);
    }, changeTime);
  };

  const { handleRouter } = useRouters();
  const cakeId = defaultAvatarCakesDataArray[selectAvatarCakeId].id;

  const handleClick = () => {
    handleRouter(`/present/${wishId}/?presentStep=present&avatarCakeId=${cakeId}`);
  };

  return (
    <>
      <ul className="relative flex justify-center w-375 h-300 mb-30 ">
        <li className={`absolute opacity-50 ${animationClass}`} style={{ top: 0, left: '-574px' }}>
          <Image
            src={defaultAvatarCakesDataArray[left3].cakeImg}
            alt="이전 케이크 이미지"
            width={250}
            priority
          />
        </li>

        <li className={`absolute opacity-50 ${animationClass}`} style={{ top: 0, left: '-362px' }}>
          <Image
            src={defaultAvatarCakesDataArray[left2].cakeImg}
            alt="이전 케이크 이미지"
            width={250}
            priority
          />
        </li>

        <li
          className={`absolute opacity-50 ${animationClass}`}
          style={{
            top: 0,
            left: '-150px',
          }}
        >
          <Image
            src={defaultAvatarCakesDataArray[left1].cakeImg}
            alt="이전 케이크 이미지"
            width={250}
            priority
          />
        </li>

        <button
          className="absolute flex justify-center items-center w-30 h-30"
          onClick={handlePrev}
          style={{
            top: '50%',
            left: '50px',
            zIndex: 1,
          }}
        >
          <Image src={ArrowLeftIc} alt="왼쪽 화살표" width={10} priority />
        </button>

        <li className={`${animationClass} flex justify-center w-full `}>
          <Image
            src={defaultAvatarCakesDataArray[center].cakeImg}
            alt="선택한 케이크 이미지"
            width={250}
            priority
          />
        </li>

        <button
          className="absolute flex justify-center items-center w-30 h-30"
          onClick={handleNext}
          style={{
            top: '50%',
            left: 'calc(85% + -15px)',
            zIndex: 1,
          }}
        >
          <Image src={ArrowRightIc} alt="오른쪽 화살표" priority />
        </button>

        <li className={`absolute opacity-50 ${animationClass}`} style={{ top: 0, right: '-150px' }}>
          <Image
            src={defaultAvatarCakesDataArray[right1].cakeImg}
            alt="이미지"
            width={250}
            priority
          />
        </li>

        <li className={`absolute opacity-50 ${animationClass}`} style={{ top: 0, right: '-362px' }}>
          <Image
            src={defaultAvatarCakesDataArray[right2].cakeImg}
            alt="이미지"
            width={250}
            priority
          />
        </li>

        <li className={`absolute opacity-50 ${animationClass}`} style={{ top: 0, right: '-574px' }}>
          <Image
            src={defaultAvatarCakesDataArray[right3].cakeImg}
            alt="이미지"
            width={250}
            priority
          />
        </li>
      </ul>

      <Button onClick={handleClick}>친구 생일잔치 입장하기</Button>

      <style jsx>{`
        .slide-left {
          animation: slide-left 0.5s ease-in-out forwards;
        }

        .slide-right {
          animation: slide-right 0.5s ease-in-out forwards;
        }

        @keyframes slide-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-212px);
          }
        }

        @keyframes slide-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(212px);
          }
        }
      `}</style>
    </>
  );
};

export default SelectAvatarCakesButton;
