import { WishesAccountDataType, WishesLinkDataType } from '@/types/input';
import { getDate } from '@/utils/common/getDate';

export const wishesLinkInputInit: WishesLinkDataType = {
  imageUrl: '',
  title: '',
  hint: '',
  startDate: new Date(),
  endDate: getDate(new Date(), 7),
  wantsGift: false,
};

export const wishesAccountInputInit: WishesAccountDataType = {
  name: '',
  account: '',
  bank: '',
  phone: '',
};
