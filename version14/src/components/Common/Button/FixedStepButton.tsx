'use client';

import { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import Button from '.';
import { useStepInputContext } from '@/context/stepInputContext';

interface FixedStepButtonProps {}

export default function FixedStepButton(props: PropsWithChildren<FixedStepButtonProps>) {
  const { step, nextStep, prevStep,nextBtnDisabled,prevBtnDisabled } = useStepInputContext();

  return (
    <StFixedStepButtonWrapper>
      <Button size="half" color="mainBlue_white" onClick={prevStep} disabled={prevBtnDisabled}>
        이전
      </Button>
      <Button size="half" color="mainBlue_white" onClick={nextStep} disabled={ nextBtnDisabled}>
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
