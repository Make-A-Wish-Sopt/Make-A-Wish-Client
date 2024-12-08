'use client';

import Image from 'next/image';
import { useRouters } from '@/hooks/common/useRouters';
import Button from '@/components/Common/Button';
import { KakaoLoginIc } from '../../../public/assets/icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MainPageCenteredContent } from './component';
import useKakaoAuth from '@/hooks/common/useKakaoAuth';

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
  const { handleKaKaoLogin } = useKakaoAuth();

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
