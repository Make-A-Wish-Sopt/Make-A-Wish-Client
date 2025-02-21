import { create } from 'zustand';

type AccountInputState = {
  verifyBtnState: boolean;
  disclamierState: boolean;
  isInitialApiCall: boolean;
  isAccountValid: boolean;
  isLoading: boolean;
};

type AccountInputAction = {
  changeVerifyBtnState: (state: boolean) => void;
  changeDisclamierState: (state: boolean) => void;
  changeIsInitialApiCall: (state: boolean) => void;
  changeIsAccountValid: (state: boolean) => void;
  changeIsLoading: (state: boolean) => void;
};

export const useAccountStore = create<AccountInputState & AccountInputAction>((set) => ({
  verifyBtnState: false,
  disclamierState: false,
  isInitialApiCall: true,
  isAccountValid: false,
  isLoading: false,

  changeVerifyBtnState: (state: boolean) => set(() => ({ verifyBtnState: state })),
  changeDisclamierState: (state: boolean) => set(() => ({ disclamierState: state })),
  changeIsInitialApiCall: (state: boolean) => set(() => ({ isInitialApiCall: state })),
  changeIsAccountValid: (state: boolean) => set(() => ({ isAccountValid: state })),
  changeIsLoading: (state: boolean) => set(() => ({ isLoading: state })),
}));

type KakaoPayCodeInputState = {
  isLoading: boolean;
  disclamierState: boolean;
  isInitialApiCall: boolean;
  isKakaopayCodeValid: boolean;
};

type KakaoPayCodeInputAction = {
  changeIsLoading: (state: boolean) => void;
  changeDisclamierState: (state: boolean) => void;
  changeIsInitialApiCall: (state: boolean) => void;
  changeIsKakaopayCodeValid: (state: boolean) => void;
};

export const useKakaopayCodeStore = create<KakaoPayCodeInputState & KakaoPayCodeInputAction>(
  (set) => ({
    isLoading: false,
    disclamierState: false,
    isInitialApiCall: true,
    isKakaopayCodeValid: false,

    changeIsLoading: (state: boolean) => set(() => ({ isLoading: state })),
    changeDisclamierState: (state: boolean) => set(() => ({ disclamierState: state })),
    changeIsInitialApiCall: (state: boolean) => set(() => ({ isInitialApiCall: state })),
    changeIsKakaopayCodeValid: (state: boolean) => set(() => ({ isKakaopayCodeValid: state })),
  }),
);
