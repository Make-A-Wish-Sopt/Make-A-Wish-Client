'use client';

import Image from 'next/image';
import { KakaoLoginIc } from '../../public/assets/icons';
import Button from '@/components/Common/Button';
import { useRouters } from '@/hooks/common/useRouters';

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

export function AlimTalkReceiveButton() {
  const handleKaKaoLogin = () => {};

  return (
    <Button bgColor="main_blue" fontColor="black" onClick={handleKaKaoLogin}>
      생일 D-7 알림톡 받기
    </Button>
  );
}