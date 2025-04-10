// import { putUserAccount } from '@/api/user';
// import { postWishes } from '@/api/wishes';
// import {
//   AccountFormSchemaType,
//   WishesFormScehmaType,
//   WishesFormSchema,
// } from '@/Schema/wishes.schema';
// import { toast } from 'sonner';

// const 계좌등록요청 = async (accountData: AccountFormSchemaType) => {
//   if (!accountData) return;

//   const response = await putUserAccount({ ...accountData });

//   if (!response?.data.success) {
//     toast.error('계좌 등록에 실패했습니다. 다시 시도해주세요.');
//     return false;
//   }

//   return true;
// };

// const 생일잔치정보등록 = async (wishFormData: WishesFormScehmaType) => {
//   if (!wishFormData) return;

//   try {
//     await WishesFormSchema.validate(wishFormData, { abortEarly: false });
//   } catch (error) {
//     return false;
//   }

//   const response = await postWishes({ ...wishFormData });

//   if (!response?.data.success) {
//     toast.error('생일잔치 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
//     return false;
//   }

//   return true;
// };

// export const createAccountWithWishData = async (
//   accountData: AccountFormSchemaType,
//   wishFormData: WishesFormScehmaType,
//   onSuccess: () => void,
// ) => {
//   if (!(await 계좌등록요청(accountData))) return;
//   if (!(await 생일잔치정보등록(wishFormData))) return;

//   onSuccess();
// };

// export const updateAccount = async (accountData: AccountFormSchemaType, onSuccess: () => void) => {
//   if (!(await 계좌등록요청(accountData))) return;

//   toast.success('계좌정보 수정완료!');
//   setTimeout(() => {
//     onSuccess();
//   }, 1500);
// };
