import { PresentDataType, WishesLinkDataType } from '@/types/input';
import { AccountInfoType } from '@/types/wishesType';
import { getDate } from '@/utils/common/getDate';

export const wishesLinkInputInit: WishesLinkDataType = {
  imageUrl: '',
  title: '',
  hint: '',
  startDate: new Date(),
  endDate: getDate(new Date(), 7),
  wantsGift: false,
};

export const wishesAccountInputInit: AccountInfoType = {
  name: '',
  account: '',
  bank: '',
  forPayCode: false,
  kakaoPayCode: '',
};

export const presentDataInputInit: PresentDataType = {
  name: '',
  message: '',
  cakeId: 0,
  giftMenuId: 0,
};
