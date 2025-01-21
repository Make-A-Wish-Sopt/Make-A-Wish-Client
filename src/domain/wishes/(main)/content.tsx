import { PropsWithChildren } from 'react';

export function DayCount({ children }: PropsWithChildren) {
  return (
    <p className="flex flex-row-reverse w-full text-[24px] font-bitbit text-center text-main_blue mt-12 mb-10">
      {children}
    </p>
  );
}
