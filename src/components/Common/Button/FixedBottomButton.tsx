'use client';

import { ComponentProps, PropsWithChildren } from 'react';
import Button from '.';

type FixedBottomButtonProps = ComponentProps<typeof Button>;

export default function FixedBottomButton(props: PropsWithChildren<FixedBottomButtonProps>) {
  return (
    <div className={`fixed left-0 bottom-fixed-bottom w-full h-50 px-22 z-10`}>
      <Button {...props} />
    </div>
  );
}
