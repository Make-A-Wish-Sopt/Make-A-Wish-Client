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

interface RouteOptions {
  scroll?: boolean;
}

export function useRouters() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleBack() {
    router.back();
  }

  function handleRouter(path: RoutePathType, options?: RouteOptions) {
    if (!path) handleBack();
    else router.push(path, options);
  }

  function handleReplace(path: string, options?: RouteOptions) {
    router.replace(path, options);
  }

  function handleRefresh() {
    router.refresh();
  }

  const handleDelayRouter = (path: RoutePathType, delayMs?: number, options?: RouteOptions) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleRouter(path, options);
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
