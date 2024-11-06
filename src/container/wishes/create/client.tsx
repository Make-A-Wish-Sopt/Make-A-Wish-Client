// 'use client';

// import { ReactNode } from 'react';
// import dynamic from 'next/dynamic';
// import { WishesCreateStepType } from '@/app/wishes/create/page';
// import { UserAccountDataType } from '@/types/api/response';
// import { useForm } from 'react-hook-form';
// import { wishesAccountInputInit, wishesLinkInputInit } from '@/constant/init';
// import WishesLinkInputForm from './wishesLinkInputForm';
// import { yupResolver } from '@hookform/resolvers/yup';
// import {
//   wishesAccountDataResolver,
//   WishesAccountDataResolverType,
//   wishesLinkDataResolver,
//   WishesLinkResolverType,
// } from '@/validation/wishes.validate';
// import ErrorPage from '@/app/error';

// const WishesAccountInputForm = dynamic(() => import('./WishesAccountInputForm'));

// export default function WishesCreatePageStateContainer({
//   createStep,
//   wishTitle,
//   userAccountData,
//   children,
// }: {
//   createStep: WishesCreateStepType;
//   wishTitle: string;
//   userAccountData: UserAccountDataType;
//   children: ReactNode;
// }) {
//   const wishesLinkInputMethods = useForm<WishesLinkResolverType>({
//     mode: 'onChange',
//     defaultValues: {
//       ...wishesLinkInputInit,
//       title: wishTitle,
//     },
//     resolver: yupResolver(wishesLinkDataResolver),
//   });

//   const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
//     mode: 'onChange',
//     defaultValues: {
//       ...wishesAccountInputInit,
//     },
//     resolver: yupResolver(wishesAccountDataResolver),
//   });

//   return (
//     <>
//       {children}
//       {
//         {
//           // Step1
//           link: <WishesLinkInputForm methods={wishesLinkInputMethods} />,

//           // Step 2
//           account: (
//             <>
//               {wishTitle === process.env.NEXT_PUBLIC_WISHES_CREATE_ACCOUNT_KEY ? (
//                 <WishesAccountInputForm
//                   accountData={userAccountData?.accountInfo}
//                   phone={userAccountData?.phone}
//                   methods={wishesAccountInputMethods}
//                 />
//               ) : (
//                 <ErrorPage alertMessage={'잘못된 접근입니다.'} pathTo={'/wishes'} />
//               )}
//             </>
//           ),
//         }[createStep]
//       }
//     </>
//   );
// }
