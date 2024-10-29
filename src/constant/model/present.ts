import { StaticImageData } from 'next/image';
import {
  PresentItem1Img,
  PresentItem2Img,
  PresentItem3Img,
  PresentItem4Img,
  PresentItem5Img,
  PresentItem6Img,
} from '../../../public/assets/images';

export interface PresentItemType {
  id: number;
  itemName: string;
  price: number;
  image: StaticImageData;
}

export const presentList: Array<PresentItemType> = [
  { id: 0, itemName: '커피였던', price: 4900, image: PresentItem1Img },
  { id: 1, itemName: '비타민이었던', price: 9900, image: PresentItem2Img },
  { id: 2, itemName: '핸드크림이었던', price: 17900, image: PresentItem3Img },
  { id: 3, itemName: '치킨이었던', price: 20900, image: PresentItem4Img },
  { id: 4, itemName: '초밥이었던', price: 25900, image: PresentItem5Img },
  { id: 5, itemName: '케이크였던', price: 32900, image: PresentItem6Img },
];
