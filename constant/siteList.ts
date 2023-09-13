import { NaverShoppingLogoImg, TwentynineLogoImg } from '@/public/assets/images';
import { SiteDataType } from '@/types/siteDataType';

export const SITE_LIST = {
  TWENTY_NINE: <SiteDataType>{
    NAME: 'twentynine',
    LINK: 'https://www.29cm.co.kr/',
    LOGO: TwentynineLogoImg,
    IMAGE_TAG: 'ewptmlp5',
    PRICE_TAG: 'ent7twr4',
  },
  // NAVER_SHOP: <SiteDataType>{
  //   NAME: 'naverShopping',
  //   LINK: 'https://shopping.naver.com/',
  //   LOGO: NaverShoppingLogoImg,
  //   IMAGE_TAG: 'image_thumb__IB9B3', // 맞는지 잘 모름...
  //   PRICE_TAG: 'lowestPrice_num__A5gM9', // 맞는지 잘 모름...
  // },
};
