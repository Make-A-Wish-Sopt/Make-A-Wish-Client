'use client';

import { ComponentProps, PropsWithChildren } from 'react';
import styled from 'styled-components';
import Button from '.';

type FixedBottomButtonProps = ComponentProps<typeof Button>;

export default function FixedBottomButton(props: PropsWithChildren<FixedBottomButtonProps>) {
  return (
    <StFixedBottomButtonWrapper>
      <Button {...props} />
    </StFixedBottomButtonWrapper>
  );
}

const StFixedBottomButtonWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 10.4rem;

  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-top: 2rem;
  padding: 0 2.2rem;

  ${({ theme }) => theme.fonts.button18}
`;
