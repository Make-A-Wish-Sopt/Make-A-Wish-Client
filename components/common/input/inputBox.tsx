import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputBoxProps {
  children: React.ReactNode;
}

export default function InputBox(props: InputBoxProps) {
  const { children } = props;

  return <Styled.Box >{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div`
    width: 33.1rem;
    height: 5rem;

    display: flex;
    align-items: center;

    padding: 1.4rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
  `,
};
