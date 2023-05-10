import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputCalendarProps {
    children: React.ReactNode;
}

export default function InputCalendar(props: InputCalendarProps) {
    const { children } = props;

    return <Styled.Box>{children}</Styled.Box>;
}

const Styled = {
    Box: styled.div`
    width: 16rem;
    height: 5rem;
    display: flex;
    margin: 0 1rem 0 0;

    padding: 1.4rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;

  `,
};
