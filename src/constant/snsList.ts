import { SNSListType } from '@/types/snsListType';
import {
  ShareFacebookLogoImg,
  ShareInstaLogoImg,
  ShareKaKaoLogoImg,
  ShareTwitterLogoImg,
} from '../../public/assets/images';

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
