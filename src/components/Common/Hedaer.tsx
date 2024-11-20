'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { BackBtnIc, MenuIc } from '../../../public/assets/icons';
import { RouterPathsType } from '@/hooks/common/useRouters';

interface HeaderProps {
  backBtn?: boolean;
  pathTo?: RouterPathsType;
  mypageBtn?: boolean;
  isLoggedIn?: boolean;
}

export default function Header(props: HeaderProps) {
  const { backBtn, mypageBtn, pathTo } = props;
  const pathname = usePathname();
  const router = useRouter();

  function handleRouteBack() {
    if (pathTo) {
      router.push(pathTo);
    } else {
      router.back();
    }
  }

  return (
    <header className="flex justify-center w-full">
      <div className="flex justify-between items-center min-w-375 max-w-500 w-full mt-2rem pt-16 px-22">
        {backBtn && <Image src={BackBtnIc} alt="뒤로가기 아이콘" onClick={handleRouteBack} />}
        <div></div>
        {mypageBtn && pathname === '/wishes' && (
          <Image src={MenuIc} alt="메뉴 아이콘" onClick={() => router.push('/mypage')} />
        )}
      </div>
    </header>
  );
}
