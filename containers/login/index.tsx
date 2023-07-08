import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { GuideBtnIc, KakaoLoginIc } from '@/public/assets/icons';
import { PillCakeImg, LoginChatImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/button/iconButton';
import GuideModal from '@/components/modal/GuideModal';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';

export default function LoginContainer() {
  const { isOpen, modalToggle } = useModal();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Header>
        <IconButton handleClick={modalToggle} src={GuideBtnIc} alt="서비스 가이드" />
      </Header>
      {isOpen && (
        <Modal isOpen={isOpen} modalToggle={modalToggle}>
          <GuideModal clickModal={modalToggle} />
        </Modal>
      )}

      <Styled.Container>
        <Styled.ImageContainer>
          <Styled.Title>
            조물주보다,
            <br />
            생일선물주
          </Styled.Title>

          <Image src={LoginChatImg} alt="진짜 원하는 선물을 말해봐요" />
          <Image src={PillCakeImg} alt="로그인 케이크 이미지" />
        </Styled.ImageContainer>
        <Styled.About>사실 내가 갖고 싶었던 건...</Styled.About>
        <Styled.AboutSmall>에X팟 맥스</Styled.AboutSmall>
      </Styled.Container>

      <IconButton handleClick={handleKaKaoLogin} src={KakaoLoginIc} alt="카카오 로그인" />
    </>
  );
}

const Styled = {
  Title: styled.div`
    ${theme.fonts.title56};
    color: ${theme.colors.main_blue};
    margin: 2rem 0 2.8rem;
    display: flex;
    justify-content: center;
    white-space: pre-line;
  `,

  Container: styled.div``,

  ImageContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  About: styled.div`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 1.4rem 0 1.5rem;
    display: flex;
    justify-content: center;
  `,

  AboutSmall: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    display: flex;
    justify-content: center;
    margin: 0 0 10.15rem;
  `,
};