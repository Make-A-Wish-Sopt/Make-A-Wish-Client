'use client';

import { LoadingOverlay } from '@/components/UI/Loading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export type RoutePathType =
  | ''
  | '/'
  | '/wishes'
  | `/wishes/${string}`
  | '/mypage'
  | `/mypage/${string}`
  | '/present'
  | `/present/${string}`;

export function useRouters() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleBack() {
    router.back();
  }

  function handleRouter(path: RoutePathType) {
    if (!path) handleBack();
    else router.push(path);
  }

  function handleReplace(path: string) {
    router.replace(path);
  }

  function handleRefresh() {
    router.refresh();
  }

  const handleDelayRouter = (path: RoutePathType, delayMs?: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleRouter(path);
    }, delayMs || 800);
  };

  function LoadingModal({ render }: { render: JSX.Element }) {
    return loading ? <LoadingOverlay render={render} /> : null;
  }

  return {
    handleRouter,
    handleReplace,
    handleBack,
    handleRefresh,
    handleDelayRouter,
    LoadingModal,
  };
}
