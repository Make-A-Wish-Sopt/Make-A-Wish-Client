import {
  WishesLinkEditSubmitButton,
  WishesLinkInputs,
} from '@/domain/wishes/create/wishesLinkInputForm';
import { WishesLinkDataType } from '@/types/input';
import { PropsWithChildren } from 'react';

export default function WisheLinkEditPageContainer({
  progressWishesData,
  children,
}: { progressWishesData: WishesLinkDataType } & PropsWithChildren) {
  return (
    <>
      {children}
      <WishesLinkInputs
        wishTitle={progressWishesData.title}
        progressWishesData={progressWishesData}
      >
        <WishesLinkEditSubmitButton />
      </WishesLinkInputs>
    </>
  );
}
