import Header from './header';
import Button from './button';
import Cake from './cake';
import useGetProgressData from '@/hooks/queries/main/useGetProgressData';


export default function MainContainer() {
  const { progressData, wishStatus } = useGetProgressData();

  return (
    <>
      <Header wishStatus={wishStatus} dayCount={progressData ? progressData.dayCount : '?'} cakeCount={progressData ? progressData.cakeCount : 0} />

      <Cake wishStatus={wishStatus} percent={progressData ? progressData.percent : 0} price={progressData ? progressData.price : 0} />

      <Button wishStatus={wishStatus} />
    </>
  );
}