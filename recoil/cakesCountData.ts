import { CakesCountType } from '@/types/letters/cakesCountType';
import { atom } from 'recoil';

export const CakesCountData = atom<CakesCountType[]>({
  key: 'CakesCount',
  default:
    [
      {
        cakeId: 0,
        count: 0,
      }
    ],
});
