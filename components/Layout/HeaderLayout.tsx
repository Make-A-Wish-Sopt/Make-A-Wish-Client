import { PropsWithChildren } from 'react';

import styled from 'styled-components';
import Header from '../Header';

export default function HeaderLayout(props: PropsWithChildren) {
  const { children } = props;
  const WIDTH = '37.5rem';

  return (
    <>
      <Header width={WIDTH} />
      <Container width={WIDTH}>{children}</Container>
    </>
  );
}

const Container = styled.main<{ width: string }>`
  width: ${(props) => props.width};
  height: 100svh;

  padding: 0 2.2rem;
`;
