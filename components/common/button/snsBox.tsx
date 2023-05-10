import theme from '@/styles/theme';
import styled from 'styled-components';

interface SnsBoxProps {
    children: React.ReactNode;
}

export default function SnsBox(props: SnsBoxProps) {
    const { children } = props;

    return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div`
    cursor: pointer;
    margin: 0 0.5rem 0;
  `,
};
