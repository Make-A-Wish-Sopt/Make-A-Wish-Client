export interface BankInfoInputsType extends AccountInfoType {
  phone: string;
  mobileCode: string;
}

export interface AccountInfoType {
  name: string;
  bankName: string;
  account: string;
}

export interface WishesDataInputType extends Step1InputType {
  title: string;
  hint: string;
  startDate: Date;
  endDate: Date;
  phone: string;
}

export interface Step1InputType extends LoadGiftInputType {
  initial: string;
}

export interface LoadGiftInputType {
  linkURL: string;
  imageURL: string;
  price: number;
}
