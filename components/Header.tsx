import { ReactNode } from 'react';
import styled from 'styled-components';
import BackBtn from './common/button/backBtn';

interface HeaderProps {
  width: string;
  children?: ReactNode;
}

export default function Header(props: HeaderProps) {
  const { width, children } = props;

  return (
    <Styled.Container width={width}>
      <BackBtn />
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.header<{ width: string }>`
    display: flex;
    align-items: center;

    width: ${(props) => props.width};
    height: 3rem;

    padding: 0 1.5rem;
  `,
};
