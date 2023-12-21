import { LIMIT_TEXT } from '@/constant/limitText';
import { WishesDataInputType } from '@/types/common/input/wishesInput';

export const RULES: Record<keyof WishesDataInputType, unknown> = {
  linkURL: {
    required: '필수 작성 항목입니다.',
    pattern: {
      value: /^http[s]?:\/\/product.29cm.co.kr/,
      message: '정해진 사이트에서 링크를 가져와주세요!',
    },
    minLength: 0,
  },

  initial: {
    required: '초성을 입력해주세요.',
    minLength: {
      value: 0,
    },
    maxLength: {
      value: LIMIT_TEXT[15],
      message: '15자 까지 입력이 가능합니다!',
    },
  },
  price: {},
  imageUrl: {},
  hint: {},
  startDate: {},
  endDate: {},
  title: {},
  phone: {},
  name: {},
  bank: {},
  account: {},
};

export const rules_initial = {
  required: '필수 작성 항목입니다.',
  pattern: {
    value: /^http[s]?:\/\/product.29cm.co.kr/,
    message: '정해진 사이트에서 링크를 가져와주세요!',
  },
  minLength: 0,
};
