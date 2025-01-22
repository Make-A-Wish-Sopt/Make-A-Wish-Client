import { PresentDataType, WishesLinkDataType } from '@/types/input';
import { TransferInfoType } from '@/types/wishesType';
import { getDate } from '@/utils/common/getDate';

export const WishesPageModalStateInit = {
  wishesTitleInputModalState: false,
  shareLinkModalState: false,
};

export type WishesPageModalStateType = typeof WishesPageModalStateInit;

export const WishesPageContainerStateInit = {
  cakeMessageModalState: false,
};

export type WishesPageContainerStateType = typeof WishesPageContainerStateInit;

export const wishesLinkInputInit: WishesLinkDataType = {
  imageUrl: '',
  title: '',
  hint: '',
  startDate: new Date(),
  endDate: getDate(new Date(), 7),
  wantsGift: true,
};

export const wishesAccountInputInit: TransferInfoType = {
  accountInfo: {
    account: '',
    name: '',
    bank: '',
  },
  forPayCode: false,
  kakaoPayCode: '',
};

export const presentDataInputInit: PresentDataType = {
  name: '',
  message: '',
  cakeId: 0,
  giftMenuId: 0,
};
