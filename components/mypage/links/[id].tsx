import styled from 'styled-components';
import Image from 'next/image';
import router from 'next/router';

import theme from '@/styles/theme';
import { LinkPageCake, GaugeBarImg } from '@/public/assets/images';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';

export default function WishLinkContainer() {
  const handleMovePage = () => {
    router.push('/wishes');
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.Title>나의 소원 링크 모음</Styled.Title>
      <Styled.Date>2023.01.01~2023.02.02</Styled.Date>

      <Styled.CenterContainer>
        <Styled.BarContainer>
          <Image src={GaugeBarImg} alt="게이지바" />
        </Styled.BarContainer>
        <Styled.ImageContainer>
          <Image src={LinkPageCake} alt="케이크" />
        </Styled.ImageContainer>
        <Styled.About>모인 케이크 보러가기 {'>'} </Styled.About>
        <Styled.AboutSmall>총 { }원</Styled.AboutSmall>
      </Styled.CenterContainer>
    </>
  );
}

const Styled = {
  HeaderContainer: styled.div`
    display: flex;
  `,

  Title: styled.div`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    margin: 2rem 0 0.5rem;
  `,

  Date: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.gray4};
  `,

  CenterContainer: styled.div`
    margin: 9rem 0 15.5rem;
  `,

  BarContainer: styled.div`
    float: right;
    margin: 0rem 1.5rem 0 0;
  `,

  ImageContainer: styled.div`
    width: 100%;
    text-align: center;
    padding: 4rem 0 0;
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
