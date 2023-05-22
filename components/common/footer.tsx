import { ReactNode } from 'react';
import styled from 'styled-components';

interface FooterProps {
    children: ReactNode;
}

export default function Footer(props: FooterProps) {
    const { children } = props;
    return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
    Root: styled.footer`
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 2.2rem 5.4rem;
    `,
};

