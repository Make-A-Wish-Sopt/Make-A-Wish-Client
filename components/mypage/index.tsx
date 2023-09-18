import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/button/backBtn';
import router from 'next/router';
import Image from 'next/image';
import ItemBox from './itemBox';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import GuideModal from '@/components/common/modal/GuideModal';
import Modal from '@/components/common/modal/modal';
import useModal from '@/hooks/common/useModal';
import { MypageCakeImg } from '@/public/assets/images';
import { useEffect, useState } from 'react';
import useInitEditWishesInfo from '@/hooks/mypage/useInitEditWishesInfo';
import { deleteUserInfo } from '@/api/mypage/mypageAPI';


export default function MyPageContainer() {
  const { isOpen, handleToggle } = useModal();

  const [nickName, setNicknameState] = useState('');
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  useEffect(() => {
    setNicknameState(loginUserInfo.nickName);
  }, [loginUserInfo]);

  const { data } = useInitEditWishesInfo();

  const handleEditWish = () => {
    router.push('/mypage/editWishes');
  };
  const handleWishLinks = () => {
    router.push('/mypage/links');
  };

  // const handleCustomerService = () => {
  //   window.Kakao.Channel.chat({
  //     channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
  //   });
  // };
  const handleCustomerService = () => {
    if (window.Kakao && window.Kakao.Channel) {
      window.Kakao.Channel.chat({
        channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID,
      });
    } else {
      alert("채널 연결에 문제가 발생했습니다. 카카오톡에서 '조물주보다생일선물주'를 검색하여 문의해주세요.");
    }
  };

  const handleLogOut = () => {
    window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGOUT_REDIRECT_URI}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UserInfo');
    // useResetRecoilState(LoginUserInfo);
  };

  const handleWithdrawal = () => {
    if (window.confirm('탈퇴를 진행하시겠습니까?')) {
      deleteUserInfo();
    }
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <GuideModal clickModal={handleToggle} />
        </Modal>
      )}

      <Styled.Container>
        <Styled.TitleContainer>
          <Styled.ProfileImgContainer>
            <Image src={MypageCakeImg} alt="케이크 프로필" width={35} height={35} />
          </Styled.ProfileImgContainer>
          <Styled.Title>{nickName} 님</Styled.Title>
        </Styled.TitleContainer>

        <ItemBox
          handleClick={!data ? undefined : handleEditWish}
          {...(!data && {
            backgroundColor: theme.colors.gray1,
            color: theme.colors.gray2,
          })}
        >
          진행중인 소원 링크 정보 수정하기
        </ItemBox>
        <ItemBox
          handleClick={!data ? undefined : handleCustomerService}
          {...(!data && {
            backgroundColor: theme.colors.gray1,
            color: theme.colors.gray2,
          })}
        >
          진행중인 펀딩 중단하기
        </ItemBox>
        <ItemBox handleClick={handleWishLinks}>지난 소원 링크 모음</ItemBox>
        <ItemBox handleClick={handleToggle}>사용설명서 보기</ItemBox>
        <ItemBox handleClick={handleCustomerService}>고객센터 문의하기</ItemBox>

        <Styled.TextWrapper>
          <Styled.TextContainer onClick={handleLogOut}>로그아웃</Styled.TextContainer>
          <Styled.TextContainer onClick={handleWithdrawal}>회원탈퇴</Styled.TextContainer>
        </Styled.TextWrapper>
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

  Title: styled.h1`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.gray4};
    display: flex;
    align-items: center;
    margin: 0 0 0 1.5rem;
  `,

  TextContainer: styled.button`
    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};
    text-decoration: underline;
  `,

  ProfileImgContainer: styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 30rem;
  background-color: ${theme.colors.pastel_blue};
  display: flex;
  justify-content: center;
  padding-top: 0.5rem
`,

  TextWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    margin: 3rem 0 0;
  `,
};
