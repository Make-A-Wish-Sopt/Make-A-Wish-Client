import { PropsWithChildren } from 'react';

import styled from 'styled-components';
import Header from '../header';

export default function HeaderLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}

const Container = styled.main`
  width: 37.5rem;
  height: 100%;

  padding: 2.2rem 2.2rem 0 2.2rem;
`;
