import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { GuideBtnIc } from '@/public/assets/icons';
import { LoginCakeImg, WishesChatImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/common/button/iconButton';
import { useEffect, useState } from 'react';
import GuideModal from '@/components/common/modal/GuideModal';
import ButtonBox from '@/components/button/buttonBox';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getWishesData } from '@/api/cakes/getWishesData';

export default function WishesPage() {
  const [showModal, setShowModal] = useState(false);
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const { data } = useQuery('wished', async () => getWishesData(wishesId), {
    enabled: wishesId !== '',
  });

  const clickModal = () => {
    setShowModal(!showModal);
  };

  const moveCakesPage = () => {
    router.push(`/cakes/${wishesId}`);
  };

  const moveHome = () => {
    router.push('/');
  };

  return (
    <>
      <Header>
        <IconButton onClick={clickModal} src={GuideBtnIc} alt="서비스 가이드" />
      </Header>
      {showModal && <GuideModal clickModal={clickModal} />}

      <Styled.Container>
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
      </Styled.Container>
      <Styled.ButtonBoxWrapper>
        <ButtonBox
          backgroundColor={theme.colors.main_blue}
          fontColor={theme.colors.white}
          handleClick={moveCakesPage}
        >
          소원들어주러 가기
        </ButtonBox>
        <ButtonBox
          backgroundColor={theme.colors.pastel_blue}
          fontColor={theme.colors.main_blue}
          handleClick={moveHome}
        >
          나도 소원 빌러 가기
        </ButtonBox>
      </Styled.ButtonBoxWrapper>
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

  Container: styled.div``,

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

  ButtonBoxWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */

    height: 11.4rem;
  `,
};
