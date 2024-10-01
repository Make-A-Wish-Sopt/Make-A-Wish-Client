'use client';

import { ReactNode } from 'react';

export default function ErrorPage({
  alertMessage,
  children,
}: {
  alertMessage?: string;
  children?: ReactNode;
}) {
  if (alertMessage) {
    alert(alertMessage);
    window.location.replace('/');
  }
  return (
    <>
      <h1 className="text-white text-[56px]">Error Page</h1>;{children}
    </>
  );
}
