import { AccountInfoType, MainProgressDataType, WishesProgressDataType } from '../wishesType';

export type DefaultResponseType<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
};

export type MainProgressDataResponseType = DefaultResponseType<MainProgressDataType>;

export type WishesProgressDataResponseType = DefaultResponseType<WishesProgressDataType>;

export type UserAccountDataResponseType = DefaultResponseType<{
  accountInfo: AccountInfoType;
  id: number;
  phone: string;
}>;

export type PublicWishesDataResponseType = DefaultResponseType<{
  accountNumber: string;
  bank: string;
  name: string;
  dayCount: number;
  title: string;
  hint: string;
}>;

export type PostPublicCakesResponseType = DefaultResponseType<{
  cakeId: number;
  imageUrl: string;
  hint: string;
  initial: string;
  contribute: string;
  wisher: string;
}>;
