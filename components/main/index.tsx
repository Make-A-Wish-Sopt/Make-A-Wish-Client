import Header from './header';

import Cake from './cake';
import useGetProgressData from '@/hooks/queries/main/useGetProgressData';
import { ReactNode, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import styled from 'styled-components';
import Button from '../common/button';
import { BtnBoxTypes, ColorSystemType } from '@/types/common/box/boxStyleType';
import useModal from '@/hooks/common/useModal';
import router from 'next/router';
import Modal from '../common/modal';
import ShareModal from '../common/modal/ShareModal';

export default function MainContainer() {
  const [status, setStatus] = useState('none');
  const setLoginUserInfo = useSetRecoilState(LoginUserInfo);

  const { progressData, wishStatus } = useGetProgressData();

  const { isOpen, handleToggle } = useModal();

  const handleMovePage = () => {
    router.push('/wishes');
  };

  useEffect(() => {
    setStatus(wishStatus);
    progressData &&
      setLoginUserInfo((prev) => ({
        ...prev,
        wishesId: progressData.wishId,
      }));
  }, [progressData, wishStatus]);

  const getButton = (): ReactNode | null => {
    if (wishStatus === 'end') return null;

    let colorSystem: ColorSystemType = 'mainBlue_white';
    let handleClickFn = handleMovePage;
    let btnText = '소원 링크 생성하기';

    if (wishStatus === 'before') {
      btnText = '내 소원 링크 공유하기';
    }

    if (wishStatus === 'while') {
      handleClickFn = handleToggle;
      colorSystem = 'pastelBlue_white';
    }

    return (
      <Button boxType="btn--large" colorSystem={colorSystem} handleClickFn={handleClickFn}>
        {btnText}
      </Button>
    );
  };

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

      <Styled.ButtonWrapper>{getButton()}</Styled.ButtonWrapper>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <ShareModal handleModalClick={handleToggle} />
        </Modal>
      )}
    </>
  );
}

const Styled = {
  ButtonWrapper: styled.div`
    margin-bottom: 10.4rem;
  `,
};
