'use client';

import { useRouters } from '@/hooks/common/useRouters';
import Image from 'next/image';
import { MenuIc } from 'public/assets/icons';

export default function MypageButton() {
  const { handleRouter } = useRouters();

  return (
    <Image
      src={MenuIc}
      alt="메뉴 아이콘"
      onClick={() => handleRouter('/mypage')}
      width={44}
      height={44}
      priority
    />
  );
}
