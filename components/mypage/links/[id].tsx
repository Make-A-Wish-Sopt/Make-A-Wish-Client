import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import theme from '@/styles/theme';
import { LinkBeefCakeImg } from '@/public/assets/images';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/button/backBtn';
import { useEffect, useState } from 'react';
import { useGetOneWish } from '@/hooks/queries/links/useGetOneWish';
import { convertDateFormat } from '@/hooks/useDate';
import VerticalProgressBar from '@/components/common/verticalProgressBar';

export default function LinksContainer() {
  const [wishId, setWishId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishId(router.query.id);
  }, [router.isReady]);

  const { wishData } = useGetOneWish(wishId);

  const handleMovePage = () => {
    router.push(`/mypage/letters/${wishId}`);
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.Title>{wishData?.title}</Styled.Title>
      <Styled.Date>{`${convertDateFormat(wishData?.startAt)} ~ ${convertDateFormat(wishData?.endAt)}`}</Styled.Date>

      <Styled.CenterContainer>
        <Styled.ContentContainer>
          <Styled.ImageContainer>
            <Image src={LinkBeefCakeImg} alt="케이크" width={152} height={169}} />
          </Styled.ImageContainer>
          <Styled.About onClick={handleMovePage}>모인 케이크 보러가기 {'>'} </Styled.About>
          <Styled.AboutSmall>총 {wishData?.price}원</Styled.AboutSmall>
        </Styled.ContentContainer>

        <VerticalProgressBar percent={wishData?.percent} />

      </Styled.CenterContainer>
    </>
  );
}

const Styled = {
  Title: styled.div`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    margin: 2rem 0 0.5rem;
  `,

  Date: styled.div`
    ${theme.fonts.body16};
    color: ${theme.colors.gray4};
  `,

  CenterContainer: styled.div`
    margin: 9rem 0 15.5rem;
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
  `,

  ContentContainer: styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`,

  BarContainer: styled.div`
    float: right;
    margin: 0rem 1.5rem 0 0;
  `,

  ImageContainer: styled.div`
    width: 100%;
    text-align: center;
    padding: 4rem 0 0;
  `,

  About: styled.div`
  display: flex;
  justify-content: center;
    margin: 0 0 1rem;
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
  `,

  AboutSmall: styled.div`
    display: flex;
    justify-content: center;
    ${theme.fonts.headline24_100};
  `,
};
