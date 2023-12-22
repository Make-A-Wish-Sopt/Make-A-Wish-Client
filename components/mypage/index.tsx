import theme from '@/styles/theme';
import styled from 'styled-components';
import router from 'next/router';
import Image from 'next/image';
import ItemBox from './itemBox';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import GuideModal from '@/components/common/modal/GuideModal';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/common/useModal';
import { MypageCakeImg } from '@/public/assets/images';
import { useEffect, useState } from 'react';
import { deleteUserInfo } from '@/api/user';
import { useGetMainProgressData } from '@/hooks/queries/wishes';

export default function MyPageContainer() {
  const { isOpen, handleToggle } = useModal();
  const [nickName, setNicknameState] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);
  const { progressData } = useGetMainProgressData();

  useEffect(() => {
    setNicknameState(loginUserInfo.nickName);
  }, [loginUserInfo]);

  const handleEditWish = () => {
    if (progressData?.status === 'END' || progressData === undefined) return;

    router.push('/mypage/editWishes');
  };

  const handleWishLinks = () => {
    router.push('/mypage/links');
  };

  const handleCustomerService = () => {
    if (progressData?.status === 'END' || progressData === undefined) return;

    if (window.Kakao && window.Kakao.Channel) {
      window.Kakao.Channel.chat({
        channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
      });
    } else {
      alert(
        "채널 연결에 문제가 발생했습니다. 카카오톡에서 '조물주보다생일선물주'를 검색하여 문의해주세요.",
      );
    }
  };

  const handleLogOut = () => {
    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserInfo');
    useResetRecoilState(LoginUserInfo);
  };

  const handleWithdrawal = () => {
    if (window.confirm('탈퇴를 진행하시겠습니까?')) {
      deleteUserInfo();
    }
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <GuideModal handleToggle={handleToggle} />
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
            handleClickFn={handleCustomerService}
            colorSystem={
              progressData?.status === 'END' || progressData === undefined
                ? 'gray1_gray2'
                : 'pastelBlue_mainBlue'
            }
          >
            진행중인 펀딩 중단하기
          </ItemBox>
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
          <Styled.TextButton onClick={handleWithdrawal}>회원탈퇴</Styled.TextButton>
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

    cursor: pointer;
  `,
};
