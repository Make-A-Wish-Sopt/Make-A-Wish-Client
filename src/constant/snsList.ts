import {
  ShareFacebookLogoImg,
  ShareInstaLogoImg,
  ShareKaKaoLogoImg,
  ShareTwitterLogoImg,
} from '../../public/assets/images';
import { StaticImageData } from 'next/image';

interface SNSListType {
  name: string;
  logo: StaticImageData;
}

export const SNS_LIST: SNSListType[] = [
  {
    name: 'KakaoTalk',
    logo: ShareKaKaoLogoImg,
  },
  {
    name: 'Instagram',
    logo: ShareInstaLogoImg,
  },
  {
    name: 'FaceBook',
    logo: ShareFacebookLogoImg,
  },
  {
    name: 'Twitter',
    logo: ShareTwitterLogoImg,
  },
];
