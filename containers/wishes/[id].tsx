import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import theme from '@/styles/theme';
import { GuideBtnIc } from '@/public/assets/icons';
import { LoginCakeImg, WishesChatImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/button/iconButton';
import GuideModal from '@/components/modal/GuideModal';
import ButtonBox from '@/components/button/buttonBox';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';

import { getWishesData } from '@/api/cakes/getWishesData';

export default function WishesContainer() {
  const { isOpen, modalToggle } = useModal();
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const { data } = useQuery('wished', async () => getWishesData(wishesId), {
    enabled: wishesId !== '',
  });

  const handleMoveToCakes = () => {
    router.push(`/cakes/${wishesId}`);
  };

  const handleMoveToHome = () => {
    router.push('/');
  };

  return (
    <>
      <Header>
        <IconButton onClick={modalToggle} src={GuideBtnIc} alt="서비스 가이드" />
      </Header>
      {isOpen && (
        <Modal isOpen={isOpen} modalToggle={modalToggle}>
          <GuideModal clickModal={modalToggle} />
        </Modal>
      )}

      <Styled.ContentContainer>
        <Styled.ImageContainer>
          <Styled.Title>
            조물주보다,
            <br />
            생일선물주
          </Styled.Title>

          <Image src={WishesChatImg} alt="선물주 채팅 이미지" />
          <Image src={LoginCakeImg} alt="로그인 케이크 이미지" />
        </Styled.ImageContainer>
        <Styled.About>
          {data?.name}님의 선물을 <br />
          고민중이셨다면?
        </Styled.About>
        <Styled.AboutSmall>선물주님들 사랑해요</Styled.AboutSmall>
      </Styled.ContentContainer>

      <Styled.ButtonContainer>
        <ButtonBox
          backgroundColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
          handleClick={handleMoveToCakes}
        >
          소원들어주러 가기
        </ButtonBox>
        <ButtonBox
          backgroundColor={theme.colors.pastel_blue}
          fontColor={theme.colors.main_blue}
          handleClick={handleMoveToHome}
        >
          나도 소원 빌러 가기
        </ButtonBox>
      </Styled.ButtonContainer>
    </>
  );
}

const Styled = {
  Title: styled.div`
    ${theme.fonts.title56};
    color: ${theme.colors.main_blue};
    margin: 2rem 0 2.8rem;
    display: flex;
    justify-content: center;
    white-space: pre-line;
  `,

  ContentContainer: styled.div``,

  ImageContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  About: styled.div`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 1.4rem 0 1.5rem;
    display: flex;
    justify-content: center;
  `,

  AboutSmall: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    display: flex;
    justify-content: center;
    margin: 0 0 10.15rem;
  `,

  ButtonContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */

    height: 11.4rem;
  `,
};
