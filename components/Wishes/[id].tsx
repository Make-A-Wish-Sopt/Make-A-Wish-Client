import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Button from '../Common/Button';
import MainView from '../Common/mainView';
import { useGetSingleWishInfo } from '@/hooks/queries/wishes';
import { getPublicWishes } from '@/api/public';
import { useGetPublicWishes } from '@/hooks/queries/public';

export default function WishesContainer() {
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const { publicWishesData } = useGetPublicWishes(wishesId);

  const handleMoveToCakes = () => {
    router.push(`/cakes/${wishesId}`);
  };

  const handleMoveToHome = () => {
    router.push('/');
  };

  return (
    <Styled.Container>
      <MainView text={`${publicWishesData?.name ?? '? '}님의 선물을\n고민중이셨다면?`} />
      <Styled.ButtonWrapper>
        <Button boxType="large" colorSystem="mainBlue_white" handleClickFn={handleMoveToCakes}>
          소원 들어주러 가기
        </Button>

        <Button boxType="large" colorSystem="pastelBlue_mainBlue" handleClickFn={handleMoveToHome}>
          나도 소원 빌러 가기
        </Button>
      </Styled.ButtonWrapper>
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

    width: 100%;
    height: 11rem;

    margin-bottom: 4.6rem;
  `,
};
