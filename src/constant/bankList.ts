// import { StaticImageData } from 'next/image';
// import { BankListType } from '@/types/bankListType';
// import bankImgs from '../../public/assets/images';

// // ✅ 1. 은행 정보 통합 정의
// const BANK_DATA: {
//   name: string;
//   code: string;
//   logoKey: keyof typeof bankImgs;
// }[] = [
//   { name: 'NH농협', code: '0011', logoKey: 'bank1Img' },
//   { name: '카카오뱅크', code: '0090', logoKey: 'bank2Img' },
//   { name: 'KB국민', code: '0004', logoKey: 'bank3Img' },
//   { name: '신한', code: '0088', logoKey: 'bank4Img' },
//   { name: '우리', code: '0020', logoKey: 'bank5Img' },
//   { name: '토스뱅크', code: '0092', logoKey: 'bank6Img' },
//   { name: 'IBK기업', code: '0003', logoKey: 'bank7Img' },
//   { name: '하나', code: '0081', logoKey: 'bank8Img' },
//   { name: '새마을', code: '0045', logoKey: 'bank9Img' },
//   { name: '부산', code: '0032', logoKey: 'bank10Img' },
//   { name: '대구', code: '0031', logoKey: 'bank11Img' },
//   { name: '케이뱅크', code: '0089', logoKey: 'bank12Img' },
//   { name: '신협', code: '0048', logoKey: 'bank13Img' },
//   { name: '우체국', code: '0071', logoKey: 'bank14Img' },
//   { name: 'SC제일', code: '0023', logoKey: 'bank15Img' },
//   { name: '경남', code: '0039', logoKey: 'bank16Img' },
//   { name: '광주', code: '0034', logoKey: 'bank17Img' },
//   { name: '수협', code: '0007', logoKey: 'bank18Img' },
//   { name: '전북', code: '0037', logoKey: 'bank19Img' },
//   { name: '저축은행', code: '0050', logoKey: 'bank20Img' },
//   { name: '제주', code: '0035', logoKey: 'bank21Img' },
//   { name: '씨티', code: '0027', logoKey: 'bank22Img' },
//   { name: 'KDB산업', code: '0002', logoKey: 'bank23Img' },
//   { name: '산림조합', code: '0064', logoKey: 'bank24Img' },
//   { name: 'SBI저축은행', code: '0050', logoKey: 'bank25Img' },
//   { name: 'BOA', code: '0060', logoKey: 'bank26Img' },
//   { name: '중국', code: '0062', logoKey: 'bank27Img' },
//   { name: 'HSBC', code: '0054', logoKey: 'bank28Img' },
//   { name: '중국공상', code: '0067', logoKey: 'bank29Img' },
//   { name: '도이치', code: '0055', logoKey: 'bank30Img' },
//   { name: 'JP모간', code: '0057', logoKey: 'bank31Img' },
//   { name: 'BNP파리바', code: '0061', logoKey: 'bank32Img' },
//   { name: '중국건설', code: '0067', logoKey: 'bank32Img' }, // ❗중복 처리 확인 필요
// ];

// // ✅ 2. BANK_LIST 생성
// export const BANK_LIST: BankListType[] = BANK_DATA.map((bank, idx) => ({
//   name: bank.name,
//   bankNumber: idx + 1,
//   bankCode: bank.code,
//   logo: bankImgs[bank.logoKey],
// }));

// // ✅ 3. 결제 수단 ID
// export const paymentId = {
//   toss: 5,
//   kakaobank: 1,
//   kakaopay: 100,
// } as const;

// export type PaymentIdType = (typeof paymentId)[keyof typeof paymentId];

// export type PaymentDataType = {
//   name: string;
//   bankIconImg: StaticImageData;
// };

// // ✅ 4. 결제 수단 정보 맵
// const paymentListMap = new Map<PaymentIdType, PaymentDataType>([
//   [
//     paymentId.toss,
//     {
//       name: '토스뱅크',
//       bankIconImg: BANK_LIST[paymentId.toss].logo,
//     },
//   ],
//   [
//     paymentId.kakaobank,
//     {
//       name: '카카오뱅크',
//       bankIconImg: BANK_LIST[paymentId.kakaobank].logo,
//     },
//   ],
// ]);

// // ✅ 5. 배열/객체 변환
// export const paymentListArray = Array.from(paymentListMap.entries()).map(([id, value]) => ({
//   id,
//   ...value,
// }));

// export const paymentListObject = Object.fromEntries(paymentListMap);

import { BankListType } from '@/types/bankListType';
import { StaticImageData } from 'next/image';
import bankImgs from '../../public/assets/images';

export const BANK_LIST: BankListType[] = [];

