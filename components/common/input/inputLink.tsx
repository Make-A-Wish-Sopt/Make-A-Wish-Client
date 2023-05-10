import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLinkProps {
    children: React.ReactNode;
}

export default function InputLink(props: InputLinkProps) {
    const { children } = props;

    return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div`
    width: 100%;
    height: 4.8rem;

    display: flex;
    align-items: center;

    padding: 1.4rem 1.2rem;
    background-color: ${theme.colors.main_blue};
    border-radius: 1rem;
  `,
};
