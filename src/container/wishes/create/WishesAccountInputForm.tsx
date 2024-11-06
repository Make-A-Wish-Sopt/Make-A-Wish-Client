// 'use client';

// import { UseFormRegisterReturn, UseFormReturn } from 'react-hook-form';
// import InputForm from '@/components/UI/InputForm';
// import { useEffect } from 'react';
// import Button from '@/components/Common/Button';
// import { AccountInfoType } from '@/types/wishesType';
// import InputText from '@/components/Common/Input/inputText';
// import CheckBox from '@/components/UI/CheckBox';
// import BankModal from '@/components/Common/Modal/BankModal';
// import useToggle from '@/hooks/common/useToggle';
// import Modal from '@/components/Common/Modal';
// import { colors } from '@/styles/styles';
// import { useRouter } from 'next/navigation';
// import { WishesAccountDataResolverType } from '@/validation/wishes.validate';
// import DropDwonBox from '@/components/UI/DropDwonBox';

// export default function WishesAccountInputForm({
//   accountData,
//   phone,
//   methods,
// }: {
//   accountData?: AccountInfoType;
//   phone?: string;
//   methods: UseFormReturn<WishesAccountDataResolverType, any, undefined>;
// }) {
//   const { state: accountNoticeAgree, changeState: changeAccountNoticeAgree } = useToggle();

//   const isValid = methods.formState.isValid;

//   useEffect(() => {
//     if (accountData && phone) {
//       methods.reset({
//         ...accountData,
//         phone: phone,
//       });
//     }
//   }, [accountData]);

//   function handleSubmit() {
//     // postVerifyAccount(methods.getValues('account'));
//   }

//   function changeBank(input: string) {
//     methods.setValue('bank', input);
//   }

//   return (
//     <>
//       <form onSubmit={methods.handleSubmit(() => {})}>
//         <InputForm title="계좌번호 입력하기">
//           <div className="flex flex-col gap-12">
//             <InputText
//               value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
//               boxStyles={{ backgroundColor: '#3C0F0F' }}
//               inputStyles={{ color: colors.warning_red }}
//               readOnly
//             />

//             <InputText placeholder="예금주명" register={methods.register('name')} />

//             <SelectBank changeBank={changeBank} register={methods.register('bank')} />

//             <div className="flex justify-between gap-6">
//               <div className="flex-grow-3">
//                 <InputText
//                   placeholder="계좌번호를 입력해주세요"
//                   register={methods.register('account')}
//                 />
//               </div>
//               <div className="flex-grow-1">
//                 <div className="w-115 h-50 font-galmuri">
//                   <Button
//                     bgColor="main_blue"
//                     fontColor="white"
//                     font="galmuri"
//                     onClick={() => {}}
//                     disabled={true}
//                     styles={{ fontSize: '14px' }}
//                   >
//                     계좌번호 확인
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </InputForm>

//         <InputForm title="휴대폰번호 입력하기">
//           <div className="flex flex-col gap-24">
//             <InputText
//               placeholder="(-)없이 숫자만 입력해주세요"
//               register={methods.register('phone')}
//             />

//             <AccountFormNotice changeAccountNoticeAgree={changeAccountNoticeAgree} />
//           </div>
//         </InputForm>

//         <WishesAccountSubmitButton
//           disabled={!(isValid && accountNoticeAgree)}
//           handleSubmit={handleSubmit}
//         />
//       </form>
//     </>
//   );
// }

// function SelectBank({
//   changeBank,
//   register,
// }: {
//   changeBank: (input: string) => void;
//   register: UseFormRegisterReturn<'bank'>;
// }) {
//   const { state: modalState, handleState: handleChangeModalState } = useToggle();

//   return (
//     <>
//       <DropDwonBox isOpen={false} handleState={handleChangeModalState} bgColor="dark_green">
//         <input
//           {...register}
//           placeholder="은행 선택"
//           className="w-full h-full font-galmuri text-[14px]"
//           readOnly
//           onClick={handleChangeModalState}
//         />
//       </DropDwonBox>

//       {modalState && (
//         <Modal isOpen={modalState} handleState={handleChangeModalState}>
//           <BankModal changeBank={changeBank} handleState={handleChangeModalState} />
//         </Modal>
//       )}
//     </>
//   );
// }

// function AccountFormNotice({
//   changeAccountNoticeAgree,
// }: {
//   changeAccountNoticeAgree: (state: boolean) => void;
// }) {
//   const { state: checkedState, changeState: changeCheckedState } = useToggle();

//   useEffect(() => {
//     changeAccountNoticeAgree(checkedState);
//   }, [checkedState]);

//   return (
//     <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl ">
//       {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}
//       <div className="flex justify-end w-full h-20">
//         <CheckBox<WishesAccountDataResolverType> checkBoxText={'동의함'} />
//       </div>
//     </div>
//   );
// }

// //이전 다음 이렇게 된 버튼을 컴포넌트로 만들어도 좋을듯
// function WishesAccountSubmitButton({
//   disabled,
//   handleSubmit,
// }: {
//   disabled: boolean;
//   handleSubmit: () => void;
// }) {
//   const router = useRouter();

//   return (
//     <div className="flex justify-between gap-10">
//       <Button
//         fontColor="white"
//         onClick={() => {
//           router.back();
//         }}
//       >
//         이전
//       </Button>

//       <Button type="submit" fontColor="white" onClick={handleSubmit} disabled={disabled}>
//         다음
//       </Button>
//     </div>
//   );
// }
