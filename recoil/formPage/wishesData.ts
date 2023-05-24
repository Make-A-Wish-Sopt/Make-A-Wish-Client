import { WishesDataType } from '@/types/wishesData';
import { atom } from 'recoil';

export const WishesData = atom<WishesDataType>({
  key: 'WishesData',
  default: {
    imageUrl: '',
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
