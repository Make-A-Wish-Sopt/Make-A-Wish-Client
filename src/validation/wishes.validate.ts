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

export type WishesLinkDataResolverType = yup.InferType<typeof wishesLinkDataResolver>;

export const wishesAccountDataResolver = yup
  .object()
  .shape({
    accountInfo: yup
      .object()
      .shape({
        account: yup
          .string()
          .required('계좌번호를 입력하세요.')
          .matches(/^[0-9]+$/, '숫자만 입력하세요.')
          .min(10, '계좌번호는 최소 10자리여야 합니다.')
          .max(15, '계좌번호는 최대 15자리여야 합니다.'),
        name: yup.string().required('필수 입력 항목입니다.'),
        bank: yup.string().required('필수 입력 항목입니다.'),
      })
      .required('계좌 정보는 필수입니다.'),
    kakaoPayCode: yup
      .string()
      .test('is-valid-kakao-pay-url', '유효한 카카오페이 URL이 아닙니다.', (value) => {
        if (!value) return false;
        return value.startsWith('https://qr.kakaopay.com/');
      }),
    forPayCode: yup.boolean().required('필수 입력 항목입니다.'),
  })
  .noUnknown(true, 'Unknown field is not allowed')
  .required();

export type WishesAccountDataResolverType = yup.InferType<typeof wishesAccountDataResolver>;


// export const wishesAccountDataResolver = yup
//   .object()
//   .shape({
//     account: yup
//       .string()
//       .required('계좌번호를 입력하세요.')
//       .matches(/^[0-9]+$/, '숫자만 입력하세요.')
//       .min(10, '계좌번호는 최소 10자리여야 합니다.')
//       .max(15, '계좌번호는 최대 15자리여야 합니다.'),

//     name: yup.string().required('필수 입력 항목입니다.'),
//     bank: yup.string().required('필수 입력 항목입니다.'),
//     kakaoPayCode: yup
//       .string()
//       .test('is-valid-kakao-pay-url', '유효한 카카오페이 URL이 아닙니다.', (value) => {
//         if (!value) return false;
//         return value.startsWith('https://qr.kakaopay.com/');
//       }),

//     forPayCode: yup.boolean().required('필수 입력 항목입니다.'),
//   })
//   .noUnknown(true, 'Unknown field is not allowed')
//   .required();

// export type WishesAccountDataResolverType = yup.InferType<typeof wishesAccountDataResolver>;

// export const wishesKakapayDataResolver = yup
//   .object()
//   .shape({
//     kakaoPayCode: yup
//       .string()
//       .test('is-valid-kakao-pay-url', '유효한 카카오페이 URL이 아닙니다.', (value) => {
//         if (!value) return false;
//         return value.startsWith('https://qr.kakaopay.com/');
//       }),
//   })
//   .noUnknown(true, 'Unknown field is not allowed')
//   .required();

// export type WishesKakaopayDataResolverType = yup.InferType<typeof wishesAccountDataResolver>;
