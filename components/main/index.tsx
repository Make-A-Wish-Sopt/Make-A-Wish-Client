import styled from 'styled-components';
import Image from 'next/image';
import router from 'next/router';

import theme from '@/styles/theme';
import { SideBarIc } from '@/public/assets/icons';
import { PillCakeImg, MainChatImg, GaugeBarImg } from '@/public/assets/images';
import IconButton from '@/components/button/iconButton';
import ButtonBox from '@/components/button/buttonBox';

export default function MainContainer() {
  const handleMovePage = () => {
    router.push('/wishes');
  };

  return (
    <>
      <Styled.HeaderContainer>
        <Styled.Title>
          { }님,
          <br />
          <Styled.TitleColor>소원 링크</Styled.TitleColor>를 생성하고
          <br />
          케이크를 모아봐요!
        </Styled.Title>
        <Styled.SideContainer>
          <IconButton src={SideBarIc} alt="사이드바" />
          <Styled.DDay>D-?</Styled.DDay>
        </Styled.SideContainer>
      </Styled.HeaderContainer>

      <Styled.CenterContainer>
        <Styled.BarContainer>
          <Image src={GaugeBarImg} alt="게이지바" />
        </Styled.BarContainer>
        <Image src={MainChatImg} alt="날 모아줄래? (두근)" />
        <Styled.ImageContainer>
          <Image src={PillCakeImg} alt="케이크" />
        </Styled.ImageContainer>
        <Styled.About>모인 케이크 금액</Styled.About>
        <Styled.AboutSmall>총 ???원</Styled.AboutSmall>
      </Styled.CenterContainer>

      <ButtonBox
        handleClick={handleMovePage}
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
      >
        소원 링크 생성하기
      </ButtonBox>
    </>
  );
}

const Styled = {
  HeaderContainer: styled.div`
  display: flex;
  `,

  Title: styled.div`
  margin: 0 0 3rem;
  ${theme.fonts.headline24_130};
  `,

  TitleColor: styled.span`
  color: ${theme.colors.main_blue};
  `,

  SideContainer: styled.div`
    margin-left: auto;
  `,

  DDay: styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2.3rem;
    ${theme.fonts.headline20};
    color: ${theme.colors.main_blue};
  `,

  CenterContainer: styled.div`
    margin: 9rem 0 15.5rem;
  `,

  BarContainer: styled.div`
    float: right;
    margin: 6rem 1.5rem 0 0;
  `,

  ImageContainer: styled.div`
    width: 100%;
    text-align: center;
  `,

  About: styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 1rem;
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
  `,

  AboutSmall: styled.div`
    display: flex;
    justify-content: center;
    ${theme.fonts.headline24_100};
  `,
};
