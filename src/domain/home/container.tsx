'use client';

import Image from 'next/image';
import { useRouters } from '@/hooks/common/useRouters';
import Button from '@/components/Common/Button';
import { KakaoLoginIc } from '../../../public/assets/icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MainPageCenteredContent } from './component';

export default function MainPageContainer({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <MainPageCenteredContent />
      <KakaoLoginButton />
    </>
  );
}

export function KakaoLoginButton() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const { handleReplace } = useRouters();

  useEffect(() => {
    async function fetchAuthUrl() {
      const response = await fetch('/api/kakao');
      const data = await response.json();
      setAuthUrl(data.authUrl);
    }

    fetchAuthUrl();
  }, []);

  const handleKaKaoLogin = () => {
    if (authUrl) {
      handleReplace(authUrl);
    }
  };

  return (
    <Button
      bgColor="yellow"
      fontColor="black"
      onClick={handleKaKaoLogin}
      style={{ marginTop: '3.3rem' }}
      icon={<Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />}
    >
      카카오톡 로그인으로 시작하기
    </Button>
  );
}
