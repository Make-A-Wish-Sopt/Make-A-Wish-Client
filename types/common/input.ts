export interface InputsType extends AccountInfoType {
  phone: string;
  mobileCode: string;
}

export interface AccountInfoType {
  name: string;
  bankName: string;
  account: string;
}

export interface WishesDataType {
  imageURL: string;
  price: number;
  title: string;
  hint: string;
  initial: string;
  startDate: Date;
  endDate: Date;
  phone: string;
}
