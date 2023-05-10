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
    width: 100%;
    height: 16rem;
    background-color: ${theme.colors.white};
    cursor: pointer;
    margin: 0 1rem 1rem 0;
    float: left;
    border-radius: 1.6rem;
  `,
};
