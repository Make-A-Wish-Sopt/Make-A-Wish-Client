'use client';

import { useGetPublicWishes } from '@/hooks/queries/public';
import { GivePresentForm } from './client';
import { MessageFromWisheMaker } from './server';

export default function GivePresentPageContainer({
  wishId,
  avatarCakeId,
}: {
  wishId: string;
  avatarCakeId: string;
}) {
  const { publicWishesData } = useGetPublicWishes(wishId);

  return (
    <GivePresentForm
      wantsGift={publicWishesData?.wantsGift}
      avatarCakeId={avatarCakeId}
      MessageFromWisheMaker={<MessageFromWisheMaker wishId={wishId} />}
      // CheckPresentItem={<CheckPresentItem />}
    />
  );
}
