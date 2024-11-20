import { AccountDataType, PresentDataType, WishesLinkDataType } from '@/types/input';
import { getDate } from '@/utils/common/getDate';

export const wishesLinkInputInit: WishesLinkDataType = {
  imageUrl: '',
  title: '',
  hint: '',
  startDate: new Date(),
  endDate: getDate(new Date(), 7),
  wantsGift: false,
};

export const wishesAccountInputInit: AccountDataType = {
  name: '',
  account: '',
  bank: '',
};

export const presentDataInputInit: PresentDataType = {
  name: '',
  message: '',
  cakeId: 0,
  giftMenuId: 0,
};
