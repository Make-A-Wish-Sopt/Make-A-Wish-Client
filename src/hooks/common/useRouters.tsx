'use client';

import { useRouter } from 'next/navigation';

export type RouterPathsType =
  | '/'
  | '/wishes'
  | `/wishes/${string}`
  | '/mypage'
  | '/present'
  | `/present/${string}`;

export function useRouters() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  function handleRouter(path: RouterPathsType) {
    router.push(path);
  }

  function handleReplace(path: string) {
    router.replace(path);
  }

  return { handleRouter, handleReplace, handleBack };
}
