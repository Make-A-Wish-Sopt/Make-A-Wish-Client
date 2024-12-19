import {
  WishesLinkEditSubmitButton,
  WishesLinkInputs,
} from '@/domain/wishes/create/wishesLinkInputForm';
import { WishesLinkDataType } from '@/types/input';
import { WishStatusType } from '@/types/wishesType';
import { PropsWithChildren } from 'react';

export default function WisheLinkEditPageContainer({
  progressWishesData,
  wishesProgressStatus,
  children,
}: {
  progressWishesData: WishesLinkDataType;
  wishesProgressStatus: WishStatusType;
} & PropsWithChildren) {
  return (
    <>
      {children}
      <WishesLinkInputs
        wishTitle={progressWishesData.title}
        progressWishesData={progressWishesData}
        wishesProgressStatus={wishesProgressStatus}
      >
        <WishesLinkEditSubmitButton />
      </WishesLinkInputs>
    </>
  );
}
