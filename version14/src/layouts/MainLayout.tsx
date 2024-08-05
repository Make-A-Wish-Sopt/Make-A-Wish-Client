'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <StLayoutContainer>
      <StLayoutWrapper>{children}</StLayoutWrapper>
    </StLayoutContainer>
  );
}

const StLayoutContainer = styled.main`
  display: flex;
  justify-content: center;
`;

const StLayoutWrapper = styled.div`
  min-width: 37.5rem;
  max-width: 50rem;

  width: 100%;
  height: 100%;

  padding: 0 2.2rem;
`;
