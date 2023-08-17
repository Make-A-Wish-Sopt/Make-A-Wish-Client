import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import router from 'next/router';
import ItemBox from './itemBox';
import { useRecoilValue } from 'recoil';
import { LoginUserInfo } from '@/recoil/auth/loginUserInfo';
import GuideModal from '@/components/common/modal/GuideModal';
import Modal from '@/components/common/modal';
import useModal from '@/hooks/common/useModal';

export default function MyPageContainer() {
  const { isOpen, handleToggle } = useModal();
  const loginUserInfo = useRecoilValue(LoginUserInfo);

  // const { isError } = useUserInfo();

  const handleEditWish = () => {
    // if (isError) return;
    // router.push('/mypage/editWishes');
  };
  const handleStopWish = () => {
    router.push('/');
  };
  const handleWishLinks = () => {
    router.push('/mypage/links');
  };
  const handleCustomerService = () => {
    window.Kakao.Channel.chat({
      channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID
    });
  };
  const handleLogOut = () => {
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
          <Styled.Title>
            {loginUserInfo.nickName} 님
          </Styled.Title>
        </Styled.TitleContainer>

        <ItemBox
          handleClick={handleEditWish}
        // {...(isError && {
        //   backgroundColor: theme.colors.gray1,
        //   color: theme.colors.gray2,
        // })}
        >
          진행중인 소원 링크 정보 수정하기
        </ItemBox>
        <ItemBox
          handleClick={handleStopWish}
        >
          진행중인 펀딩 중단하기
        </ItemBox>
        <ItemBox
          handleClick={handleWishLinks}
        >
          지난 소원 링크 모음
        </ItemBox>
        <ItemBox
          handleClick={handleToggle}
        >
          사용설명서 보기
        </ItemBox>
        <ItemBox
          handleClick={handleCustomerService}
        >
          고객센터 문의하기
        </ItemBox>

        <Styled.TextContainer onClick={handleLogOut}>
          로그아웃
        </Styled.TextContainer>

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
  `,

  TextContainer: styled.h1`
margin: 3rem 0 0;
${theme.fonts.button16_2};
  color: ${theme.colors.main_blue};
  text-decoration: underline;
`,
};
