import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { atom } from 'recoil';

export const WishesData = atom<WishesDataInputType>({
  key: 'WishesData',
  default: {
    imageUrl: '',
    price: 0,
    title: '',
    hint: '',
    initial: '',
    startDate: new Date(),
    endDate: new Date(),
    phone: '',
  },
});
