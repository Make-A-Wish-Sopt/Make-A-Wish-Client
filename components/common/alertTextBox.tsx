import { ReactNode } from 'react';
import { AlertIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';

interface AlertTextBoxProps {
  children: ReactNode;
}

export default function AlertTextBox(props: AlertTextBoxProps) {
  const { children } = props;

  return (
    <Styled.Container>
      <Image src={AlertIc} alt="경고" />
      <Styled.Text>{children}</Styled.Text>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
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
