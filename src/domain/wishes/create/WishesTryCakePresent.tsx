'use client';

import { getPublicWishes } from '@/api/public';
import ErrorPage from '@/app/error';
import TryGiveCake from './tryGiveCake';
import { useEffect, useState } from 'react';
import { PublicWishesDataType } from '@/types/api/response';
import Loading from '@/app/loading';

export default function WishesTryCakePresent({ wishId }: { wishId: string }) {
  const [publicWishesData, setPublicWishesData] = useState<PublicWishesDataType | null>(null);

  useEffect(() => {
    getPublicWishes(wishId).then((response) => {
      if (response === 'done') return;

      setPublicWishesData(response);
    });
  }, []);

  if (!publicWishesData) return <Loading />;

  return (
    <>
      <TryGiveCake publicWishesData={publicWishesData} wishId={wishId} />
    </>
  );
}
