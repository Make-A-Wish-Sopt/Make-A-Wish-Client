'use client';

import { useRouter } from 'next/navigation';

export type RoutePathType =
  | '/'
  | '/wishes'
  | `/wishes/${string}`
  | '/mypage'
  | `/mypage/${string}`
  | '/present'
  | `/present/${string}`;

export function useRouters() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  function handleRouter(path: RoutePathType) {
    router.push(path);
  }

  function handleReplace(path: string) {
    router.replace(path);
  }

  return { handleRouter, handleReplace, handleBack };
}
