'use client';

import { useRouter } from 'next/navigation';

export type RouterPathsType = '/' | '/wishes' | `/wishes/${string}` | '/mypage';

export function useRouters() {
  const router = useRouter();

  function handleRouter(path: RouterPathsType) {
    router.push(path);
  }

  return { handleRouter };
}
