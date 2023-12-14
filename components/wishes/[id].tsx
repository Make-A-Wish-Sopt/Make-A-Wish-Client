import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Button from '../common/button';
import MainView from '../common/mainView';
import { getWishesData } from '@/api/cakes/cakesAPI';

export default function WishesContainer() {
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  const { data } = useQuery('wished', getWishesData);

  // const { data } = useQuery('wished', async () => getWishesData(Number(wishesId)), {
  //     onError: (error: any) => {
  //       console.error("에러 발생:", error);
  //       alert("해당 소원의 펀딩이 아직 가능하지 않습니다. 펀딩 기간을 확인해주세요.");
  //       router.back();
  //     },
  //     enabled: wishesId !== '',
  //   });

  const handleMoveToCakes = () => {
    router.push(`/cakes/${wishesId}`);
  };

  const handleMoveToHome = () => {
    router.push('/');
  };

  return (
    <Styled.Container>
      <MainView text={`${data?.name ?? '? '}님의 선물을\n고민중이셨다면?`} />
      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={handleMoveToCakes}>
          소원 들어주러 가기
        </Button>

        <Button
          boxType="btn--large"
          colorSystem="pastelBlue_mainBlue"
          handleClickFn={handleMoveToHome}
        >
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
