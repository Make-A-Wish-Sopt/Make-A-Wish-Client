import styled from 'styled-components';
import Image from 'next/image';
import { KakaoLoginIc } from '@/public/assets/icons';
import MainView from '../Common/mainView';
import Button from '../Common/Button';
import CloseModal from '../Common/Modal/ModalForm/CloseModal';
import useModal from '@/hooks/common/useModal';
import { useEffect } from 'react';
import Modal from '../Common/Modal';
import { MainCakeImg } from '@/public/assets/images';
import theme from '@/styles/theme';

export default function LoginContainer() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
  const handleKaKaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const { isOpen, handleToggle } = useModal();

  useEffect(() => {
    handleToggle();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} handleToggle={handleToggle}>
        {
          <CloseModal handleToggle={handleToggle}>
            <Image src={MainCakeImg} alt={'케이크'} width={60} height={60} />
            <Styled.ModalTitle>새로워진 서비스로 돌아올게요!</Styled.ModalTitle>
            <Styled.ModalText>
              {
                '2024년 4월 1일부터는 잠시 서비스를 이용할 수 없어요. 기존에 불편했던 부분들을 개선하고, 재밌는 기능을 추가해 돌아올 예정이에요! 돌아오면 다시 알려드릴게요! '
              }
            </Styled.ModalText>

            <Button colorSystem="mainBlue_white" handleClickFn={handleToggle}>
              {'확인했어요'}
            </Button>
          </CloseModal>
        }
      </Modal>
      <Styled.Container>
        <MainView text={'매년 받는 기프티콘 선물 대신 \n 생일 펀딩 서비스로'} />

        <Styled.ButtonWrapper onClick={handleKaKaoLogin}>
          <Button boxType="large" colorSystem="yellow_black">
            <Styled.ButtonContentWrapper>
              <Styled.KakaoLoginIcon />
              카카오톡 로그인으로 시작하기
            </Styled.ButtonContentWrapper>
          </Button>
        </Styled.ButtonWrapper>
      </Styled.Container>
    </>
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

    cursor: pointer;
  `,

  ModalTitle: styled.h2`
    ${theme.fonts.headline24_100}
    color : ${theme.colors.dark_blue};

    margin: 0.6rem 0;
  `,

  ModalText: styled.p`
    ${theme.fonts.body14}
    color : ${theme.colors.dark_blue};

    text-align: center;

    margin-bottom: 2rem;
  `,

  KakaoLoginIcon: styled((props) => (
    <Image {...props} src={KakaoLoginIc} alt="카카오로그인아이콘" />
  ))`
    margin-right: 1.3rem;
  `,
};
