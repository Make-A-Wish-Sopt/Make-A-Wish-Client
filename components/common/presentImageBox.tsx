import theme from '@/styles/theme';
import styled from 'styled-components';

interface PresentImageBoxProps {
  children: React.ReactNode;
}

export default function PresentImageBox(props: PresentImageBoxProps) {
  const { children } = props;

  return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
  Box: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 16rem;

    border: 0.1rem solid ${theme.colors.main_blue};
    background-color: ${theme.colors.white};
    border-radius: 1.6rem;
  `,
};
