import Image from 'next/image';
import { CakeDishTopRibbonImg } from 'public/assets/images';
import { PropsWithChildren } from 'react';

export function DayCount({ children }: PropsWithChildren) {
  return (
    <p className="flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10">
      {children}
    </p>
  );
}

export function CakeTreeFrameContent({ children }: PropsWithChildren) {
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
        {children}
      </div>
    </div>
  );
}

export function CakeItemName({ children }: PropsWithChildren) {
  return (
    <span className="absolute top-[100px] font-galmuri text-white text-[10px] px-8 py-2 bg-black bg-opacity-50 rounded-4xl -mt-13 truncate ">
      {children}
    </span>
  );
}
