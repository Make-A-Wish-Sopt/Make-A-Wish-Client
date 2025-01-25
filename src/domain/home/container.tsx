'use client';

import Image from 'next/image';
import Button from '@/components/Common/Button';
import { KakaoLoginIc } from '../../../public/assets/icons';
import { PropsWithChildren } from 'react';
import { MainPageCenteredContent } from './component';
import useKakaoAuth from '@/hooks/common/useKakaoAuth';
import useToggle from '@/hooks/common/useToggle';
import CloseTopModal from '@/components/Common/Modal/CloseTopModal';
import { GuideImg } from '../../../public/assets/images';

export default function MainPageContainer({ children }: PropsWithChildren) {
  const modalState = useToggle();
  return (
    <>
      {children}
      <div onClick={modalState.handleState}>
        <MainPageCenteredContent />
      </div>
      <KakaoLoginButton />
      {
        <CloseTopModal isOpen={modalState.state} handleState={modalState.handleState}>
          <div className="flex justify-center items-center w-full h-full ">
            <Image className="w-[85%]" src={GuideImg} alt="안내 이미지" />
          </div>
        </CloseTopModal>
      }
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
