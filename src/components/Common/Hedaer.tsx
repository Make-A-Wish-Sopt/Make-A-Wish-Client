'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { BackBtnIc, MenuIc } from '../../../public/assets/icons';

interface HeaderProps {
  backBtn?: boolean;
  menuBtn?: boolean;
}

export default function Header(props: HeaderProps) {
  const { backBtn, menuBtn } = props;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex justify-center w-full">
      <div className="flex justify-between items-center min-w-375 max-w-500 w-full mt-2rem pt-16 px-22">
        {backBtn && <Image src={BackBtnIc} alt="뒤로가기 아이콘" onClick={() => router.back()} />}
        <div></div>
        {menuBtn && pathname === '/wishes' && <Image src={MenuIc} alt="메뉴 아이콘" />}
      </div>
    </header>
  );
}
