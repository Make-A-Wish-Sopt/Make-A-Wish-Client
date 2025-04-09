import * as yup from 'yup';

export const presentFormSchema = yup
  .object()
  .shape({
    name: yup.string().required('name is required'),
    message: yup.string().required('message is required'),
    cakeId: yup.number().required('avatarCakeId is required'),
    giftMenuId: yup.number().required('presentId is required'),
  })
  .noUnknown(true, 'Unknown field is not allowed')
  .required();

export type PresentFormSchemaType = yup.InferType<typeof presentFormSchema>;
