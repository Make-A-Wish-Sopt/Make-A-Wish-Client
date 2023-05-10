import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLargeBoxProps {
    children: React.ReactNode;
}

export default function InputLargeBox(props: InputLargeBoxProps) {
    const { children } = props;

    return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div`
    width: 100%;
    height: 15rem;

    padding: 1.4rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;
    text-align: right;
    `,
};
