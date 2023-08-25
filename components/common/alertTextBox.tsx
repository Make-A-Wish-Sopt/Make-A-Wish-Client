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
    margin-left: 0.6rem;
    ${theme.fonts.body12};
    color: ${theme.colors.warning_red};
  `,
};
