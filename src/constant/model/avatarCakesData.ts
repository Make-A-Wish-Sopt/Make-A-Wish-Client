import { StaticImageData } from 'next/image';
import {
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
import { cakeIdList, CakeIdType } from './cakesTreeData';

export type AvatarCakesDataType = {
  name: string;
  cakeImg: StaticImageData;
};

const defaultAvatarCakesDataMap: Map<CakeIdType, AvatarCakesDataType> = new Map();
defaultAvatarCakesDataMap.set(cakeIdList.vitaminCakeId, {
  name: '비타사백',
  cakeImg: VitaminCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.rudolphCakeId, {
  name: '루띌프사슴코님',
  cakeImg: RudolphCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.sushiCakeId, {
  name: '알싸한연어초밥님',
  cakeImg: SushiCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.chickenCakeId, {
  name: '윙치킨',
  cakeImg: ChickenCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.santaCakeId, {
  name: '산타흴로스님',
  cakeImg: SantaCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.beefCakeId, {
  name: '투읠한우님',
  cakeImg: BeefCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.lpCakeId, {
  name: '디제이오시무',
  cakeImg: LpCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.snowCakeId, {
  name: '스노우맨님',
  cakeImg: SnowCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.perfumeCakeId, {
  name: '사넬향수님',
  cakeImg: PerfumeCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.coffeeCakeId, {
  name: '아메리카노님',
  cakeImg: CoffeeCakeAvatarImg,
});
defaultAvatarCakesDataMap.set(cakeIdList.ddongCakeId, {
  name: '똥맛카레님',
  cakeImg: DdongCakeAvatarImg,
});

export const defaultAvatarCakesDataArray = Array.from(defaultAvatarCakesDataMap.entries()).map(
  ([id, value]) => ({
    id,
    ...value,
  }),
);
