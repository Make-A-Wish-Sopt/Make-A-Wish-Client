import { CakeItemType, CakeSelectItemType } from '@/types/model';
import {
  BeefCakeImg,
  BeefCakeSelectImg,
  ChickenCakeImg,
  ChickenCakeSelectImg,
  FlowerCakeImg,
  FlowerCakeSelectImg,
  LpCakeImg,
  LpCakeSelectImg,
  PerfumeCakeImg,
  PerfumeCakeSelectImg,
  RudolphCakeImg,
  RudolphCakeSelectImg,
  SantaCakeImg,
  SantaCakeSelectImg,
  SnowCakeImg,
  SnowCakeSelectImg,
  SushiCakeImg,
  SushiCakeSelectImg,
  VitaminCakeImg,
  VitaminCakeSelectImg,
  CoffeeCakeImg,
  DdongCakeImg,
} from '../../public/assets/images';
import { StaticImageData } from 'next/image';

export const defaultCakeListData: Array<CakeItemType> = [
  { cakeId: 7, name: '횡성한우님', price: 4900, image: BeefCakeImg, presentId: 0 },
  { cakeId: 4, name: '치킨조아님', price: 9900, image: ChickenCakeImg, presentId: 0 },
  { cakeId: 6, name: '꽃다발님', price: 17900, image: FlowerCakeImg, presentId: 0 },
  { cakeId: 9, name: 'LP테이블님', price: 20900, image: LpCakeImg, presentId: 0 },
  { cakeId: 8, name: '좋말론님', price: 25900, image: PerfumeCakeImg, presentId: 0 },
  { cakeId: 12, name: '루돌프님', price: 32900, image: RudolphCakeImg, presentId: 0 },
  { cakeId: 11, name: '산타케이크님', price: 32900, image: SantaCakeImg, presentId: 0 },
  { cakeId: 10, name: '흰눈사이로님', price: 32900, image: SnowCakeImg, presentId: 0 },
  { cakeId: 5, name: '미스터초밥왕님', price: 32900, image: SushiCakeImg, presentId: 0 },
  { cakeId: 3, name: '비타400님', price: 32900, image: VitaminCakeImg, presentId: 0 },
  { cakeId: 1, name: '구리구리 똥케이크님', price: 0, image: DdongCakeImg, presentId: 0 },
  { cakeId: 2, name: '달콤커피 케이크님', price: 32900, image: CoffeeCakeImg, presentId: 0 },
];

export const cakeImageWithId = defaultCakeListData.reduce((acc, { cakeId, image }) => {
  acc[cakeId] = image;
  return acc;
}, {} as Record<number, StaticImageData>);

export const cakeSelectList: Array<CakeSelectItemType> = [
  { cakeId: 1, image: BeefCakeSelectImg },
  { cakeId: 2, image: ChickenCakeSelectImg },
  { cakeId: 3, image: FlowerCakeSelectImg },
  { cakeId: 4, image: LpCakeSelectImg },
  { cakeId: 5, image: PerfumeCakeSelectImg },
  { cakeId: 6, image: RudolphCakeSelectImg },
  { cakeId: 7, image: SantaCakeSelectImg },
  { cakeId: 8, image: SnowCakeSelectImg },
  { cakeId: 9, image: SushiCakeSelectImg },
  { cakeId: 10, image: VitaminCakeSelectImg },
];
