import { ReactNode } from 'react';
import { AlertSuccessIc, AlertWarningIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';

interface AlertTextBoxProps {
  alertSuccess?: boolean;
  children: ReactNode;
}

export default function AlertTextBox(props: AlertTextBoxProps) {
  const { alertSuccess, children } = props;

  return (
    <Styled.Container>
      <Image src={alertSuccess ? AlertSuccessIc : AlertWarningIc} alt="알림 아이콘" />
      <Styled.Text alertSuccess={alertSuccess}>{children}</Styled.Text>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
  `,
  Text: styled.span<{ alertSuccess?: boolean }>`
    margin-left: 0.6rem;
    ${theme.fonts.body12};
    color: ${(props) => (props.alertSuccess ? theme.colors.dark_blue : theme.colors.warning_red)};
  `,
};
