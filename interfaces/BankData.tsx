import bankImgs from '@/public/assets/images';
import { StaticImageData } from 'next/image';

interface BankListType {
    name: string;
    bankNumber: number;
    logo: StaticImageData;
}

export const BANK_LIST: BankListType[] = [];

for (let i = 0; i <= 32; i++) {
    BANK_LIST.push({
        name:
            ['NH농협', '카카오뱅크', 'KB국민', '신한', '우리', '토스뱅크', 'IBK기업', '하나', '새마을',
                '부산', '대구', '케이뱅크', '신협', '우체국', 'SC제일', "경남", "광주", "수협", "전북",
                "저축은행", "제주", "씨티", "KDB산업", "산림조합", "SBI저축은행", "BOA", "중국", "HSBC",
                "중국공상", "도이치", "JP모건", "BNP파리바", "중국건설"][i],
        bankNumber: i + 1,
        logo: bankImgs[`bank${i + 1}Img`],
    });
}