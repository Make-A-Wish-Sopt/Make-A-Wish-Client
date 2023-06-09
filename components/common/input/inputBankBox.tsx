import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputBankBoxProps {
  children: React.ReactNode;
  onClick: () => void;
}

export default function InputBankBox(props: InputBankBoxProps) {
  const { children, onClick } = props;

  return <Styled.Container onClick={onClick}>{children}</Styled.Container>;
}

const Styled = {
  Container: styled.div`
    width: 33.1rem;
    height: 5rem;

    display: flex;
    align-items: center;

    padding: 1.4rem 1.2rem;
    background-color: ${theme.colors.pastel_blue};
    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;

    cursor: pointer;
  `,
};
