import Header, { MypageButton } from '@/components/Elements/Header';
import MainLayout from '@/layouts/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import { KakaoLoginIc } from '@public/assets/icons';
import Button from '@/components/Elements/Button';
import { getKakaoLoginUrl } from '@/utils/auth';
import { ServiceGuideModal } from './_components/client';

async function Page() {
  const kakaoLoginUrl = getKakaoLoginUrl();

  return (
    <MainLayout Header={<Header rightMenu={<MypageButton />} />}>
      <MainHereSection />

      <Link href={kakaoLoginUrl || '#'}>
        <Button bgColor="yellow" className="mt-33">
          <Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />
          {'카카오톡 로그인으로 시작하기'}
        </Button>
      </Link>
    </MainLayout>
  );
}

export default Page;

const MainHereSection = () => {
  return (
    <section className="flex flex-col items-center" aria-label="메인 히어로 섹션">
      <h1 className="text-[56px] leading-none text-main_blue mt-[28px] font-bitbit">
        조물주보다 <br />
        생일선물주
      </h1>
      <figure className="mt-8 px-[2.2rem]">
        <ServiceGuideModal />
      </figure>
      <p className="text-[24px] text-main_blue mt-[31px] font-bitbit">
        현금으로 선물 받는 생일잔치
      </p>
    </section>
  );
};
