import Header, { MypageButton } from '@/components/Elements/Hedaer';
import MainLayout from '@/layouts/MainLayout';
import Image from 'next/image';
import { MainCakeListImg } from '@public/assets/images';
import Link from 'next/link';
import { KakaoLoginIc } from '@public/assets/icons';
import ErrorPage from '../error';

const Page = async () => {
  const kakaoClientId = process.env.KAKAO_RESTAPI_KEY;
  const redirectURI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${redirectURI}`;

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />}>
      {/* Hero Section */}
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

      {/* 변경예정 : 버튼 스타일 varient 통합 */}
      <Link
        href={kakaoLoginUrl}
        className="flex justify-center items-center gap-10 w-full h-50 text-[20px] font-bitbit bg-yellow rounded-xl mt-33"
      >
        <Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />
        <span>카카오톡 로그인으로 시작하기</span>
      </Link>
    </MainLayout>
  );
};

export default Page;
