import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLargeBoxProps {
  bgColor: string;
  children: React.ReactNode;
}

export default function InputLargeBox(props: InputLargeBoxProps) {
  const { bgColor, children } = props;

  return <Styled.Box bgColor={bgColor}>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div<{ bgColor: string }>`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 15rem;

    padding: 1.4rem 1.2rem;
    background-color: ${(props) => props.bgColor};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
  `,
};
