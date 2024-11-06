// 'use client';

// import { Control, UseFormReturn, useWatch } from 'react-hook-form';
// import InputForm from '@/components/UI/InputForm';
// import Calendar from '@/components/Common/Calendar/Calendar';
// import { useEffect } from 'react';
// import React from 'react';
// import { useUploadItemInfo } from '@/hooks/wishes/useUploadItemInfo';
// import { UploadImageBox } from '@/components/UI/UploadImageBox';
// import Button from '@/components/Common/Button';
// import RadioSelect from '@/components/UI/RadioSelect';
// import DropDwonBox from '@/components/UI/DropDwonBox';
// import useToggle from '@/hooks/common/useToggle';
// import dynamic from 'next/dynamic';
// import { MAX_TEXTAREA_LENGTH } from '@/constant/input';
// import InputTextForm from '@/components/UI/InputTextForm';
// import { useRouter } from 'next/navigation';
// import { WishesLinkResolverType } from '@/validation/wishes.validate';
// import { getDate } from '@/utils/common/getDate';
// import { convertEncode } from '@/utils/common/convert';
// import { postWishes } from '@/api/wishes';

// // Fix List
// // 힌트를 입력하고 이미지를 입력하면 isValid가 안되는 에러

// const DropDownContent = dynamic(() => import('./dropdownContent'));

// export default function WishesLinkInputForm({
//   methods,
// }: {
//   methods: UseFormReturn<WishesLinkResolverType, any, undefined>;
// }) {
//   const control = methods.control;
//   const isValid = methods.formState.isValid;

//   //달력 최적화 해보자~
//   const [startDateWatch, endDateWatch] = useWatch({
//     control,
//     name: ['startDate', 'endDate'],
//   });

//   function handleChangeWantsGiftOption(state: boolean) {
//     methods.setValue('wantsGift', state);
//   }

//   function handleSetImageUrl(imageUrl: string) {
//     methods.setValue('imageUrl', imageUrl);
//   }

//   function handleChangeDate(selectedDate: Date) {
//     methods.setValue('startDate', selectedDate);
//     methods.setValue('endDate', getDate(selectedDate, 7));
//   }

//   return (
//     <>
//       <form onSubmit={methods.handleSubmit(() => {})}>
//         <InputForm title={`링크에 들어온 친구가 보게 될\n 재밌는 이미지를 등록해보세요!`}>
//           <ImageToShowToGiver handleSetImageUrl={handleSetImageUrl} />
//         </InputForm>

//         <InputForm title="친구에게 남기고 싶은 한마디">
//           <InputTextForm<WishesLinkResolverType>
//             inputType="textarea"
//             register={methods.register('hint')}
//             control={control}
//             placeholder="ex.) 생일을 축하합니다~"
//             maxLength={MAX_TEXTAREA_LENGTH}
//           />
//         </InputForm>

//         <InputForm title="내 생일 주간 설정하기">
//           {/* 캘린더 안되는거 수정해야됨 */}
//           <div className="flex justify-between gap-10">
//             <Calendar date={startDateWatch} handleChangeDate={handleChangeDate} />
//             <Calendar date={endDateWatch} readOnly />
//           </div>
//         </InputForm>

//         <InputForm title="생일 선물도 받고 싶어요!">
//           <SelectWantsGiftOption
//             control={control}
//             handleChangeWantsGiftOption={handleChangeWantsGiftOption}
//             isValid={isValid}
//             methods={methods}
//           />
//         </InputForm>
//       </form>
//     </>
//   );
// }

// function SelectWantsGiftOption({
//   control,
//   handleChangeWantsGiftOption,
//   isValid,
//   methods,
// }: {
//   control: Control;
//   handleChangeWantsGiftOption: (staet: boolean) => void;
//   isValid: boolean;
//   methods: UseFormReturn<WishesLinkResolverType, any, undefined>;
// }) {
//   const {
//     state: dropDownState,
//     handleState: handleDropBoxState,
//     changeState: changeDropBoxState,
//   } = useToggle();

//   const selectOption = useWatch({
//     control,
//     name: 'wantsGift',
//   }) as boolean;

//   function handleChangeWantsGiftState(state: boolean) {
//     handleChangeWantsGiftOption(state);
//   }

//   return (
//     <>
//       <ul className="flex flex-col gap-12 font-galmuri text-white">
//         <li
//           className="w-full bg-dark_green rounded-xl"
//           onClick={() => handleChangeWantsGiftState(true)}
//         >
//           <DropDwonBox isOpen={dropDownState} handleState={handleDropBoxState}>
//             <RadioSelect isSelect={selectOption} />
//             <span className="w-full">네! 생일 선물도 받아볼래요</span>
//           </DropDwonBox>
//           {dropDownState && <DropDownContent />}
//         </li>

//         <li
//           className="flex items-center gap-8 w-full h-50 text-[14px] bg-dark_green round-xl px-10 py-14 rounded-xl"
//           onClick={() => {
//             handleChangeWantsGiftState(false);
//             changeDropBoxState(false);
//           }}
//         >
//           <RadioSelect isSelect={!selectOption} />
//           아니요. 편지만 받을래요!
//         </li>
//       </ul>

//       <WishesLinkSubmitButton wantsGiftWatch={selectOption} disabled={!isValid} methods={methods} />
//     </>
//   );
// }

// function WishesLinkSubmitButton({
//   wantsGiftWatch,
//   disabled,
//   methods,
// }: {
//   wantsGiftWatch: boolean;
//   disabled: boolean;
//   methods: UseFormReturn<WishesLinkResolverType, any, undefined>;
// }) {
//   const router = useRouter();

//   function handleNextStep() {
//     if (wantsGiftWatch) {
//       router.push(
//         `/wishes/create?step=account&wishTitle=${convertEncode(
//           process.env.NEXT_PUBLIC_WISHES_CREATE_ACCOUNT_KEY,
//         )}`,
//       );
//     } else {
//       createOnlyLettersWishes();
//     }
//   }

//   function createOnlyLettersWishes() {
//     try {
//       postWishes(methods).then((response) => {
//         if (response.data.success) {
//           router.push('/wishes/share');
//         }
//       });
//     } catch (error) {}
//   }

//   return (
//     <div className="flex justify-between gap-10">
//       {wantsGiftWatch && (
//         <Button
//           type="submit"
//           bgColor="main_blue"
//           fontColor="white"
//           onClick={handleNextStep}
//           disabled
//           styles={{ marginBottom: '5.8rem' }}
//         >
//           이전
//         </Button>
//       )}

//       <Button
//         type="submit"
//         bgColor="main_blue"
//         fontColor="white"
//         onClick={handleNextStep}
//         styles={{ marginBottom: '5.8rem' }}
//         disabled={disabled}
//       >
//         {wantsGiftWatch ? '다음으로' : '소원링크 생성'}
//       </Button>
//     </div>
//   );
// }

// function ImageToShowToGiver({
//   handleSetImageUrl,
// }: {
//   handleSetImageUrl: (imageUrl: string) => void;
// }) {
//   const { imageUrl, uploadImageFile } = useUploadItemInfo();

//   useEffect(() => {
//     if (imageUrl) {
//       handleSetImageUrl(imageUrl);
//     }
//   }, [imageUrl]);

//   return <UploadImageBox imageUrl={imageUrl} handleUploadImageFile={uploadImageFile} />;
// }
