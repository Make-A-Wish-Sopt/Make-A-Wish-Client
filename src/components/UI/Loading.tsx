import Image from 'next/image';
import { LoadingDot } from '@/app/loading';
import { AdminCakeImg } from '@public/assets/images';
import { colors, ColorsTypes } from '@/styles/styles';

export function LoadingOverlay({ render }: { render: JSX.Element }) {
  return (
    <div
      id="modal-overlay"
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-[9999] bg-black/70"
    >
      <div
        className="fixed top-0 w-375 h-full flex flex-col items-center justify-center"
        style={{
          animation: 'appearAnimation 0.3s ease-out forwards',
        }}
      >
        {render}
      </div>
    </div>
  );
}

export function LoadingCake({ text, bgColor }: { text: string; bgColor?: keyof ColorsTypes }) {
  return (
    <div
      className="flex flex-col justify-between items-center w-173 h-130 bg-main_blue p-20 rounded-2xl"
      style={{ backgroundColor: bgColor ? colors[bgColor] : '' }}
    >
      <Image src={AdminCakeImg} alt="검증 아이콘" width={70} />
      <div className="flex gap-5">
        <span className="font-bitbit text-[24px] text-black">{text}</span>
        <LoadingDot />
      </div>
    </div>
  );
}
