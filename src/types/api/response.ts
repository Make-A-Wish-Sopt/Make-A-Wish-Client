import { CakeItemType } from '@/constant/model/cakes';
import { AccountInfoType, MainProgressDataType, WishStatusType } from '../wishesType';
import { LoginUserDataType } from '@/utils/common/cookies';
import { WishesLinkDataType } from '../input';

export type DefaultResponseType<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
};

export type WishesCreateResponseType = DefaultResponseType<number>; //소원아이디

export type LoginResponseType = DefaultResponseType<LoginUserDataType>;

export type PresingedURLResponseType = DefaultResponseType<{ filename: string; signedUrl: string }>;

export type MainProgressDataResponseType = DefaultResponseType<MainProgressDataType>;

export type WishesProgressDataResponseType = DefaultResponseType<
  WishesLinkDataType & { status: WishStatusType }
>;

export type UserAccountDataType = {
  accountInfo: AccountInfoType;
  id: number;
  phone: string;
};

export type UserAccountDataResponseType = DefaultResponseType<UserAccountDataType>;

export type PublicWishesDataType = {
  accountNumber: string;
  bank: string;
  name: string;
  dayCount: number;
  title: string;
  hint: string;
  wantsGift: boolean;
};

export type PublicWishesDataResponseType = DefaultResponseType<PublicWishesDataType>;

export type PostPublicCakesResponseType = DefaultResponseType<{
  cakeId: number;
  imageUrl: string;
  hint: string;
  initial: string;
  contribute: string;
  wisher: string;
}>;

export type CakePresentMessageDataType = {
  name: string;
  message: string;
  cakeId: number;
  giftMenuId: number;
};

export type CakePresentMessageResponseType = DefaultResponseType<CakePresentMessageDataType>;
export type GetCakesResultResponseType = DefaultResponseType<Array<CakeItemType>>;

export type UpdateTokenResponseType = DefaultResponseType<{
  accessToken: string;
  refreshToken: string;
}>;