import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import { useRouter } from 'next/router';
import CakeListButton from './cakeListButton';
import { useGetCakesCount } from '@/hooks/queries/letters/useGetCakesCount';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import { useEffect, useState } from 'react';
import MainHeader from '@/components/common/mainHeader';
import { CAKE_LIST } from '@/constant/cakeList';

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

  // cake 개수, 합
  const { cakesCount, total } = useGetCakesCount(wishId);

  const getCakeNum = (cakeId: number, cakesCount: any[]): number => {
    if (!cakesCount) {
      return 0;
    }

    const cake = cakesCount.find(cake => cake.cakeId === cakeId);
    return cake ? cake.count : 0;
  };


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

        {CAKE_LIST?.map((cake) => (
          <CakeListButton
            key={cake.name}
            handleClick={getCakeNum(cake.cakeNumber, cakesCount) !== 0 ? () => handleMoveToLetters(cake.cakeNumber) : undefined}
            backgroundColor={theme.colors.pastel_blue}
            fontColor={theme.colors.gray4}
            fonts={theme.fonts.button18}

            image={cake.smallImage}
            cakeName={cake.name}
            cakeNum={getCakeNum(cake.cakeNumber, cakesCount)}
          />
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