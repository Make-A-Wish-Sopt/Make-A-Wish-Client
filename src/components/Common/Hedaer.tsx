'use client';

import Image from 'next/image';
import { BackBtnIc, MenuIc } from '../../../public/assets/icons';
import { RoutePathType, useRouters } from '@/hooks/common/useRouters';

interface HeaderProps {
  leftMenu?: JSX.Element;
  centerMenu?: JSX.Element;
  rightMenu?: JSX.Element;
}

export default function Header(props: HeaderProps) {
  const { leftMenu, centerMenu, rightMenu } = props;

  return (
    <header className="flex justify-center w-full">
      <div className="flex justify-between items-center w-375 mt-2rem pt-16 px-22">
        {leftMenu}
        <div>{centerMenu}</div>
        {rightMenu}
      </div>
    </header>
  );
}

export function BackButton({ routePath }: { routePath?: RoutePathType }) {
  const { handleRouter, handleBack } = useRouters();

  function handleRouteBack() {
    if (routePath) {
      handleRouter(routePath);
    } else {
      handleBack();
    }
  }
  return <Image src={BackBtnIc} alt="뒤로가기 아이콘" onClick={handleRouteBack} />;
}

export function MypageButton() {
  const { handleRouter } = useRouters();

  return <Image src={MenuIc} alt="메뉴 아이콘" onClick={() => handleRouter('/mypage')} />;
}
