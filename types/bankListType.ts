import { StaticImageData } from 'next/image';

export interface BankListType {
  name: string;
  bankNumber: number;
  logo: StaticImageData;
}