import InputText from '@/components/Common/Input/inputText';
import { AccountFormNotice } from './wishesAccountInputForm';
import Image from 'next/image';
import { AlertSuccessIc, CheckIc, HelpIc } from '../../../../public/assets/icons';
import BorderBox from '@/components/UI/BorderBox';
import { FormProvider, useForm } from 'react-hook-form';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
} from '@/validation/wishes.validate';
import { wishesAccountInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';
import { PropsWithChildren, useEffect } from 'react';
import { DefaultResponseType } from '@/types/api/response';
import { getUserAccount } from '@/api/user';
import useToggle from '@/hooks/common/useToggle';
import { PayCodeGuideModal } from './component';
import CloseIcon from '@/components/Common/Icon/CloseIcon';
import CheckedIcon from '@/components/Common/Icon/CheckedIcon';
import ValidateLoadingModal from '@/components/Common/Modal/ValidateLoadingModal';

export default function WishesKakaopayInputForm({
  isKakaoPayCodeValid,
  changeNoticeAgreeState,
  changeIsKakaoPayCodeValid,
  children,
}: {
  isKakaoPayCodeValid: boolean;
  changeNoticeAgreeState: (state: boolean) => void;
  changeIsKakaoPayCodeValid: (state: boolean) => void;
} & PropsWithChildren) {
  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: true,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });
  const { register, watch, reset } = wishesAccountInputMethods;
  const { kakaoPayCode } = watch();

  const { state: loadingState, changeState: changeLoadingState } = useToggle();

  const {
    state: payCodeGuideModalState,
    changeState: changePayCodeGuideModalState,
    handleState: handlePayCodeGuideModalState,
  } = useToggle();

  useEffect(() => {
    getUserAccount().then((response) => {
      reset({
        ...response.transferInfo,
      });
    });
  }, []);

  useEffect(() => {
    handleValidateKakaopayCode();
  }, [kakaoPayCode]);

  async function checkKakaopayCode(kakaoPayCode: string) {
    changeLoadingState(true);

    const response = await fetch('/api/kakao/paycode', {
      method: 'POST',
      body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: DefaultResponseType = await response.json();

    // changeIsKakaoPayCodeValid(data.success);

    setTimeout(() => {
      changeIsKakaoPayCodeValid(data.success);
    }, 1500);

    setTimeout(() => {
      changeLoadingState(false);
    }, 2000);
  }

  async function handleValidateKakaopayCode() {
    if (!kakaoPayCode) return;

    if (kakaoPayCode.startsWith('https://qr.kakaopay.com/')) {
      checkKakaopayCode(kakaoPayCode);
    } else {
      changeIsKakaoPayCodeValid(false);
    }
  }

  return (
    <FormProvider {...wishesAccountInputMethods}>
      <div className="flex flex-col gap-12 mb-24">
        <div className="flex items-center gap-8 mb-12 ">
          <h3 className="font-bitbit text-white text-[20px] leading-tight whitespace-pre-line">
            송금코드 링크 붙여넣기
          </h3>
          <Image
            onClick={() => {
              changePayCodeGuideModalState(true);
            }}
            src={HelpIc}
            alt="도움말 아이콘"
          />
        </div>
        <InputText
          register={register('kakaoPayCode')}
          placeholder="송금링크를 붙여 넣어주세요"
          keyPrevent
          onBlur={handleValidateKakaopayCode}
        >
          {isKakaoPayCodeValid ? (
            <CheckedIcon width={24} />
          ) : (
            <div
              onClick={() => {
                kakaoPayCode && wishesAccountInputMethods.setValue('kakaoPayCode', '');
              }}
            >
              <CloseIcon color={kakaoPayCode ? 'main_blue' : 'gray2'} />
            </div>
          )}
        </InputText>

        <BorderBox>
          <p className="text-[12px]">
            {'카카오톡 이동 -> 하단 더보기 탭 선택 -> 상단 코드스캔 선택 -> 송금코드 링크 복사'}
          </p>
        </BorderBox>
      </div>

      <AccountFormNotice changeNoticeAgreeState={changeNoticeAgreeState} />
      {children}
      {payCodeGuideModalState && (
        <PayCodeGuideModal
          modalState={payCodeGuideModalState}
          handleModalState={handlePayCodeGuideModalState}
        />
      )}
      {loadingState && (
        <>
          <ValidateLoadingModal isOpen={loadingState} success={isKakaoPayCodeValid} />
        </>
      )}
    </FormProvider>
  );
}
