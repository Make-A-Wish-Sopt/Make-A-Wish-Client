import { AccountInfoType } from '../common/input/wishesInput';
import { MainProgressDataType, WishesProgressDataType } from '../wishesType';

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
  phone: string | number;
}>;
