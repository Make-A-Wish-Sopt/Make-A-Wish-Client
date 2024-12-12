'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BackBtnIc, MenuIc } from '../../../public/assets/icons';
import { RoutePathType } from '@/hooks/common/useRouters';

interface HeaderProps {
  backBtn?: boolean;
  routePath?: RoutePathType;
  mypageBtn?: boolean;
  isLoggedIn?: boolean;
}

export default function Header(props: HeaderProps) {
  const { backBtn, mypageBtn, routePath } = props;
  const router = useRouter();

  function handleRouteBack() {
    if (routePath) {
      router.push(routePath);
    } else {
      router.back();
    }
  }

  return (
    <header className="flex justify-center w-full">
      <div className="flex justify-between items-center w-375 mt-2rem pt-16 px-22">
        {backBtn && <Image src={BackBtnIc} alt="뒤로가기 아이콘" onClick={handleRouteBack} />}
        <div></div>
        {mypageBtn && (
          <Image src={MenuIc} alt="메뉴 아이콘" onClick={() => router.push('/mypage')} />
        )}
      </div>
    </header>
  );
}
