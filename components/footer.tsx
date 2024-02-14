import { LogoImg } from '@/public/assets/images';
import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';

export default function Footer() {
  const handleTermsOfUse = () => {
    window.open('https://mercurial-fuschia-8f2.notion.site/7e827f42eecb46f382ac46cf183245d3');
  };

  const handlePrivacyPolicy = () => {
    window.open('https://mercurial-fuschia-8f2.notion.site/ddaf226cf36e40bfa04fd8bc72d159aa');
  };

  const handleMarketingAgreement = () => {
    window.open('https://mercurial-fuschia-8f2.notion.site/52b42acdad7e470ca3c3b6343bc1f24a');
  };

  return (
    <Styled.FooterContainer>
      <Styled.FooterWrapper>
        <Styled.ContentWrapper>
          상호명: 조물주보다생일선물주
          <br />
          사업자등록번호: 246-05-02593
          <br />
          통신판매업신고: 2023-경기양주-1379
          <br />
          사업장주소지: 경기도 양주시 고덕로 159, 207-403
          <br />
          대표자명: 이승원
        </Styled.ContentWrapper>
        <Styled.HorizontalLine />

        <Styled.LinkWrapper>
          <Styled.Link onClick={handleTermsOfUse}>이용약관</Styled.Link>
          <Styled.Link onClick={handlePrivacyPolicy}>개인정보처리방침</Styled.Link>
          <Styled.Link onClick={handleMarketingAgreement}>광고마케팅정보수신동의</Styled.Link>
        </Styled.LinkWrapper>
      </Styled.FooterWrapper>
    </Styled.FooterContainer>
  );
}

const Styled = {
  FooterContainer: styled.footer`
    display: flex;
    justify-content: center;

    width: 100%;
    background-color: ${theme.colors.main_blue};
    padding: 2.5rem 2.2rem;

    ${theme.fonts.body12_2};
  `,

  FooterWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Logo: styled.h1`
    color: ${theme.colors.white};
    ${theme.fonts.headline24_130};
  `,

  HorizontalLine: styled.hr`
    display: block;

    width: 100%;
    height: 0.1rem;

    margin: 1rem 0;

    background: ${theme.colors.pastel_blue};
    border: none;
    opacity: 0.5;
  `,

  ContentWrapper: styled.div`
    line-height: 2.2rem;
    color: ${theme.colors.white};
    opacity: 0.6;
    margin: 1.5rem 0 0 0;
    opacity: 0.5;
  `,

  LinkWrapper: styled.ul`
    display: flex;
    gap: 0.5rem;
  `,

  Link: styled.li`
    line-height: 2.2rem;
    color: ${theme.colors.white};
    opacity: 0.7;
    padding: 0;

    cursor: pointer;
  `,
};
