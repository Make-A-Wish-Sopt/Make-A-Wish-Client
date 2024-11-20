import { CakeListType } from './cakeListType';

export interface CakesDataType {
  pgToken: string | string[] | undefined;
  tid: string;
  partnerOrderId: string;
  partnerUserId: string;
  giverName: string;
  wishesName: string;
  message: string;
  wishId: number;
  selectedCake: CakeListType;
}
