'use client';

import { useRouter } from 'next/navigation';

export function handleRouter(path: string) {
  const router = useRouter();

  router.push(path);
}
