import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import DdayText from '@/components/common/dDayText';
import SideContainer from '@/components/common/sideContainer';
import { useRouter } from 'next/router';
import CakeListButton from './cakeListButton';
import CakeListText from './cakeListText';
import { useGetWishesData } from '@/hooks/queries/wishes/useGetWishesData';
import { useGetCakesCount } from '@/hooks/queries/letters/useGetCakesCount';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { useEffect, useState } from 'react';
import { CakesCountData } from '@/recoil/cakesCountData';

export default function LettersMainContainer() {
  const [wishId, setWishId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishId(router.query.id);
  }, [router.isReady]);


  // nickname
  const loginUserInfo = useRecoilValue(LoginUserInfo);
  // D-day
  const { wishesData } = useGetWishesData(wishId);
  // cake 개수, 합
  const cakeCount = useRecoilValue(CakesCountData);
  const { total } = useGetCakesCount(wishId);

  const handleMoveToLetters = (cakeId: number) => {
    router.push(`/mypage/letters/${wishId}/${cakeId}`);
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.Container>
        <Styled.TitleContainer>
          <Styled.Title>
            {loginUserInfo.nickName}님에게 도착한
            <br />
            <Styled.TitleColor>{total}개</Styled.TitleColor>의 조각 케이크
            <br />
            편지 열어보기!
          </Styled.Title>
          <SideContainer>
            <DdayText days={wishesData?.dayCount ?? "?"} />
          </SideContainer>
        </Styled.TitleContainer>

        {cakeCount?.map((cake) => (
          <CakeListButton
            key={cake.cakeId}
            handleClick={() => handleMoveToLetters(cake.cakeId)}
            backgroundColor={theme.colors.pastel_blue}
            fontColor={theme.colors.gray4}
            image={cake.imageUrl}
          >
            <CakeListText
              fonts={theme.fonts.button18}
              cakeName={cake.name}
              cakeNum={cake.count}
            />
          </CakeListButton>
        ))}
      </Styled.Container >
    </>
  );
}

const Styled = {
  Container: styled.div`
  margin: 0 1rem 0;
  `,

  TitleContainer: styled.div`
    display: flex;
    margin: 2rem 0 0;
  `,

  Title: styled.h1`
    margin: 0 0 3rem;
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
  `,

  TitleColor: styled.span`
    color: ${theme.colors.main_blue};
  `,
};
