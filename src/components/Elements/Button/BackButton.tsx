'use client';

import { RoutePathType, useRouters } from '@/hooks/common/useRouters';
import Image from 'next/image';
import { BackBtnIc } from 'public/assets/icons';

export default function BackButton({ routePath }: { routePath?: RoutePathType }) {
  const { handleRouter, handleBack } = useRouters();

  function handleRouteBack() {
    if (routePath) {
      handleRouter(routePath);
    } else {
      handleBack();
    }
  }
  return (
    <Image
      src={BackBtnIc}
      alt="뒤로가기 아이콘"
      onClick={handleRouteBack}
      width={13}
      height={23}
      priority
    />
  );
}
