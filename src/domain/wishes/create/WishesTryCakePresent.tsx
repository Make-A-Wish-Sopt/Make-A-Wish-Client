'use client';

import TryGiveCake from './tryGiveCake';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { getProgressWishLinkData } from '@/api/wishes';
import { WishesLinkDataType } from '@/types/input';
import { WishStatusType } from '@/types/wishesType';

export default function WishesTryCakePresent({ wishId }: { wishId: string }) {
  const [progressWishLinkData, setProgressWishLinkData] = useState<
    (WishesLinkDataType & { status: WishStatusType }) | null
  >(null);

  useEffect(() => {
    getProgressWishLinkData().then((response) => {
      setProgressWishLinkData(response);
    });
  }, []);

  return (
    <>
      {progressWishLinkData ? (
        <TryGiveCake progressWishLinkData={progressWishLinkData} wishId={wishId} />
      ) : (
        <Loading />
      )}
    </>
  );
}
