'use client';

import Image from 'next/image';
import { useRouters } from '@/hooks/common/useRouters';
import Button from '@/components/Common/Button';
import { KakaoLoginIc } from '../../../public/assets/icons';
import { PropsWithChildren, useEffect } from 'react';
import { MainPageCenteredContent } from './component';

export default function MainPageContainer({
  isLoggedIn = false,
  children,
}: { isLoggedIn?: boolean } & PropsWithChildren) {
  const { handleRouter } = useRouters();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     handleRouter('/wishes');
  //   }
  // }, []);
  return (
    <>
      {children}
      <MainPageCenteredContent />

      <KakaoLoginButton />
    </>
  );
}

export function KakaoLoginButton() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

  const { handleReplace } = useRouters();

  const handleKaKaoLogin = () => {
    handleReplace(KAKAO_AUTH_URL);
  };

  return (
    <Button
      bgColor="yellow"
      fontColor="black"
      onClick={handleKaKaoLogin}
      styles={{ marginTop: '3.3rem' }}
      icon={<Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />}
    >
      카카오톡 로그인으로 시작하기
    </Button>
  );
}
