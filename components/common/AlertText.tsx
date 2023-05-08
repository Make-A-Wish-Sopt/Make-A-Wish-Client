import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';

interface AlertTextBoxProps {
    children: React.ReactNode;
}

export default function AlertTextBox(props: AlertTextBoxProps) {
    const { children } = props;

    return <Styled.Box>
        <Image
            src="assets/icons/alertIC.svg"
            width={14}
            height={14}
            alt="Alert Icon" />
        <Styled.Text>{children}</Styled.Text>
    </Styled.Box>;
}

const Styled = {
    Box: styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    `,
    Text: styled.div`
    margin: 0 0.6rem 0;
    ${theme.fonts.body12};
    color: ${theme.colors.warning_red};
    `,
};