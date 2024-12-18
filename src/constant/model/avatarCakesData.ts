import { StaticImageData } from 'next/image';
import {
  AdminCakeImg,
  BeefCakeAvatarImg,
  ChickenCakeAvatarImg,
  CoffeeCakeAvatarImg,
  DdongCakeAvatarImg,
  LpCakeAvatarImg,
  PerfumeCakeAvatarImg,
  RudolphCakeAvatarImg,
  SantaCakeAvatarImg,
  SnowCakeAvatarImg,
  SushiCakeAvatarImg,
  VitaminCakeAvatarImg,
} from '../../../public/assets/images';
import { cakeId, CakeIdType } from './cakesTreeData';

export type AvatarCakesDataType = {
  name: string;
  cakeImg: StaticImageData;
};

const defaultAvatarCakesDataMap: Map<CakeIdType, AvatarCakesDataType> =
  new Map();
defaultAvatarCakesDataMap.set(cakeId.vitaminCakeId, {
  name: '비타사백',
  cakeImg: VitaminCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.rudolphCakeId, {
  name: '루돌프사슴코님',
  cakeImg: RudolphCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.sushiCakeId, {
  name: '알싸한연어초밥님',
  cakeImg: SushiCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.chickenCakeId, {
  name: '윙치킨',
  cakeImg: ChickenCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.santaCakeId, {
  name: '산타클로스님',
  cakeImg: SantaCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.beefCakeId, {
  name: '투쁠한우님',
  cakeImg: BeefCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.lpCakeId, {
  name: '디제이오시무',
  cakeImg: LpCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.snowCakeId, {
  name: '스노우맨님',
  cakeImg: SnowCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.perfumeCakeId, {
  name: '사넬향수님',
  cakeImg: PerfumeCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.coffeeCakeId, {
  name: '아메리카노님',
  cakeImg: CoffeeCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeId.ddongCakeId, {
  name: '똥맛카레님',
  cakeImg: DdongCakeAvatarImg,
});

export const defaultAvatarCakesDataArray = Array.from(
  defaultAvatarCakesDataMap.entries()
).map(([id, value]) => ({
  id,
  ...value,
}));
