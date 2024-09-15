import Image from 'next/image';
import { KakaoLoginButton } from './index-container.client';
import { MainCakeListImg } from '../../public/assets/images';

export default function IndexContainer() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[56px] text-main_blue mt-[91px] font-bitbit ">
        조물주보다 <br />
        생일선물주
      </h1>
      <Image src={MainCakeListImg} alt="케이크 리스트 이미지" priority></Image>
      <span className="text-[24px] text-main_blue mt-[31px] font-bitbit">
        현금으로 선물 받는 생일잔치
      </span>
      <KakaoLoginButton />
    </div>
  );
}
