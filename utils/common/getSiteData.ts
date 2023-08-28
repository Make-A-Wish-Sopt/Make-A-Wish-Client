import { SITE_LIST } from '@/constant/siteList';

export const getSiteData = (linkURL: string) => {
  if (linkURL.includes('29cm')) {
    return SITE_LIST.TWENTY_NINE;
  } else if (linkURL.includes('shopping.naver')) {
    return SITE_LIST.NAVER_SHOP;
  }
};
