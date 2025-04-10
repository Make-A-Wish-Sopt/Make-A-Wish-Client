'use client';

import { RoutePathType, useRouters } from '@/hooks/useRouters';
import { BackBtnIc } from '@public/assets/icons';
import Image from 'next/image';

export default function BackButton({
  routePath,
  Icon = <Image src={BackBtnIc} alt="뒤로가기 아이콘" />,
}: {
  routePath?: RoutePathType;
  Icon?: JSX.Element;
}) {
  const { handleRouter, handleBack } = useRouters();

  function handleRouteBack() {
    if (routePath) {
      handleRouter(routePath);
    } else {
      handleBack();
    }
  }
  return (
    <button type="button" onClick={handleRouteBack}>
      {Icon}
    </button>
  );
}
