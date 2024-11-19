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
  name: string;
  itemName: string;
  price: number;
  image: StaticImageData | null;
}

const presetListDataMap: Map<number, PresentItemType> = new Map();

// presetListDataMap.set(0, {
//   name: 'none',
//   itemName: '정성담은편지',
//   price: 0,
//   image: null,
// });

presetListDataMap.set(1, {
  name: 'coffee',
  itemName: '커피였던',
  price: 4900,
  image: PresentItem1Img,
});
presetListDataMap.set(2, {
  name: 'vitamin',
  itemName: '비타민이었던',
  price: 9900,
  image: PresentItem2Img,
});
presetListDataMap.set(3, {
  name: 'chicken',
  itemName: '핸드크림이었던',
  price: 17900,
  image: PresentItem3Img,
});
presetListDataMap.set(4, {
  name: 'handcream',
  itemName: '치킨이었던',
  price: 20900,
  image: PresentItem4Img,
});
presetListDataMap.set(5, {
  name: 'sushi',
  itemName: '초밥이었던',
  price: 25900,
  image: PresentItem5Img,
});
presetListDataMap.set(6, {
  name: 'cake',
  itemName: '케이크였던',
  price: 32900,
  image: PresentItem6Img,
});

export const presentListArray = Array.from(presetListDataMap.entries()).map(([id, value]) => ({
  id,
  ...value,
}));

export const presentListObject = Object.fromEntries(presetListDataMap);
