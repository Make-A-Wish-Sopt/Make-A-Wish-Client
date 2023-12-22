import { IMAGE_FILE_SIZE } from '@/constant/imageFileSize';
import { LIMIT_TEXT } from '@/constant/limitText';

export const REGEX = Object.freeze({
  NAVER_SHOPPING: /^http[s]?:\/\/search.shopping.naver.com/,
  TWENTY_NINE_STORE: /^http[s]?:\/\/product.29cm.co.kr/, //실제 29cm스토어에서 가져오는 주소값
  TWENTY_NINE_SERVER: /^http[s]?:\/\/img.29cm.co.kr/, //서버에서 보내주는 주소값
  PHONE: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
});

export const validation = {
  isCorrectSite(input: string) {
    if (input) {
      return (
        REGEX.NAVER_SHOPPING.test(input) ||
        REGEX.TWENTY_NINE_STORE.test(input) ||
        REGEX.TWENTY_NINE_SERVER.test(input)
      );
    } else {
      return false;
    }
  },
  isCorrectPhoneNumber(input: string | number) {
    if (input) return REGEX.PHONE.test(input.toString());
  },

  isIncludeHyphen(input: string) {
    if (input) return input.includes('-');
  },

  checkImageFileSize(size: number) {
    return size < IMAGE_FILE_SIZE;
  },

  checkAccountLength(input: string) {
    if (input) return input.length < 10 || input.length > 14;
  },
};
