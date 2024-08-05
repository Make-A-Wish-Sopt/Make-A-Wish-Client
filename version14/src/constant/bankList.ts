import bankImgs from '@/public/assets/images';
import { BankListType } from '@/types/bankListType';
import { StaticImageData } from 'next/image';

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

for (let i = 0; i <= 32; i++) {
  BANK_LIST.push({
    name: [
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
    ][i],
    bankNumber: i + 1,
    logo: bankImgs[`bank${i + 1}Img`],
    bankCode: '',
  });
}

//리팩토링 대상 1호 ㅋㅋㅋ

BANK_LIST[0].bankCode = '0011'; //농협
BANK_LIST[1].bankCode = '0090'; //카카오뱅크
BANK_LIST[2].bankCode = '0004'; //국민
BANK_LIST[3].bankCode = '0088'; //신한
BANK_LIST[4].bankCode = '0020'; //우리
BANK_LIST[5].bankCode = '0092'; //토스뱅크
BANK_LIST[6].bankCode = '0003'; //IBK기업
BANK_LIST[7].bankCode = '0081'; //하나
BANK_LIST[8].bankCode = '0045'; //새마을
BANK_LIST[9].bankCode = '0032'; //부산
BANK_LIST[10].bankCode = '0031'; //대구
BANK_LIST[11].bankCode = '0089'; //케이뱅크
BANK_LIST[12].bankCode = '0048'; //신협
BANK_LIST[13].bankCode = '0071'; //우체국
BANK_LIST[14].bankCode = '0023'; //sc제일
BANK_LIST[15].bankCode = '0039'; //경남
BANK_LIST[16].bankCode = '0034'; //광주
BANK_LIST[17].bankCode = '0007'; //수협
BANK_LIST[18].bankCode = '0037'; //전북
BANK_LIST[19].bankCode = '0050'; //저축은행
BANK_LIST[20].bankCode = '0035'; //제주
BANK_LIST[21].bankCode = '0027'; //씨티
BANK_LIST[22].bankCode = '0002'; //KDB산업
BANK_LIST[23].bankCode = '0064'; //산림조합
BANK_LIST[24].bankCode = '0050'; //SBI저축은행
BANK_LIST[25].bankCode = '0060'; //BOA
BANK_LIST[26].bankCode = '0062'; //중국
BANK_LIST[27].bankCode = '0054'; //HSBC
BANK_LIST[28].bankCode = '0067'; //중국공상
BANK_LIST[29].bankCode = '0055'; //도이치
BANK_LIST[30].bankCode = '0057'; //JP모간
BANK_LIST[31].bankCode = '0061'; //BNP파리바
BANK_LIST[31].bankCode = '0067'; //중국건설
