import { ReactNode } from 'react';
import styled from 'styled-components';
import BackBtn from './common/button/backBtn';

interface HeaderProps {
  children?: ReactNode;
}

export default function Header(props: HeaderProps) {
  const { children } = props;

  return <Styled.Container>{/* <BackBtn /> */}</Styled.Container>;
}

const Styled = {
  Container: styled.header`
    display: flex;

    width: 100%;
    height: 3rem;

    padding: 0 1.5rem;
  `,
};
