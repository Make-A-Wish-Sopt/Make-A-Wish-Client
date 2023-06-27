import { WishesDataType } from '@/types/wishes/wishesDataType';
import { atom } from 'recoil';

export const WishesData = atom<WishesDataType>({
  key: 'WishesData',
  default: {
    imageURL: '',
    price: 0,
    title: '',
    hint1: '',
    hint2: '',
    startDate: '',
    endDate: '',
    name: '',
    bankName: '',
    account: '',
    phone: '',
  },
});
