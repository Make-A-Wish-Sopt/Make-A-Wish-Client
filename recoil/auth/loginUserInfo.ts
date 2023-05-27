import { LoginUserInfoType } from '@/types/auth/loginUserInfo';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginUserInfo = atom<LoginUserInfoType>({
  key: 'LoginUserInfo',
  default: {
    nickName: '',
    accessToken: '',
    wishesId:0,
  },
  effects_UNSTABLE: [persistAtom],
});
