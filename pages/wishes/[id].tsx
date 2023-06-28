import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { GuideBtnIc } from '@/public/assets/icons';
import { LoginCakeImg, WishesChatImg } from '@/public/assets/images';
import Header from '@/components/common/header';
import IconButton from '@/components/common/button/iconButton';
import { useEffect, useState } from 'react';
import GuideModal from '@/components/common/modal/GuideModal';
import ButtonBox from '@/components/common/button/buttonBox';
import { useRouter } from 'next/router';
import { useGetWishesData } from '@/hooks/queries/wishes/wishes';

export default function WishesPage() {
  const [showModal, setShowModal] = useState(false);
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  const { wishesData } = useGetWishesData(wishesId);

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const handleClickModal = () => {
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
        <IconButton onClick={handleClickModal} src={GuideBtnIc} alt="서비스 가이드" />
      </Header>
      {showModal && <GuideModal clickModal={handleClickModal} />}

      <>
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
          {wishesData?.name}님의 선물을 <br />
          고민중이셨다면?
        </Styled.About>
        <Styled.AboutSmall>선물주님들 사랑해요</Styled.AboutSmall>
      </>
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
    display: flex;
    justify-content: center;

    ${theme.fonts.title56};
    color: ${theme.colors.main_blue};
    margin: 2rem 0 2.8rem;

    white-space: pre-line;
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

    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 1.4rem 0 1.5rem;
  `,

  AboutSmall: styled.div`
    display: flex;
    justify-content: center;

    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};

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
