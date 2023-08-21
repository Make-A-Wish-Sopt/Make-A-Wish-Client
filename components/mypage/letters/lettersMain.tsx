import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import { useRouter } from 'next/router';
import CakeListButton from './cakeListButton';
import CakeListText from './cakeListText';
import { useGetWishesData } from '@/hooks/queries/wishes/useGetWishesData';
import { useGetCakesCount } from '@/hooks/queries/letters/useGetCakesCount';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { useEffect, useState } from 'react';
import { CakesCountType } from '@/types/letters/cakesCountType';
import MainHeader from '@/components/common/mainHeader';

export default function LettersMainContainer() {
  const [wishId, setWishId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishId(router.query.id);
  }, [router.isReady]);


  // nickname
  const [nickName, setNicknameState] = useState("");
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  useEffect(() => {
    setNicknameState(loginUserInfo.nickName);
  }, [loginUserInfo]);

  // D-day
  // const { wishesData } = useGetWishesData(wishId);

  // cake 개수, 합
  const { cakesCount, total } = useGetCakesCount(wishId);

  const handleMoveToLetters = (cakeId: number) => {
    router.push(`/mypage/letters/${wishId}/${cakeId}`);
  };

  const title = (
    <Styled.Title>
      {nickName}님에게 도착한
      <br />
      <Styled.TitleColor>{total}개</Styled.TitleColor>의 조각 케이크
      <br />
      편지 열어보기!
    </Styled.Title>
  );

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.Container>
        <MainHeader title={title} />

        {cakesCount?.map((cake: CakesCountType) => (
          <CakeListButton
            key={cake.cakeId}
            handleClick={cake.count !== 0 ? () => handleMoveToLetters(cake.cakeId) : undefined}
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

  Title: styled.h1`
    margin: 0 0 3rem;
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
  `,

  TitleColor: styled.span`
    color: ${theme.colors.main_blue};
  `,
};
