'use client';
import Image from 'next/image';
import { KakaoLoginIc } from '../../public/assets/icons';
import FixedBottomButton from '@/components/Common/Button/FixedBottomButton';

export function KakaoLoginButton() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <FixedBottomButton
      bgColor="yellow"
      fontColor="black"
      onClick={handleKaKaoLogin}
      icon={<Image src={KakaoLoginIc} alt="카카오 로고 아이콘" />}
    >
      카카오톡 로그인으로 시작하기
    </FixedBottomButton>
  );
}
