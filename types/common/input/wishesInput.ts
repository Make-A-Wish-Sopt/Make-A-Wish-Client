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
