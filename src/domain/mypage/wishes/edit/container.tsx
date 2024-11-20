import { getProgressWishLinkData } from '@/api/wishes';

import dynamic from 'next/dynamic';

export default async function WishesEditPageContainer() {
  const progressWishLinkData = await getProgressWishLinkData();

  return (
    <>
      {/* <WishesCreateStepTitle stepTitle={'생일잔치 링크 수정하기'} />
      <WishesLinkInputForm progressWishesLinkData={progressWishLinkData} />
      <WishesAccountInputForm /> */}
    </>
  );
}
