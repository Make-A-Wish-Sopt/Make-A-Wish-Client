import Header from './header';
import Button from './button';
import Cake from './cake';
import useGetProgressData from '@/hooks/queries/main/useGetProgressData';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import styled from 'styled-components';

export default function MainContainer() {
  const [status, setStatus] = useState('none');
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

      <Styled.ButtonWrapper>
        <Button wishStatus={status} />
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  ButtonWrapper: styled.div`
    margin-bottom: 10.4rem;
  `,
};
