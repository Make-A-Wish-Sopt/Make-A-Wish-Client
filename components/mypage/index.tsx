import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import router from 'next/router';
import ButtonBox from '@/components/common/button/buttonBox';
import Image from 'next/image';
import { MypageCakeImg, MypageChatImg } from '@/public/assets/images';


export default function MyPageContainer() {
  const handleMoveToWish = () => {
    router.push('.');
  };
  const handleMoveToList = () => {
    router.push('.');
  };
  const handleMoveToChat = () => {
    router.push('.');
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.Container>
        <Styled.TitleContainer>
          <Styled.Title>
            { }이화정 님
          </Styled.Title>
        </Styled.TitleContainer>

        <Styled.ImageContainer>
          <Image src={MypageChatImg} alt="이뤄져라 얍!" />
          <Image src={MypageCakeImg} alt="케이크" />
        </Styled.ImageContainer>

        <Styled.AlertText>현재 생일 주간이 아니예요!</Styled.AlertText>
        <Styled.ButtonContainer>
          <ButtonBox
            backgroundColor={theme.colors.gray1}
            fontColor={theme.colors.gray2}
            handleClick={handleMoveToWish}
          >
            진행중인 소원 링크 정보 수정하기
          </ButtonBox>
          <ButtonBox
            backgroundColor={theme.colors.main_blue}
            fontColor={theme.colors.white}
            handleClick={handleMoveToList}
          >
            나의 소원 링크 모음
          </ButtonBox>
          <ButtonBox
            backgroundColor={theme.colors.main_blue}
            fontColor={theme.colors.white}
            handleClick={handleMoveToChat}
          >
            고객센터 문의하기
          </ButtonBox>
        </Styled.ButtonContainer>

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
  margin: 2rem 0 0;
  `,

  Title: styled.h1`
  margin: 0 0 3rem;
  ${theme.fonts.headline24_130};
  color: ${theme.colors.gray4};
  `,

  ImageContainer: styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 6.7rem 0 8rem;
  `,

  ButtonContainer: styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 17.8rem;
  `,

  AlertText: styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1rem;
  ${theme.fonts.body14};
  color: ${theme.colors.warning_red};
`,
};
