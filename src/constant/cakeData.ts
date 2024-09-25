import { CakeItemType, AvatarCakeType } from '@/types/model';
import {
  BeefCakeImg,
  ChickenCakeImg,
  FlowerCakeImg,
  LpCakeImg,
  PerfumeCakeImg,
  RudolphCakeImg,
  SantaCakeImg,
  SnowCakeImg,
  SushiCakeImg,
  VitaminCakeImg,
  CoffeeCakeImg,
  DdongCakeImg,
  BeefCakeAvatarImg,
  ChickenCakeAvatarImg,
  FlowerCakeAvatarImg,
  LpCakeAvatarImg,
  PerfumeCakeAvatarImg,
  RudolphCakeAvatarImg,
  SantaCakeAvatarImg,
  SnowCakeAvatarImg,
  SushiCakeAvatarImg,
  VitaminCakeAvatarImg,
  CoffeeCakeAvatarImg,
  DdongCakeAvatarImg,
} from '../../public/assets/images';
import { StaticImageData } from 'next/image';

const CAKE_ID = {
  ddongCakeId: 1,
  coffeeCakeId: 2,
  vitaminCakeId: 3,
  chickenCakeId: 4,
  sushiCakeId: 5,
  flowerCakeId: 6,
  beefCakeId: 7,
  perfumeCakeId: 8,
  lpCakeId: 9,
  snowCakeId: 10,
  santaCakeId: 11,
  rudolphCakeId: 12,
};

export const defaultCakeListData: Array<CakeItemType> = [
  { cakeId: CAKE_ID.beefCakeId, name: '횡성한우님', price: 4900, image: BeefCakeImg, presentId: 0 },
  {
    cakeId: CAKE_ID.chickenCakeId,
    name: '치킨조아님',
    price: 9900,
    image: ChickenCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.flowerCakeId,
    name: '꽃다발님',
    price: 17900,
    image: FlowerCakeImg,
    presentId: 0,
  },
  { cakeId: CAKE_ID.lpCakeId, name: 'LP테이블님', price: 20900, image: LpCakeImg, presentId: 0 },
  {
    cakeId: CAKE_ID.perfumeCakeId,
    name: '좋말론님',
    price: 25900,
    image: PerfumeCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.rudolphCakeId,
    name: '루돌프님',
    price: 32900,
    image: RudolphCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.santaCakeId,
    name: '산타케이크님',
    price: 32900,
    image: SantaCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.snowCakeId,
    name: '흰눈사이로님',
    price: 32900,
    image: SnowCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.sushiCakeId,
    name: '미스터초밥왕님',
    price: 32900,
    image: SushiCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.vitaminCakeId,
    name: '비타400님',
    price: 32900,
    image: VitaminCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.ddongCakeId,
    name: '구리구리 똥케이크님',
    price: 0,
    image: DdongCakeImg,
    presentId: 0,
  },
  {
    cakeId: CAKE_ID.vitaminCakeId,
    name: '달콤커피 케이크님',
    price: 32900,
    image: CoffeeCakeImg,
    presentId: 0,
  },
];

export const cakeImageWithId = defaultCakeListData.reduce((acc, { cakeId, image }) => {
  acc[cakeId] = image;
  return acc;
}, {} as Record<number, StaticImageData>);

export const avatarCakeList: Array<AvatarCakeType> = [
  { cakeId: CAKE_ID.beefCakeId, image: BeefCakeAvatarImg },
  { cakeId: CAKE_ID.chickenCakeId, image: ChickenCakeAvatarImg },
  { cakeId: CAKE_ID.flowerCakeId, image: FlowerCakeAvatarImg },
  { cakeId: CAKE_ID.lpCakeId, image: LpCakeAvatarImg },
  { cakeId: CAKE_ID.perfumeCakeId, image: PerfumeCakeAvatarImg },
  { cakeId: CAKE_ID.rudolphCakeId, image: RudolphCakeAvatarImg },
  { cakeId: CAKE_ID.santaCakeId, image: SantaCakeAvatarImg },
  { cakeId: CAKE_ID.snowCakeId, image: SnowCakeAvatarImg },
  { cakeId: CAKE_ID.sushiCakeId, image: SushiCakeAvatarImg },
  { cakeId: CAKE_ID.vitaminCakeId, image: VitaminCakeAvatarImg },
  { cakeId: CAKE_ID.coffeeCakeId, image: CoffeeCakeAvatarImg },
  { cakeId: CAKE_ID.ddongCakeId, image: DdongCakeAvatarImg },
];
