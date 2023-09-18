import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import router from 'next/router';

import theme from '@/styles/theme';
import { CloseBlueIc } from '@/public/assets/icons';
import { ShareChatImg, MainCakeImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/common/button/iconButton';
import ButtonBox from '@/components/common/button/buttonBox';
import ShareModal from '@/components/common/modal/ShareModal';

import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import useGetProgressData from '@/hooks/queries/main/useGetProgressData';

export default function ShareContainer() {
  const [showModal, setShowModal] = useState(false);

  const [status, setStatus] = useState('none');
  const { progressData, wishStatus } = useGetProgressData();

  const [nickName, setNicknameState] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  useEffect(() => {
    setNicknameState(loginUserInfo.nickName);
    setStatus(wishStatus);
  }, [loginUserInfo, wishStatus]);

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  const handleMoveToMain = () => {
    router.push('/main');
  };

  return (
    <>
      <Header>
        <IconButton onClick={handleMoveToMain} src={CloseBlueIc} alt="닫기" />
      </Header>

      <Styled.Container>
        <Styled.Title>
          {nickName}님의
          <br />
          소원 생성 완료!
        </Styled.Title>
        {status === 'while' ? (
          <Styled.About>선물주들에게 생일 축하 받으러 가볼까요?</Styled.About>
        ) : (
          <Styled.About>
            {progressData ? progressData.dayCount : '?'}일 뒤부터 링크를 공유할 수 있어요
          </Styled.About>
        )}

        <Styled.ImageContainer>
          <Image src={ShareChatImg} alt="말풍선" />
          <Image src={MainCakeImg} alt="케이크" width={219} height={219} />
        </Styled.ImageContainer>
      </Styled.Container>

      {showModal && <ShareModal handleModalClick={handleModalClick} />}
      <Styled.ButtonWrapper>
        {status === 'while' ? (
          <ButtonBox
            handleClick={handleModalClick}
            backgroundColor={theme.colors.main_blue}
            fontColor={theme.colors.white}
          >
            링크 공유하기
          </ButtonBox>
        ) : (
          <ButtonBox
            handleClick={handleMoveToMain}
            backgroundColor={theme.colors.main_blue}
            fontColor={theme.colors.white}
          >
            홈화면으로 이동하기
          </ButtonBox>
        )}
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  Title: styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 2rem;
    ${theme.fonts.headline30};
    color: ${theme.colors.main_blue};
    text-align: center;
    white-space: pre-line;
  `,

  Container: styled.div`
    margin: 6.7rem 0 12.2rem;
  `,

  ImageContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,

  About: styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 4.3rem;
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
  `,

  ButtonWrapper: styled.div`
    margin-bottom: 10.4rem;
  `,
};
