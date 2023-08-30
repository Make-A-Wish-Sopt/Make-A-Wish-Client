import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { KakaoLoginIc } from '@/public/assets/icons';
import BasicBox from '../common/box/BasicBox';
import Button from '../common/button/button';
import MainView from '../common/mainView';
import Footer from '../common/footer';

export default function LoginContainer() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Styled.Container>
      <MainView text={'매년 받는 기프티콘 선물 대신 \n 생일 펀딩 서비스로'} />

      <Styled.ButtonWrapper>
        <BasicBox bgColor={theme.colors.yellow} font={theme.fonts.body16} borderColor="transparent">
          <Button handleClick={handleKaKaoLogin}>
            <Styled.KakaoLoginIcon />
            카카오톡 로그인으로 시작하기
          </Button>
        </BasicBox>
      </Styled.ButtonWrapper>

      <Footer />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ButtonWrapper: styled.div`
  position: fixed;
  bottom: 4.6rem;
`,

  KakaoLoginIcon: styled((props) => (
    <Image {...props} src={KakaoLoginIc} alt="카카오로그인아이콘" />
  ))`
    margin-right: 1.3rem;
  `,
};
