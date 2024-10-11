'use client';

import { ReactNode } from 'react';

export default function FixedBottomButton({ children }: { children: ReactNode }) {
  return (
    <div className={`fixed left-0 bottom-fixed-bottom w-full h-50 px-22 z-10`}>{children}</div>
  );
}
