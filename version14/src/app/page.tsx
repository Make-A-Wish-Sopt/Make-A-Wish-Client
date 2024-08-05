'use client';

import Header from '@/components/Common/Hedaer';
import MainLayout from '@/layouts/MainLayout';
import { Suspense, useEffect } from 'react';
import useModal from '@/hooks/common/useModal';
import Loading from './loading';
import Image from 'next/image';
import { KakaoLoginIc } from '../../public/assets/icons';
import Text from '@/components/Common/Text';
import { CSSProperties } from 'styled-components';
import { MainLoginImg } from '../../public/assets/images';
import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';

export default function Home() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const { isOpen, handleToggle } = useModal();

  useEffect(() => {
    handleToggle();
  }, []);

  return (
    <>
      <Header />

      <MainLayout>
        <Suspense fallback={<Loading />}>
          <Text as="h1" font="title56" color="main_blue" style={MainTextStyle}>
            {'조물주보다\n생일선물주'}
          </Text>

          <Image
            src={MainLoginImg}
            alt="사용 설명 케이크 이미지"
            width={252}
            onClick={handleToggle}
          />
        </Suspense>
        <FixedBottomButton
          color="yellow_black"
          icon={<Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />}
          onClick={handleKaKaoLogin}
        >
          카카오톡 로그인으로 시작하기
        </FixedBottomButton>
      </MainLayout>
    </>
  );
}

const MainTextStyle: CSSProperties = {
  textAlign: 'center',
  marginTop: '8.3rem',
};
