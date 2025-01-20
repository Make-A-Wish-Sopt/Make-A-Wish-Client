'use client';

import Image from 'next/image';
import Button from '@/components/Common/Button';
import { KakaoLoginIc } from '../../../public/assets/icons';
import { PropsWithChildren } from 'react';
import useKakaoAuth from '@/hooks/common/useKakaoAuth';

export default function IndexPageContainer({ children }: PropsWithChildren) {
  return (
    <>
      {children}
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
