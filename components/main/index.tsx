import Header from './header';
import Button from './button';
import Cake from './cake';
import useGetProgressData from '@/hooks/queries/main/useGetProgressData';
import { useEffect, useState } from 'react';


export default function MainContainer() {
  const [status, setStatus] = useState('');

  const { progressData, wishStatus } = useGetProgressData();

  useEffect(() => {
    setStatus(wishStatus);
  }, [progressData, wishStatus]);

  return (
    <>
      <Header wishStatus={status} dayCount={progressData ? progressData.dayCount : '?'} cakeCount={progressData ? progressData.cakeCount : 0} />

      <Cake wishStatus={status} percent={progressData ? progressData.percent : 0} price={progressData ? progressData.price : 0} />

      <Button wishStatus={status} />
    </>
  );
}