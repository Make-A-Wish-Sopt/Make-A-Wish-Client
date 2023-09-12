import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { KakaoLoginIc } from '@/public/assets/icons';
import BasicBox from '../common/box/BasicBox';
import MainView from '../common/mainView';

export default function LoginContainer() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Styled.Container>
      <MainView text={'매년 받는 기프티콘 선물 대신 \n 생일 펀딩 서비스로'} />

      <Styled.ButtonWrapper onClick={handleKaKaoLogin}>
        <BasicBox
          bgColor={theme.colors.yellow}
          font={theme.fonts.button18}
          borderColor="transparent"
        >
          <Styled.ButtonContentWrapper>
            <Styled.KakaoLoginIcon />
            카카오톡 로그인으로 시작하기
          </Styled.ButtonContentWrapper>
        </BasicBox>
      </Styled.ButtonWrapper>
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
    display: flex;
    justify-content: center;

    width: 100%;

    margin-bottom: 10.4rem;
  `,

  ButtonContentWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
  `,

  KakaoLoginIcon: styled((props) => (
    <Image {...props} src={KakaoLoginIc} alt="카카오로그인아이콘" />
  ))`
    margin-right: 1.3rem;
  `,
};
