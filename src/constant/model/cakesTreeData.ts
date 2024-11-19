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
  AdminCakeImg,
} from '../../../public/assets/images';
import { StaticImageData } from 'next/image';

export const cakeId = {
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
  adminCakeId: 13,
};

export type CakeIdType = (typeof cakeId)[keyof typeof cakeId];

const cakeMessage: Record<CakeIdType, string> = {
  [cakeId.ddongCakeId]: `똥맛카레 VS 카레맛똥`,
  [cakeId.coffeeCakeId]: `아메리카노 좋아 좋아 좋아\n아메리카노 진해 진해 진해`,
  [cakeId.vitaminCakeId]: `하지만 힘을 내 이만큼 왔잖아
  이것쯤은 정말 별거 아냐 세상을 뒤집자 ha!
  도무지 알 수 없는 것뿐인
  복잡한 이 지구가 재밌는 그 이유는 하나
Yes it's you`,
  [cakeId.chickenCakeId]: `I like 치킨 (치킨시켜)
Everybody likes 치킨 (치킨시켜)
Let's eat 치킨 (치킨시켜)
양념 치킨 후라이드 치킨 치킨 치킨`,
  [cakeId.sushiCakeId]: `흐르는 강물을 거꾸로 거슬러
오르는 연어들의♫•*¨*•.¸¸♪
도무지 알 수 없는 그들만의 신비한 이유처럼
그 언제서부터인가 걸어 걸어 걸어오는 이 길앞으로 얼마나 더 많이 가야만 하는지`,
  [cakeId.flowerCakeId]: ``,
  [cakeId.beefCakeId]: `맛있는 고기
  특별한 고기
  행복한 고기를 주세요 (많이많이)`,
  [cakeId.perfumeCakeId]: `Perfume ooh ooh yeah
ay 너의 하룰
향기롭게 꾸며 줄게
걸음 끝에
내 이름이 떠오르게
  `,
  [cakeId.lpCakeId]: `디제이 갓 어스 폴링 인 럽 어게인...
♫•*¨*•.¸¸♪♫•*¨*•.¸
♫•*¨*•.¸¸♪♫•*¨*•.¸
  `,
  [cakeId.snowCakeId]: `하얀 눈이 내려올 때면
  온 세상이 물들을 때면
  눈꽃이 피어나 또 빛이 나
  눈이 부신 너처럼
  Yeah girl you should know that
  `,
  [cakeId.santaCakeId]: `Merry Christmas!
  :*:･｡,☆ﾟ’･:*:･｡,
  ☆.｡･:*:･ﾟ\`☆､｡･:*:･ﾟ\`★.｡･:*:･ﾟ\`☆.｡･:☆♪`,
  [cakeId.rudolphCakeId]: `"루돌프 코가 밝으니 썰매를 끌어주렴"그 후론 사슴들이 그를 매우 사랑했네루돌프 사슴코는 길이길이 기억되리
  `,
  [cakeId.adminCakeId]: `안녕하세요, 조물주보다 생일선물주 운영자 일동입니다. 저희는 즐겁고 유쾌한 생일 문화를 만들어 가고자 이 서비스를 만들게 되었습니다! 저희 서비스를 사용해주셔서 감사합니다. 생일을 축하드려요!`,
};

export type CakeTreeDataType = {
  cakeId?: number;
  name: string;
  cakeImg: StaticImageData;
  presentId: number;
};

export type DummyCakeTreeDataType = {
  isAdminMessage: boolean;
  message: string;
  giftMenuId: string;
} & CakeTreeDataType;

const defaultCakeTreeDataMap: Map<CakeIdType, DummyCakeTreeDataType> = new Map();
defaultCakeTreeDataMap.set(cakeId.adminCakeId, {
  name: '선물주운영자',
  cakeImg: AdminCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.adminCakeId],
  giftMenuId: '정성 담은 편지',
});
defaultCakeTreeDataMap.set(cakeId.snowCakeId, {
  name: '스노우맨',
  cakeImg: SnowCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.snowCakeId],
  giftMenuId: '귀여운눈사람',
});
defaultCakeTreeDataMap.set(cakeId.rudolphCakeId, {
  name: '루돌프사슴코',
  cakeImg: RudolphCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.rudolphCakeId],
  giftMenuId: '밝은 코',
});
defaultCakeTreeDataMap.set(cakeId.santaCakeId, {
  name: '산타클로스',
  cakeImg: SantaCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.santaCakeId],
  giftMenuId: '소원을 들어줄 산타',
});
defaultCakeTreeDataMap.set(cakeId.vitaminCakeId, {
  name: '비타사백',
  cakeImg: VitaminCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.vitaminCakeId],
  giftMenuId: '비타400',
});
defaultCakeTreeDataMap.set(cakeId.chickenCakeId, {
  name: '윙치킨',
  cakeImg: ChickenCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.chickenCakeId],
  giftMenuId: '치킨부스러기',
});
defaultCakeTreeDataMap.set(cakeId.lpCakeId, {
  name: '디제이오사무',
  cakeImg: LpCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.lpCakeId],
  giftMenuId: '멜론 TOP 100',
});
defaultCakeTreeDataMap.set(cakeId.sushiCakeId, {
  name: '알싸한연어초밥',
  cakeImg: SushiCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.sushiCakeId],
  giftMenuId: '알싸함',
});

defaultCakeTreeDataMap.set(cakeId.perfumeCakeId, {
  name: '사넬향수',
  cakeImg: PerfumeCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.perfumeCakeId],
  giftMenuId: 'No.5',
});
defaultCakeTreeDataMap.set(cakeId.coffeeCakeId, {
  name: '아메리카노',
  cakeImg: CoffeeCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.coffeeCakeId],
  giftMenuId: '카페인',
});
defaultCakeTreeDataMap.set(cakeId.ddongCakeId, {
  name: '똥맛카레',
  cakeImg: DdongCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.ddongCakeId],
  giftMenuId: '똥맛카레',
});
defaultCakeTreeDataMap.set(cakeId.beefCakeId, {
  name: '투쁠한우',
  cakeImg: BeefCakeImg,
  presentId: 0,
  isAdminMessage: true,
  message: cakeMessage[cakeId.beefCakeId],
  giftMenuId: '소곡이',
});

export const defaultCakeTreeDataArray = Array.from(defaultCakeTreeDataMap.entries()).map(
  ([cakeId, value]) => ({
    cakeId,
    ...value,
  }),
);

export const defaultCakeTreeDataObject = Object.fromEntries(defaultCakeTreeDataMap);
