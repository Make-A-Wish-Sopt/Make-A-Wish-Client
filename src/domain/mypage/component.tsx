import Image from 'next/image';
import { MypageDefaultCakeImg } from '../../../public/assets/images';

export function MypageUserName({ nickName }: { nickName: string }) {
  return (
    <div className="flex gap-10 items-center mt-11 mb-20">
      <Image
        src={MypageDefaultCakeImg}
        alt="마이페이지 기본 케이크 이미지"
        width={50}
        height={50}
      />
      <span className="font-bitbit text-[24px] text-white">{nickName}님</span>
    </div>
  );
}
