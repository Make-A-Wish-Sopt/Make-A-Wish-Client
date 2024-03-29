import theme from '@/styles/theme';
import styled from 'styled-components';
import router from 'next/router';
import Image from 'next/image';
import ItemBox from './ItemBox';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import GuideModal from '@/components/Common/Modal/GuideModal';
import Modal from '@/components/Common/Modal';
import useModal from '@/hooks/common/useModal';
import { MypageCakeImg } from '@/public/assets/images';
import { useEffect, useState } from 'react';
import { useGetMainProgressData, usePatchProgressWishes } from '@/hooks/queries/wishes';
import CancleWishesModal from '../Common/Modal/CancelWishesModal';

export default function MyPageContainer() {
  const { isOpen, handleToggle } = useModal();
  const [cancleModalState, setCancleModalState] = useState(false);
  const [nickName, setNicknameState] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  const { progressData } = useGetMainProgressData();
  const { handlePatchProgressWishes } = usePatchProgressWishes();

  useEffect(() => {
    setNicknameState(loginUserInfo.nickName);
  }, [loginUserInfo]);

  const handleCancleModalState = () => {
    if (progressData?.status === 'END' || progressData === undefined) return;
    setCancleModalState(!cancleModalState);
  };

  const handleEditWish = () => {
    if (progressData?.status === 'END' || progressData === undefined) return;

    router.push('/mypage/editWishes');
  };

  const handleWishLinks = () => {
    router.push('/mypage/links');
  };

  const handleCustomerService = () => {
    window.open('https://sunmulzu.notion.site/5c1945f34dd3440a984d09cf52f7a591');
  };

  const handleLogOut = () => {
    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserInfo');
    useResetRecoilState(LoginUserInfo);
  };

  // const handleWithdrawal = () => {
  //   if (window.confirm('탈퇴를 진행하시겠습니까?')) {
  //     deleteUserInfo();
  //     router.push('/');
  //   }
  // };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <GuideModal handleToggle={handleToggle} />
        </Modal>
      )}

      {cancleModalState && (
        <Modal isOpen={cancleModalState} handleToggle={handleCancleModalState}>
          <CancleWishesModal
            handleToggle={handleCancleModalState}
            handleCancleWishes={handlePatchProgressWishes}
          />
        </Modal>
      )}

      <Styled.Container>
        <Styled.TitleContainer>
          <Styled.ProfileImgContainer>
            <Image src={MypageCakeImg} alt="케이크 프로필" width={35} height={35} />
          </Styled.ProfileImgContainer>
          <Styled.Title>{nickName} 님</Styled.Title>
        </Styled.TitleContainer>

        <Styled.ItemBoxWrapper>
          <ItemBox
            handleClickFn={handleEditWish}
            colorSystem={
              progressData?.status === 'END' || progressData === undefined
                ? 'gray1_gray2'
                : 'pastelBlue_mainBlue'
            }
          >
            진행중인 소원 링크 정보 수정하기
          </ItemBox>
          <ItemBox
            handleClickFn={handleCancleModalState}
            colorSystem={
              progressData?.status === 'END' || progressData === undefined
                ? 'gray1_gray2'
                : 'pastelBlue_mainBlue'
            }
          >
            진행중인 펀딩 중단하기
          </ItemBox>
          {}
          <ItemBox handleClickFn={handleWishLinks} colorSystem="pastelBlue_mainBlue">
            지난 소원 링크 모음
          </ItemBox>
          <ItemBox handleClickFn={handleToggle} colorSystem="pastelBlue_mainBlue">
            사용설명서 보기
          </ItemBox>
          <ItemBox handleClickFn={handleCustomerService} colorSystem="pastelBlue_mainBlue">
            고객센터 문의하기
          </ItemBox>
        </Styled.ItemBoxWrapper>

        <Styled.TextButtonWrapper>
          <Styled.TextButton onClick={handleLogOut}>로그아웃</Styled.TextButton>
          {/* <Styled.TextButton onClick={handleWithdrawal}>회원탈퇴</Styled.TextButton> */}
        </Styled.TextButtonWrapper>
      </Styled.Container>
    </>
  );
}

const Styled = {
  Container: styled.div`
    margin: 0 1rem 0;
  `,

  TitleContainer: styled.div`
    display: flex;
    margin: 2rem 0 2rem;
  `,

  ItemBoxWrapper: styled.ul`
    display: flex;
    flex-direction: column;

    gap: 1.2rem;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    display: flex;
    align-items: center;
    margin: 0 0 0 1.5rem;
  `,

  ProfileImgContainer: styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 30rem;
    background-color: ${theme.colors.pastel_blue};
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
  `,

  TextButtonWrapper: styled.ul`
    display: flex;
    flex-direction: column;
    align-items: left;

    width: 100%;

    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};
    text-decoration: underline;

    margin-top: 3rem;
  `,

  TextButton: styled.li`
    line-height: 30px;
    margin-bottom: 3rem;

    cursor: pointer;
  `,
};
