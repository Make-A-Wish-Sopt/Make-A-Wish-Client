import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputCakeBoxProps {
  children: React.ReactNode;
  isClicked: boolean;
}

export default function InputCakeBox(props: InputCakeBoxProps) {
  const { children, isClicked } = props;

  return <Styled.Box isClicked={isClicked}>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div<{ isClicked: boolean }>`
    width: 7.4rem;
    height: 4.6rem;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.8rem 1.4rem;
    border: 0.1rem solid ${theme.colors.main_blue};
    background-color: ${theme.colors.pastel_blue};
    border-radius: 0.6rem;

    cursor: pointer;
  `,
};