// type BankNameListType =
//   | 'NH농협'
//   | '카카오뱅크'
//   | 'KB국민'
//   | '신한'
//   | '우리'
//   | '토스뱅크'
//   | 'IBK기업'
//   | '하나'
//   | '새마을'
//   | '부산'
//   | '대구'
//   | '케이뱅크'
//   | '신협'
//   | '우체국'
//   | 'SC제일'
//   | '경남'
//   | '광주'
//   | '수협'
//   | '전북'
//   | '저축은행'
//   | '제주'
//   | '씨티'
//   | 'KDB산업'
//   | '산림조합'
//   | 'SBI저축은행'
//   | 'BOA'
//   | '중국'
//   | 'HSBC'
//   | '중국공상'
//   | '도이치'
//   | 'JP모건'
//   | 'BNP파리바'
//   | '중국건설';

// type BankInfoType = {
//   name: keyof BankNameListType;
//   bankNumber: number;
//   logo: StaticImageData;
// };

// const bank_List: Record<BankNameListType, BankInfoType> = {
//   NH농협: {
//     name: 'NH농협',
//     bankNumber: "0011",
//     logo:
//   },
// };

export const BANK_NAMES = [
  'NH농협',
  '카카오뱅크',
  'KB국민',
  '신한',
  '우리',
  '토스뱅크',
  'IBK기업',
  '하나',
  '새마을',
  '부산',
  '대구',
  '케이뱅크',
  '신협',
  '우체국',
  'SC제일',
  '경남',
  '광주',
  '수협',
  '전북',
  '저축은행',
  '제주',
  '씨티',
  'KDB산업',
  '산림조합',
  'SBI저축은행',
  'BOA',
  '중국',
  'HSBC',
  '중국공상',
  '도이치',
  'JP모간',
  'BNP파리바',
  '중국건설',
];

for (let i = 0; i < BANK_NAMES.length; i += 1) {
  BANK_LIST.push({
    name: BANK_NAMES[i],
    bankNumber: i + 1,
    logo: bankImgs[`bank${i + 1}Img`],
    bankCode: '',
  });
}

// BANK_LIST[0].bankCode = '0011'; //농협
// BANK_LIST[1].bankCode = '0090'; //카카오뱅크
// BANK_LIST[2].bankCode = '0004'; //국민
// BANK_LIST[3].bankCode = '0088'; //신한
// BANK_LIST[4].bankCode = '0020'; //우리
// BANK_LIST[5].bankCode = '0092'; //토스뱅크
// BANK_LIST[6].bankCode = '0003'; //IBK기업
// BANK_LIST[7].bankCode = '0081'; //하나
// BANK_LIST[8].bankCode = '0045'; //새마을
// BANK_LIST[9].bankCode = '0032'; //부산
// BANK_LIST[10].bankCode = '0031'; //대구
// BANK_LIST[11].bankCode = '0089'; //케이뱅크
// BANK_LIST[12].bankCode = '0048'; //신협
// BANK_LIST[13].bankCode = '0071'; //우체국
// BANK_LIST[14].bankCode = '0023'; //sc제일
// BANK_LIST[15].bankCode = '0039'; //경남
// BANK_LIST[16].bankCode = '0034'; //광주
// BANK_LIST[17].bankCode = '0007'; //수협
// BANK_LIST[18].bankCode = '0037'; //전북
// BANK_LIST[19].bankCode = '0050'; //저축은행
// BANK_LIST[20].bankCode = '0035'; //제주
// BANK_LIST[21].bankCode = '0027'; //씨티
// BANK_LIST[22].bankCode = '0002'; //KDB산업
// BANK_LIST[23].bankCode = '0064'; //산림조합
// BANK_LIST[24].bankCode = '0050'; //SBI저축은행
// BANK_LIST[25].bankCode = '0060'; //BOA
// BANK_LIST[26].bankCode = '0062'; //중국
// BANK_LIST[27].bankCode = '0054'; //HSBC
// BANK_LIST[28].bankCode = '0067'; //중국공상
// BANK_LIST[29].bankCode = '0055'; //도이치
// BANK_LIST[30].bankCode = '0057'; //JP모간
// BANK_LIST[31].bankCode = '0061'; //BNP파리바
// BANK_LIST[31].bankCode = '0067'; //중국건설

export const paymentId = {
  toss: 5,
  kakaobank: 1,
  kakaopay: 100,
};

export type PaymentIdType = (typeof paymentId)[keyof typeof paymentId];

export type PaymentDataType = {
  name: string;
  bankIconImg: StaticImageData;
};

const paymentListMap: Map<PaymentIdType, PaymentDataType> = new Map();

paymentListMap.set(paymentId.toss, {
  name: '토스뱅크',
  bankIconImg: BANK_LIST[paymentId.toss].logo,
});

paymentListMap.set(paymentId.kakaobank, {
  name: '카카오뱅크',
  bankIconImg: BANK_LIST[paymentId.kakaobank].logo,
});

// paymentListMap.set(paymentId.kakaopay, {
//   name: '카카오페이',
//   bankIconImg: KakaopayLogoIc,
// });

export const paymentListArray = Array.from(paymentListMap.entries()).map(([id, value]) => ({
  id,
  ...value,
}));

export const paymentListObject = Object.fromEntries(paymentListMap);
