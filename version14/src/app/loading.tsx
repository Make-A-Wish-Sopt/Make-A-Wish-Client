'use client';
import theme from '@/styles/theme';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

export default function Loading() {
  return (
    <Styled.Container>
      <ClipLoader color={theme.colors.main_blue} />
      <Styled.Title>로딩중입니다</Styled.Title>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 3rem;
  `,
};
