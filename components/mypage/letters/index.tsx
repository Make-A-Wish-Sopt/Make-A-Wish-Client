import theme from '@/styles/theme';
import styled from 'styled-components';
import InputHeader from '@/components/common/inputHeader';
import BackBtn from '@/components/common/backBtn';
import DdayText from '@/components/common/dDayText';
import SideContainer from '@/components/common/sideContainer';
import router from 'next/router';
import CakeListButton from './cakeListButton';
import CakeListText from './cakeListText';
import { CAKE_LIST } from '@/constant/cakeList';

export default function MainLettersContainer() {
  const handleMoveToLetters = () => {
    router.push('/mypage/letters');
  };

  return (
    <>
      <InputHeader>
        <BackBtn />
      </InputHeader>

      <Styled.Container>
        <Styled.TitleContainer>
          <Styled.Title>
            { }님에게 도착한
            <br />
            <Styled.TitleColor>{ }개</Styled.TitleColor>의 조각 케이크
            <br />
            편지 열어보기!
          </Styled.Title>
          <SideContainer>
            <DdayText days={"DAY"} />
          </SideContainer>
        </Styled.TitleContainer>

        {CAKE_LIST.map((cake) => (
          <CakeListButton
            key={cake.cakeNumber}
            handleClick={handleMoveToLetters}
            backgroundColor={theme.colors.pastel_blue}
            fontColor={theme.colors.gray4}
            image={cake.smallImage}
          >
            <CakeListText
              fonts={theme.fonts.button18}
              cakeName={cake.name}
              cakeNum={0} />
          </CakeListButton>
        ))}
      </Styled.Container >
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

  TitleColor: styled.span`
    color: ${theme.colors.main_blue};
  `,
};
