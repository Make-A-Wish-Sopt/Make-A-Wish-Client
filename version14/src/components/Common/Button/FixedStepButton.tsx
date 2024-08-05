'use client';

import { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import Button from '.';

interface FixedStepButtonProps {}

// type FixedStepButtonProps = ComponentProps<typeof Button>;

export default function FixedStepButton(props: PropsWithChildren<FixedStepButtonProps>) {
  return (
    <StFixedStepButtonWrapper>
      <Button size="half" color="mainBlue_white">
        이전
      </Button>
      <Button size="half" color="mainBlue_white">
        다음
      </Button>
    </StFixedStepButtonWrapper>
  );
}

const StFixedStepButtonWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 10.4rem;

  display: flex;

  justify-content: space-between;
  gap: 1rem;

  width: 100%;

  margin-top: 2rem;
  padding: 0 2.2rem;

  ${({ theme }) => theme.fonts.button18};
`;
