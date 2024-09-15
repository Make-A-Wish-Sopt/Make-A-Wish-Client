import { CakeItemType, CakeSelectItemType } from '@/types/carousel';
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
} from '../../public/assets/images';

export const cakeDataList: Array<CakeItemType> = [
  { id: 1, itemName: '횡성한우님', price: 4900, image: BeefCakeImg },
  { id: 2, itemName: '치킨조아님', price: 9900, image: ChickenCakeImg },
  { id: 3, itemName: '꽃다발님', price: 17900, image: FlowerCakeImg },
  { id: 4, itemName: 'LP테이블님', price: 20900, image: LpCakeImg },
  { id: 5, itemName: '좋말론님', price: 25900, image: PerfumeCakeImg },
  { id: 6, itemName: '루돌프님', price: 32900, image: RudolphCakeImg },
  { id: 7, itemName: '산타케이크님', price: 32900, image: SantaCakeImg },
  { id: 8, itemName: '흰눈사이로님', price: 32900, image: SnowCakeImg },
  { id: 9, itemName: '미스터초밥왕님', price: 32900, image: SushiCakeImg },
  { id: 10, itemName: '비타400님', price: 32900, image: VitaminCakeImg },
];

export const cakeSelectList: Array<CakeSelectItemType> = [
  { id: 1, image: BeefCakeSelectImg },
  { id: 2, image: ChickenCakeSelectImg },
  { id: 3, image: FlowerCakeSelectImg },
  { id: 4, image: LpCakeSelectImg },
  { id: 5, image: PerfumeCakeSelectImg },
  { id: 6, image: RudolphCakeSelectImg },
  { id: 7, image: SantaCakeSelectImg },
  { id: 8, image: SnowCakeSelectImg },
  { id: 9, image: SushiCakeSelectImg },
  { id: 10, image: VitaminCakeSelectImg },
];
