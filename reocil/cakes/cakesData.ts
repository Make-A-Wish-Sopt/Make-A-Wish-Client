import { CAKE_LIST } from '@/constant/cakeList';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const CakesData = atom<CakesDataType>({
  key: 'CakesData',
  default: {
    pgToken: '',
    tid: '',
    partnerOrderId: '',
    partnerUserId: '',
    giverName: '',
    wishesName: '',
    cake: 0,
    message: '',
    wishId: 0,
    selectedCake: CAKE_LIST[0],
  },
  effects_UNSTABLE: [persistAtom],
});
