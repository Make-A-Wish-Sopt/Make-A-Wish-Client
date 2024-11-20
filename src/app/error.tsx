'use client';

import { RouterPathsType } from '@/hooks/common/useRouters';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function ErrorPage({
  alertMessage,
  pathTo,
  children,
}: {
  alertMessage?: string;
  pathTo?: RouterPathsType;
  children?: ReactNode;
}) {
  const router = useRouter();
  if (alertMessage) {
    alert(alertMessage);
    if (pathTo) {
      router.push(pathTo);
    } else {
      router.push('/');
    }
  }
  return (
    <>
      <h1 className="text-white text-[56px]">Error Page</h1>;{children}
    </>
  );
}
