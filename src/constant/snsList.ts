import { StaticImageData } from 'next/image';
import {
  ShareFacebookLogoImg,
  ShareInstaLogoImg,
  ShareKaKaoLogoImg,
  ShareTwitterLogoImg,
} from '../../public/assets/images';

interface SNSListType {
  name: string;
  logo: StaticImageData;
}

const SNS_LIST: SNSListType[] = [
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

export default SNS_LIST;
