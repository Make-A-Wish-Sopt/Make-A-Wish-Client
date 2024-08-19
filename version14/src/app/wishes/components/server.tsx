import { useGetMainProgressData } from '@/hooks/queries/wishes';
import { MainContentClient, WishesMessageClient } from './client';
import { MainProgressDataType } from '@/types/wishesType';

export function WishesMessage() {
  // const { progressData } = useGetMainProgressData();

  const progressData: MainProgressDataType = {
    wishId: '1',
    cakeCount: 1,
    dayCount: 1,
    price: 1134,
    percent: 13,
    status: 'BEFORE',
  };

  return <WishesMessageClient progressData={progressData} />;
}

export function MainContent() {
  // const { progressData } = useGetMainProgressData();

  const progressData: MainProgressDataType = {
    wishId: '1',
    cakeCount: 1,
    dayCount: 1,
    price: 1134,
    percent: 13,
    status: 'BEFORE',
  };

  return (
    <>
      <MainContentClient progressData={progressData} />
      
    </>
  );
}
