import Image from 'next/image';
import { MainCakeListImg } from '../../../public/assets/images';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center" aria-label="메인 히어로 섹션">
      <h1 className="text-[56px] leading-none text-main_blue mt-[28px] font-bitbit">
        조물주보다 <br />
        생일선물주
      </h1>
      <figure className="mt-8 px-[2.2rem]">
        <Image
          src={MainCakeListImg}
          alt="생일 케이크 이미지 모음"
          priority
          width={330}
          height={330}
        />
      </figure>
      <p className="text-[24px] text-main_blue mt-[31px] font-bitbit">
        현금으로 선물 받는 생일잔치
      </p>
    </section>
  );
}
