import {
  BeefCakeImg,
  ChickenCakeImg,
  CoffeeCakeImg,
  PoopCakeImg,
  SushiCakeImg,
  FlowerCakeImg,
  PerfumeCakeImg,
  VitaminCakeImg,
  BeefCakeDetailImg,
  ChickenCakeDetailImg,
  CoffeeCakeDetailImg,
  PoopCakeDetailImg,
  SushiCakeDetailImg,
  FlowerCakeDetailImg,
  PerfumeCakeDetailImg,
  VitaminCakeDetailImg,
} from '@/public/assets/images';
import { CakeListType } from '@/types/cakeListType';

export const CAKE_LIST: CakeListType[] = [
  {
    name: '달콤커피 케이크',
    price: 4900,
    cakeImage: CoffeeCakeImg,
    detailImage: CoffeeCakeDetailImg,
  },
  {
    name: '상큼 비타민 케이크',
    price: 9900,
    cakeImage: VitaminCakeImg,
    detailImage: VitaminCakeDetailImg,
  },
  {
    name: '바사삭 치킨 케이크',
    price: 17900,
    cakeImage: ChickenCakeImg,
    detailImage: ChickenCakeDetailImg,
  },
  {
    name: '장인 초밥 케이크',
    price: 25900,
    cakeImage: SushiCakeImg,
    detailImage: SushiCakeDetailImg,
  },
  {
    name: '샤랄라 꽃 케이크',
    price: 38900,
    cakeImage: FlowerCakeImg,
    detailImage: FlowerCakeDetailImg,
  },
  {
    name: '몸보신 한우 케이크',
    price: 46900,
    cakeImage: BeefCakeImg,
    detailImage: BeefCakeDetailImg,
  },
  {
    name: '킁킁 향수 케이크',
    price: 55900,
    cakeImage: PerfumeCakeImg,
    detailImage: PerfumeCakeDetailImg,
  },
  {
    name: '구리구리 똥 케이크',
    price: 0,
    cakeImage: PoopCakeImg,
    detailImage: PoopCakeDetailImg,
  },
];
