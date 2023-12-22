import { ReactNode } from 'react';
import styled from 'styled-components';
import BackBtn from './ommon/button/backBtn';

interface HeaderProps {
  width: string;
  children?: ReactNode;
}

export default function Header(props: HeaderProps) {
  const { width, children } = props;

  return (
    <Styled.Container width={width}>
      <BackBtn />
      {children}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.header<{ width: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: ${(props) => props.width};
    height: 3rem;

    padding: 1rem 1.5rem;
    margin-top: 1.6rem;
  `,
};
