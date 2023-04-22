import theme from '@/styles/theme';

import styled from 'styled-components';

export default function About() {
  return (
    <>
      <Styled.Root>Hello</Styled.Root>
      <Styled.Test>Hello Test 입니다!!</Styled.Test>
      <div style={{ backgroundColor: 'blue' }}>안녕하세요</div>
      <Styled.About>안녕하세요</Styled.About>
    </>
  );
}

const Styled = {
  Root: styled.div`
    ${theme.fonts.title1}
    font-size: 20px;
    font-weight: bold;
    background-color: ${theme.colors.bg_yellow};
  `,
  Test: styled.div`
    ${theme.fonts.body}
    font-size: 20px;
    font-weight: bold;
    background-color: ${theme.colors.dark_blue};
  `,
  About: styled.div`
    color: ${theme.colors.gray1};
    background-color: ${theme.colors.bg_yellow};
  `,
};
