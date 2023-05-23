import theme from '@/styles/theme';
import styled from 'styled-components';

interface SnsBoxProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function SnsBox(props: SnsBoxProps) {
    const { children, onClick } = props;

    return <Styled.Box onClick={onClick}>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div`
    cursor: pointer;
    margin: 0 0.5rem 0;
  `,
};
