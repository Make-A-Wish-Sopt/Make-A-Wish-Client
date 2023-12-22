import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export default function EmptyLayout(props: PropsWithChildren) {
  const { children } = props;
  return <Container>{children}</Container>;
}

const Container = styled.main`
  width: 37.5rem;
  height: 100%;

  padding: 2.2rem 2.2rem 0 2.2rem;
`;
