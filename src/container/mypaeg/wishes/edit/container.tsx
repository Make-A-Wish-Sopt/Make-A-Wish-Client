import { getProgressWishLinkData } from '@/api/wishes';
import { WishesLinkInputForm } from '@/container/wishes/create/client';
import { WishesAccountInputForm, WishesCreateStepTitle } from '@/container/wishes/create/server';

export default async function WishesEditPageContainer() {
  const progressWishLinkData = await getProgressWishLinkData();

  return (
    <>
      <WishesCreateStepTitle stepTitle={'생일잔치 링크 수정하기'} />
      <WishesLinkInputForm progressWishesLinkData={progressWishLinkData} />
      <WishesAccountInputForm />
    </>
  );
}
