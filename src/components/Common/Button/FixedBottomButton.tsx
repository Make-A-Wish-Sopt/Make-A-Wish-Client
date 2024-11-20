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
        // bottom: '5.4rem',
        padding: '0 2.2rem',
        zIndex: 10,
      }}
    >
      {children}
    </Button>
  );
}

export function FixedBottomButtonWrapper({ children }: PropsWithChildren) {
  return <div className="fixed left-0 bottom-fixed-bottom px-22 z-10 w-full">{children}</div>;
}
