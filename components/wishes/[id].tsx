import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import theme from '@/styles/theme';
import BasicBox from '../common/box/BasicBox';
import Button from '../common/button/button';
import MainView from '../common/mainView';
import { getWishesData } from '@/api/cakes/cakesAPI';
import Footer from '../common/footer';

export default function WishesContainer() {
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const { data } = useQuery('wished', async () => getWishesData(Number(wishesId)), {
    enabled: wishesId !== '',
  });

  const handleMoveToCakes = () => {
    router.push(`/cakes/${wishesId}`);
  };

  const handleMoveToHome = () => {
    router.push('/');
  };

  return (
    <Styled.Container>
      <MainView text={`${data?.name ?? "? "}님의 선물을\n고민중이셨다면?`} />
      <Styled.ButtonWrapper>
        <BasicBox bgColor={theme.colors.main_blue} fontColor={theme.colors.white}>
          <Button handleClick={handleMoveToCakes}>소원 들어주러 가기</Button>
        </BasicBox>

        <BasicBox
          bgColor={theme.colors.pastel_blue}
          fontColor={theme.colors.main_blue}
          borderColor="transparent"
        >
          <Button handleClick={handleMoveToHome}>나도 소원 빌러 가기</Button>
        </BasicBox>
      </Styled.ButtonWrapper>
      <Footer />
    </Styled.Container>
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
    flex-direction: column;
    justify-content: space-between;

    height: 11rem;
  `,
};
