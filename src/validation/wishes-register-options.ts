import { WishesAccountDataType, WishesLinkDataType } from '@/types/input';
import { RegisterOptions } from 'react-hook-form';

export const wishesLinkDataValidate: Record<keyof WishesLinkDataType, RegisterOptions> = {
  image: {
    required: '필수 입력 항목입니다.',
  },
  message: {
    required: '필수 입력 항목입니다.',
    maxLength: {
      value: 300,
      message: '최대 300자 까지 입력이 가능합니다.',
    },
  },
  startDate: {},
  endDate: {},
  wishesType: {},
};

export const wishesAccountDataValidate: Record<keyof WishesAccountDataType, RegisterOptions> = {
  account: {
    required: '계좌번호를 입력하세요.',
    pattern: {
      value: /^[0-9]+$/,
      message: '숫자만 입력하세요.',
    },
    minLength: {
      value: 10,
      message: '계좌번호는 최소 10자리여야 합니다.',
    },
    maxLength: {
      value: 15,
      message: '계좌번호는 최대 15자리여야 합니다.',
    },
  },
  name: {
    required: '필수 입력 항목입니다.',
  },
  bank: {
    required: '필수 입력 항목입니다.',
  },
  phone: {
    required: '필수 입력 항목입니다.',
    pattern: {
      value: /^(01[016789]{1})?[0-9]{3,4}?[0-9]{4}$/,
      message: '핸드폰 형식에 맞게 입력해주세요',
    },
    minLength: {
      value: 10,
      message: '휴대폰 번호는 최소 10자리여야 합니다.',
    },
    maxLength: {
      value: 11,
      message: '휴대폰 번호는 최대 11자리여야 합니다.',
    },
  },
};
