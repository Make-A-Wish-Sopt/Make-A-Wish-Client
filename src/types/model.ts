import { StaticImageData } from 'next/image';

export type CakeItemType = {
  cakeId: number;
  name: string;
  presentId: number;
  price: number;
  image: StaticImageData;
};

export type CakeSelectItemType = {
  cakeId: number;
  image: StaticImageData;
};
