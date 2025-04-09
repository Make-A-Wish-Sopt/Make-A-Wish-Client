'use client';

import { RoutePathType, useRouters } from '@/hooks/useRouters';
import { BackBtnIc } from '@public/assets/icons';
import Image from 'next/image';

export function BackButton({ routePath, Icon }: { routePath?: RoutePathType; Icon?: JSX.Element }) {
  const { handleRouter, handleBack } = useRouters();

  function handleRouteBack() {
    if (routePath) {
      handleRouter(routePath);
    } else {
      handleBack();
    }
  }
  return (
    <button onClick={handleRouteBack}>
      {Icon ? Icon : <Image src={BackBtnIc} alt="뒤로가기 아이콘" />}
    </button>
  );
}
