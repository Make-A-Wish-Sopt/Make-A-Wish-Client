import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputBoxProps {
  children: React.ReactNode;
}

export default function InputBox(props: InputBoxProps) {
  const { children } = props;

  return <Styled.Container >{children}</Styled.Container>;
}

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 5rem;

    display: flex;
    align-items: center;

    padding: 1.2rem 1rem 1.2rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
  `,
};
