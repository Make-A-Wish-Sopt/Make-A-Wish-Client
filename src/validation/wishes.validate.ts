import * as yup from 'yup';

export const wishesLinkDataResolver = yup
  .object()
  .shape({
    imageUrl: yup.string().required('Image URL is required'),
    title: yup.string().required('Title is required'),
    hint: yup.string().required('Hint is required'),
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date().required('End date is required'),
    wantsGift: yup.boolean().required('Wants gift is required'),
  })
  .noUnknown(true, 'Unknown field is not allowed')
  .required();

export type WishesLinkResolverType = yup.InferType<typeof wishesLinkDataResolver>;

export const wishesAccountDataResolver = yup.object().shape({
  account: yup
    .string()
    .matches(/^[0-9]+$/, '숫자만 입력하세요.')
    .min(10, '계좌번호는 최소 10자리여야 합니다.')
    .max(15, '계좌번호는 최대 15자리여야 합니다.')
    .required('계좌번호를 입력하세요.'),

  name: yup.string().required('필수 입력 항목입니다.'),

  bank: yup.string().required('필수 입력 항목입니다.'),

  phone: yup
    .string()
    .matches(/^(01[016789]{1})?[0-9]{3,4}?[0-9]{4}$/, '핸드폰 형식에 맞게 입력해주세요')
    .min(10, '휴대폰 번호는 최소 10자리여야 합니다.')
    .max(11, '휴대폰 번호는 최대 11자리여야 합니다.')
    .required('필수 입력 항목입니다.'),
});

export type WishesAccountDataResolverType = yup.InferType<typeof wishesAccountDataResolver>;
