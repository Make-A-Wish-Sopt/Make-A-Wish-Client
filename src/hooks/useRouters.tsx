'use client';

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

  const handleDelayRouter = (path: RoutePathType, delayMs?: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleRouter(path);
    }, delayMs || 800);
  };

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

  const LoadingComponent = ({ render }: { render: JSX.Element }) => {
    return loading ? (
      <>
        <div
          id="modal-overlay"
          className={
            'fixed top-0 left-0 flex justify-center items-center w-full h-full z-[9999] bg-black/70'
          }
        >
          <div
            className={'fixed top-0 w-375 h-full flex flex-col items-center justify-center'}
            style={{
              animation: 'appearAnimation 0.3s ease-out forwards',
            }}
          >
            {render}
          </div>
          <style jsx>{`
            @keyframes appearAnimation {
              0% {
                transform: scale(0);
                opacity: 0;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </>
    ) : null;
  };

  return {
    handleRouter,
    handleReplace,
    handleBack,
    handleRefresh,
    handleDelayRouter,
    LoadingComponent,
  };
}
