import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputContainerProps {
  children: ReactNode;
}

export default function InputContainer(props: InputContainerProps) {
  const { children } = props;
  return <Container>{children}</Container>;
}

const Container = styled.section`
  margin-bottom: 4rem;
`;
