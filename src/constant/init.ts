import { PresentFormDataType } from '@/types/input';
import { TransferInfoType } from '@/types/wishesType';
import { getDate } from '@/utils/common/getDate';
import { WishesFormScehmaType } from '@/Schema/wishes.schema';

export const wishesFormInitValues: WishesFormScehmaType = {
  imageUrl: '',
  title: '',
  hint: '',
  startDate: new Date(),
  endDate: getDate(new Date(), 7),
  wantsGift: true,
};

export const accountFormInitValues: TransferInfoType = {
  accountInfo: {
    account: '',
    name: '',
    bank: '',
  },
  forPayCode: false,
  kakaoPayCode: '',
};

export const presentFormInitValues: PresentFormDataType = {
  name: '',
  message: '',
  cakeId: 0,
  giftMenuId: 0,
};
