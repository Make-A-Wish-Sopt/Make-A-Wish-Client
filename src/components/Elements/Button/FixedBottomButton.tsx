'use client';

import { PropsWithChildren, ReactNode } from 'react';
import Button, { ButtonProps } from '.';

export default function FixedBottomButton({ children, ...rest }: PropsWithChildren & ButtonProps) {
  return (
    <Button
      {...rest}
      style={{
        position: 'fixed',
        left: '0',
        padding: '0 2.2rem',
        zIndex: 10,
      }}
    >
      {children}
    </Button>
  );
}

export function FixedBottomButtonWrapper({ children }: PropsWithChildren) {
  return (
    <div className="fixed bottom-fixed-bottom left-1/2 transform -translate-x-1/2 flex gap-10 w-375 px-22 z-10 ">
      {children}
    </div>
  );
}
