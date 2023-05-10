import { TwentynineLogoImg, CoupangLogoImg } from '@/public/assets/images';
import { StaticImageData } from 'next/image';

interface SiteListType {
    name: string;
    link: string;
    logo: StaticImageData;
}

export const SITE_LIST: SiteListType[] = [
    {
        name: '쿠팡',
        link: 'https://www.coupang.com/',
        logo: CoupangLogoImg,
    },
    {
        name: '29cm',
        link: 'https://www.29cm.co.kr/',
        logo: TwentynineLogoImg,
    },
];