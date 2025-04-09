import { PropsWithChildren } from 'react';

export function ItemWrapper({
  className,
  fixedBottom,
  fixedCenter,
  vertical,
  horizontal,
  children,
}: {
  className?: string;
  fixedBottom?: boolean;
  fixedCenter?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
} & PropsWithChildren) {
  return (
    <div
      className={`
        ${fixedBottom ? 'fixed bottom-fixed-bottom left-1/2 transform -translate-x-1/2 w-375 px-22' : ''}
        ${fixedCenter ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}
        ${vertical ? 'flex flex-col' : ''}
        ${horizontal ? 'flex' : ''}
        ${className ?? ''}
      `}
    >
      {children}
    </div>
  );
}
