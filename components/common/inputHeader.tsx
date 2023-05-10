import { ReactNode } from 'react';
import styled from 'styled-components';

interface InputHeaderProps {
  children: ReactNode;
}

export default function InputHeader(props: InputHeaderProps) {
  const { children } = props;

  return <Styled.Root>{children}</Styled.Root>;
}

const Styled = {
  Root: styled.header`
    height: 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-left: 0 -0.7rem;
  `,
};
