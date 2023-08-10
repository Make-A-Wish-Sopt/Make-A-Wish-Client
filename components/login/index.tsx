import styled from 'styled-components';
import Image from 'next/image';
import theme from '@/styles/theme';
import { GuideBtnIc, KakaoLoginIc, WideArrowDownIc } from '@/public/assets/icons';
import { PillCakeImg, LoginChatImg, MainLoginImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '../common/button/iconButton';
import GuideModal from '@/components/common/modal/GuideModal';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/common/useModal';
import BasicBox from '../common/box/BasicBox';
import Button from '../common/button/button';

export default function LoginContainer() {
  const { isOpen, handleToggle } = useModal();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Styled.Container>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <GuideModal clickModal={handleToggle} />
        </Modal>
      )}

      <Styled.ImageContainer>
        <Styled.Title>
          조물주보다,
          <br />
          생일선물주
        </Styled.Title>

        <Image
          src={MainLoginImg}
          alt="사용 설명 케이크 이미지"
          width={252}
          onClick={handleToggle}
        />
      </Styled.ImageContainer>
      <Styled.About>
        매년 받는 기프티콘 선물 대신, <br />
        생일 펀딩 서비스로
      </Styled.About>

      <Styled.WideArrowDownIcon />

      <BasicBox bgColor={theme.colors.yellow} font={theme.fonts.body16} borderColor="transparent">
        <Button handleClick={handleKaKaoLogin}>
          <Styled.KakaoLoginIcon />
          카카오톡 로그인으로 시작하기
        </Button>
      </BasicBox>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.div`
    ${theme.fonts.title56};
    color: ${theme.colors.main_blue};
    margin: 2rem 0 2.8rem;
    display: flex;
    justify-content: center;
    white-space: pre-line;
  `,

  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    margin-top: 6.1rem;
  `,

  About: styled.div`
    display: flex;
    justify-content: center;

    margin: 1rem 0 2.1rem;

    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};

    text-align: center;
  `,

  WideArrowDownIcon: styled((props) => <Image {...props} src={WideArrowDownIc} alt="아래화살표" />)`
    margin-bottom: 2.4rem;
  `,

  KakaoLoginIcon: styled((props) => (
    <Image {...props} src={KakaoLoginIc} alt="카카오로그인아이콘" />
  ))`
    margin-right: 1.3rem;
  `,
};
