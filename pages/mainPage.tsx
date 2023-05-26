import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { SideBarIc } from '@/public/assets/icons';
import { PillCakeImg } from '@/public/assets/images';
import { MainChatImg } from '@/public/assets/images';
import { GaugeBarImg } from '@/public/assets/images';
import IconButton from '@/components/button/iconButton';
import router from 'next/router';
import ButtonBox from '@/components/button/buttonBox';
import { useAuthKaKao } from '@/hooks/useAuthKakao';

export default function MainPage() {
  const moveToForm = () => {
    router.push('/formPage');
  };

  const { nickname } = useAuthKaKao();

  return (
    <>
      <Styled.HeaderContainer>
        <Styled.Title>
          {nickname}님,
          <br />
          <span style={{ color: theme.colors.main_blue }}>소원 링크</span>를 생성하고
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
        handleClick={moveToForm}
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

  SideContainer: styled.div`
    margin-left: auto;
  `,

  Title: styled.div`
    ${theme.fonts.headline24_130};
    margin: 0 0 3rem;
  `,

  DDay: styled.div`
    ${theme.fonts.headline20};
    color: ${theme.colors.main_blue};
    display: flex;
    justify-content: center;
    margin-top: 2.3rem;
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
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
    display: flex;
    justify-content: center;
  `,

  AboutSmall: styled.div`
    ${theme.fonts.headline24_100};
    display: flex;
    justify-content: center;
  `,
};
