import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputCalendarProps {
    children: React.ReactNode;
    borderColor: string;
}

export default function InputCalendar(props: InputCalendarProps) {
    const { children, borderColor } = props;

    return <Styled.Box borderColor={borderColor}>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div<{ borderColor: string }>`
    width: 16rem;
    height: 5rem;
    display: flex;
    margin: 0 1rem 0 0;

    padding: 1.4rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid;
    border-color: ${(props) => props.borderColor};
    border-radius: 1rem;

  `,
};
