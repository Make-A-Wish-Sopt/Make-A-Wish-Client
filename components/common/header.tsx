import { ReactNode } from 'react';
import styled from 'styled-components';

interface HeaderProps {
    children: ReactNode;
}

export default function Header(props: HeaderProps) {
    const { children } = props;

    return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
    Root: styled.header`
    display: flex;
    justify-content: right;
  `,
};
