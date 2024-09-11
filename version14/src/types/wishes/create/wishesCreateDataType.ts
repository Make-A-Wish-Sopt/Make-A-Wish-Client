export interface WishesLinkDataType {
  image: string;
  message: string;
  startDate: Date;
  endDate: Date;
  wishesType: boolean;
}

export interface WishesAccountDataType extends AccountDataType {
  phone: string;
}

export interface AccountDataType {
  name: string;
  bank: string;
  account: string;
}
