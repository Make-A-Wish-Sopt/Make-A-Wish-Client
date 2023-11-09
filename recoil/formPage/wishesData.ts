
import { WishesDataType } from '@/types/common/input';
import { atom } from 'recoil';

export const WishesData = atom<WishesDataType>({
  key: 'WishesData',
  default: {
    imageURL: '',
    price: 0,
    title: '',
    hint: '',
    initial: '',
    startDate: new Date(),
    endDate: new Date(),
    phone: '',
  },
});
