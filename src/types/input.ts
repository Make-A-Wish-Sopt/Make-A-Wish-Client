export interface PresentDatType {
  name: string;
  message: string;
  messageOnly: boolean;
}

export interface WishesLinkDataType {
  imageUrl: string;
  title: string;
  hint: string;
  startDate: Date;
  endDate: Date;
  wantsGift: boolean;
}

export interface WishesAccountDataType extends AccountDataType {
  phone: string;
}

export interface AccountDataType {
  name: string;
  bank: string;
  account: string;
}
