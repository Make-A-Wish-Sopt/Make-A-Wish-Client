import { PropsWithChildren } from 'react';

import styled from 'styled-components';
import Header from '../eader';

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
  height: 100%;

  padding: 0 2.2rem;
`;
