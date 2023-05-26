import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { CloseBlueIc } from '@/public/assets/icons';
import { ShareChatImg, LoginCakeImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/button/iconButton';
import ButtonBox from '@/components/button/buttonBox';

import ShareModal from '@/components/modal/ShareModal';
import { useState } from 'react';

export default function Share() {
  const [showModal, setShowModal] = useState(false);

  const clickModal = () => setShowModal(!showModal);

  return (
    <>
      <Header>
        <IconButton src={CloseBlueIc} alt="닫기" />
      </Header>

      <Styled.Container>
        <Styled.Title>
          ㅇㅇ님의
          <br />
          소원 생성 완료!
        </Styled.Title>
        <Styled.About>선물주들에게 생일 축하 받으러 가볼까요?</Styled.About>

        <Styled.ImageContainer>
          <Image src={ShareChatImg} alt="이뤄져라 얍!" />
          <Image src={LoginCakeImg} alt="케이크" />
        </Styled.ImageContainer>
      </Styled.Container>

      {showModal && <ShareModal clickModal={clickModal} />}
      <ButtonBox
        handleClick={clickModal}
        backgroundColor={theme.colors.main_blue}
        fontColor={theme.colors.white}
      >
        링크 공유하기
      </ButtonBox>
    </>
  );
}

const Styled = {
  Title: styled.div`
    ${theme.fonts.headline30};
    color: ${theme.colors.main_blue};
    margin: 0 0 2rem;
    display: flex;
    justify-content: center;
    white-space: pre-line;
    text-align: center;
  `,

  Container: styled.div`
    margin: 6.7rem 0 12.2rem;
  `,

  ImageContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  About: styled.div`
    ${theme.fonts.body14};
    color: ${theme.colors.main_blue};
    margin: 0 0 4.3rem;
    display: flex;
    justify-content: center;
  `,
};
