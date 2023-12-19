export interface WishesDataInputType extends BankInfoInputsType {
  linkURL: string;
  imageURL: string;
  price: string | number;
  initial: string;
  title: string;
  hint: string;
  startDate: Date;
  endDate: Date;
}

export interface BankInfoInputsType extends AccountInfoType {
  phone: string;
  mobileCode: string;
}

export interface AccountInfoType {
  name: string;
  bankName: string;
  account: string;
}
