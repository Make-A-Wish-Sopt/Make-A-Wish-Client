import { PropsWithChildren } from 'react';

import styled from 'styled-components';
import Header from '../header';

export default function HeaderLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <FixedSlot>
        <Header />
      </FixedSlot>
      <main>{children}</main>
    </>
  );
}

const FixedSlot = styled.div`
  width: 100%;
`;
