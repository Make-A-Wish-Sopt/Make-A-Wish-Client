export type WishStatusType = 'WHILE' | 'BEFORE' | 'END';

export type MainProgressDataType = {
  wishId: string;
  cakeCount: number;
  dayCount: number;
  price: number;
  percent: number;
  status: WishStatusType;
};

export interface WishesProgressDataType extends WishesDataInputType {
  accountInfo: AccountInfoType;
}

export interface WishesDataInputType extends BankInfoInputsType {
  linkURL: string;
  imageUrl: string;
  price: string | number;
  initial: string;
  title: string;
  hint: string;
  startDate: Date;
  endDate: Date;
}

export interface BankInfoInputsType extends AccountInfoType {
  phone: string;
}

export interface AccountInfoType {
  name: string;
  bank: string;
  account: string;
}
