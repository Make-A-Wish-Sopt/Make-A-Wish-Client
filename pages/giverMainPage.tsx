import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { GuideBtnIC } from '@/public/assets/icons';
import { LoginCakeImg } from '@/public/assets/images';
import { GiverMainChatImg } from '@/public/assets/images';
import { HeartImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/button/iconButton';
import ButtonBox from '@/components/button/buttonBox';
import router from 'next/router';
import { useState } from 'react';
import GuideModal from '@/components/modal/GuideModal';

export default function GiverMainPage() {
  const [showModal, setShowModal] = useState(false);

  const clickModal = () => {
    setShowModal(!showModal);
  };

  const moveToCake = () => {
    router.push('/giver');
  };
  const moveToLogin = () => {
    router.push('/loginPage');
  };

  return (
    <>
      <Header>
        <IconButton onClick={clickModal} src={GuideBtnIC} alt="서비스 가이드" />
      </Header>
      {showModal && <GuideModal clickModal={clickModal} />}

      <Styled.Container>
        <Styled.ImageContainer>
          <Styled.Title>
            조물주보다
            <br />
            생일선물주
          </Styled.Title>

          <Image src={GiverMainChatImg} alt="진짜 원하는 선물을 말해봐요" />
          <Image src={LoginCakeImg} alt="케이크" />
        </Styled.ImageContainer>
        <Styled.About>
          OO님의 선물을
          <br />
          고민중이셨다면?
        </Styled.About>
        <Styled.AboutSmallContainer>
          <Styled.AboutSmall>
            선물주님들 사랑해요&nbsp;
            <Image src={HeartImg} alt="하트" />
          </Styled.AboutSmall>
        </Styled.AboutSmallContainer>
      </Styled.Container>

      <ButtonBox
        handleClick={moveToCake}
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
      >
        케이크 보내기
      </ButtonBox>
      <div style={{ height: '1.4rem' }} />
      <ButtonBox
        handleClick={moveToLogin}
        backgroundColor={theme.colors.pastel_blue}
        fontColor={theme.colors.main_blue}
      >
        나도 소원 빌러 가기
      </ButtonBox>
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

  Container: styled.div`
      margin: 0 0 3.5rem;
  `,

  ImageContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  About: styled.div`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 0 0 1.5rem;
    display: flex;
    justify-content: center;
  `,

  AboutSmall: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    display: flex;
    justify-content: center;
  `,

  AboutSmallContainer: styled.div`
    width: 100%;
    flex-direction: column;
    align-items: center;
    display: flex;
  `,
};

