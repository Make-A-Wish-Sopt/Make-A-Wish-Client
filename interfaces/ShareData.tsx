import { KaKaoLogoImg, InstaLogoImg, FacebookLogoImg, TwitterLogoImg } from '@/public/assets/images';
import { StaticImageData } from 'next/image';

interface ShareListType {
    name: string;
    logo: StaticImageData;
}

export const SHARE_LIST: ShareListType[] = [
    {
        name: 'KaKaoTalk',
        logo: KaKaoLogoImg,
    },
    // {
    //     name: 'Instagram',
    //     link: '',
    //     logo: InstaLogoImg,
    // },
    // {
    //     name: 'FaceBook',
    //     link: '',
    //     logo: FacebookLogoImg,
    // },
    // {
    //     name: 'Twitter',
    //     link: '',
    //     logo: TwitterLogoImg,
    // },
];