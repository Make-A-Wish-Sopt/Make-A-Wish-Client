'use client';

import { ReactNode } from 'react';
import Button, { ButtonProps } from '.';

export default function FixedBottomButton({
  children,
  ...rest
}: { children: ReactNode } & ButtonProps) {
  return (
    <Button
      {...rest}
      style={{ position: 'fixed', left: '0', bottom: '5.4rem', padding: '0 2.2rem', zIndex: 10 }}
    >
      {children}
    </Button>
  );
}
