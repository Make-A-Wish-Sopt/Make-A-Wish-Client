import Header from './header';
import Button from './button';
import Cake from './cake';
import useGetProgressData from '@/hooks/queries/main/useGetProgressData';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import Footer from '../common/footer';

export default function MainContainer() {
  const [status, setStatus] = useState('');
  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);

  const { progressData, wishStatus } = useGetProgressData();

  useEffect(() => {
    setStatus(wishStatus);
    progressData &&
      setLoginUserInfo((prev) => ({
        ...prev,
        wishesId: progressData.wishId,
      }));
  }, [progressData, wishStatus]);

  return (
    <>
      <Header
        wishStatus={status}
        dayCount={progressData ? progressData.dayCount : '?'}
        cakeCount={progressData ? progressData.cakeCount : 0}
      />

      <Cake
        wishStatus={status}
        percent={progressData ? progressData.percent : 0}
        price={progressData ? progressData.price : 0}
      />

      <Button wishStatus={status} />
      <Footer />
    </>
  );
}
