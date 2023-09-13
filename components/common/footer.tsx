import { LogoImg } from '@/public/assets/images';
import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';

export default function Footer() {
  const handleTermsOfUse = () => {
    window.open('https://sunmulzu.notion.site/d20153cbfb7848f8a2599f263217dcc2');
  };

  const handlePrivacyPolicy = () => {
    window.open('https://sunmulzu.notion.site/dd520cd904db4b439c85e91af022bd02?pvs=4');
  };

  const handleMarketingAgreement = () => {
    window.open('https://sunmulzu.notion.site/3e4a34be04f54f159d7e44c0e92c6e05?pvs=4');
  };

  return (
    <Styled.Container>
      <Image src={LogoImg} alt={'조물주보다 생일선물주 로고'} />

      <Styled.ContentContainer>
        상호명: 조물주보다생일선물주
        <br />
        사업자등록번호: 246-05-02593
        <br />
        통신판매업신고: 2023-경기양주-1379
        <br />
        사업장주소지: 경기도 양주시 고덕로 159, 207-403
        <br />
        대표자명: 이승원
      </Styled.ContentContainer>
      <Styled.HorizontalLine />

      <Styled.ButtonContainer>
        <Styled.Button onClick={handleTermsOfUse}>이용약관</Styled.Button>
        <Styled.Button onClick={handlePrivacyPolicy}>개인정보처리방침</Styled.Button>
        <Styled.Button onClick={handleMarketingAgreement}>광고마케팅정보수신동의</Styled.Button>
      </Styled.ButtonContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.footer`
    width: 100%;
    background-color: ${theme.colors.main_blue};
    padding: 2.9rem 2.2rem;

    ${theme.fonts.body12_2};
  `,

  HorizontalLine: styled.div`
    display: block;
    width: 100%;
    height: 0.1rem;
    margin: 1rem 0;
    background: #ffffff;
    opacity: 0.6;
  `,

  ContentContainer: styled.div`
    line-height: 2.2rem;
    color: ${theme.colors.white};
    opacity: 0.6;
    margin: 1.5rem 0 0 0;
  `,

  ButtonContainer: styled.div`
    display: flex;
    gap: 0.5rem;
  `,

  Button: styled.button`
    line-height: 2.2rem;
    color: ${theme.colors.white};
    opacity: 0.8;
    padding: 0;
  `,
};
