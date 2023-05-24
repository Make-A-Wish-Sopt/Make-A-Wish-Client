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
    startDate: '2023-05-24',
    endDate: '2023-05-30',
    name: '',
    bankName: '',
    account: '',
    phone: '',
  },
});
