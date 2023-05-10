import { StaticImageData } from 'next/image';

export interface CakeListType {
  name: string;
  price: number;
  cakeImage: StaticImageData;
  detailImage: StaticImageData;
}
