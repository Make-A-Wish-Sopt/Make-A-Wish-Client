import { LoginUserInfoType } from '@/types/auth/loginUserInfo';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'UserInfo',
  storage: localStorage,
});

export const LoginUserInfo = atom<LoginUserInfoType>({
  key: 'LoginUserInfo',
  default: {
    nickName: '',
    accessToken: '',
    refreshToken: '',
    wishesId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
