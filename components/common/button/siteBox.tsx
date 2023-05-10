import theme from '@/styles/theme';
import styled from 'styled-components';

interface SiteBoxProps {
    children: React.ReactNode;
}

export default function SiteBox(props: SiteBoxProps) {
    const { children } = props;

    return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div`
    display: inline-block;
    width: 6rem;
    height: 6rem;
    background-color: ${theme.colors.white};
    cursor: pointer;
    margin: 0 1rem 1rem 0;
  `,
};
