import { PropsWithChildren } from 'react';

export function GuideText({ children }: PropsWithChildren) {
  return (
    <p className="text-[24px] font-bitbit text-center text-white whitespace-pre-wrap transition-opacity duration-500 opacity-100 leading-tight">
      {children}
    </p>
  );
}
