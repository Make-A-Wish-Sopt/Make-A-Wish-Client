import InputText from '@/components/Common/Input/inputText';
import { AccountFormNotice } from './wishesAccountInputForm';
import Image from 'next/image';
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
import useToggle, { ToggleHookType } from '@/hooks/common/useToggle';
import CloseIcon from '@/components/Common/Icon/CloseIcon';
import CheckedIcon, { WarningCheckedIcon } from '@/components/Common/Icon/CheckedIcon';
import ValidateLoadingModal from '@/components/Common/Modal/ValidateLoadingModal';
import { KakaoCodeGuideImg } from '../../../../public/assets/images';

export default function WishesKakaopayInputForm({
  isKakaoPayCodeValid,
  noticeAgree,
  submitBtnActiveState,
  children,
}: {
  isKakaoPayCodeValid: ToggleHookType;
  noticeAgree: ToggleHookType;
  submitBtnActiveState: ToggleHookType;
} & PropsWithChildren) {
  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: true,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });
  const { register, watch, reset, formState } = wishesAccountInputMethods;
  const { isValid, isDirty } = formState;
  const { kakaoPayCode } = watch();
  const isLoading = useToggle();

  const isFirstInput = useToggle(true);

  useEffect(() => {
    if (
      !!kakaoPayCode &&
      noticeAgree.state &&
      isValid &&
      isKakaoPayCodeValid.state &&
      !isLoading.state
    ) {
      submitBtnActiveState.changeState(true);
    } else {
      submitBtnActiveState.changeState(false);
    }

    if (kakaoPayCode && !isDirty) {
      isKakaoPayCodeValid.changeState(true);
    }
  }, [
    isDirty,
    isValid,
    noticeAgree.state,
    kakaoPayCode,
    isKakaoPayCodeValid.state,
    isLoading.state,
  ]);

  useEffect(() => {
    getUserAccount().then((response) => {
      if (response.transferInfo.kakaoPayCode) {
        isFirstInput.changeState(false);
      }

      reset({
        ...response.transferInfo,
      });
    });
  }, []);

  useEffect(() => {
    if (!kakaoPayCode) return;

    if (isValid) {
      checkKakaopayCode(kakaoPayCode);
    }
  }, [kakaoPayCode, isValid]);

  function checkKakaopayCode(kakaoPayCode: string) {
    if (!kakaoPayCode) {
      isKakaoPayCodeValid.changeState(false);
      return;
    }

    isLoading.changeState(true);

    fetch('/api/kakao/paycode', {
      method: 'POST',
      body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const data = (await response.json()) as DefaultResponseType;
        isFirstInput.changeState(false);
        setTimeout(() => {
          isKakaoPayCodeValid.changeState(data.success);
        }, 1500);
      })
      .catch(() => {
        isKakaoPayCodeValid.changeState(false);
      });

    setTimeout(() => {
      isLoading.changeState(false);
    }, 2000);
  }

  console.log(!!kakaoPayCode);
  console.log(isKakaoPayCodeValid.state);
  console.log('isValid : ', isValid);

  return (
    <FormProvider {...wishesAccountInputMethods}>
      <div className="flex flex-col gap-12 mb-24">
        <Image
          src={KakaoCodeGuideImg}
          alt="카카오코드 가져오기 안내 이미지"
          onClick={() => {
            window.location.href = 'kakaotalk://';
          }}
          style={{ cursor: 'pointer' }}
        />

        <InputText
          register={register('kakaoPayCode')}
          placeholder="송금링크를 붙여 넣어주세요"
          keyPrevent
        >
          {!!kakaoPayCode && isKakaoPayCodeValid.state && <CheckedIcon width={24} />}
          {!isLoading.state &&
            kakaoPayCode &&
            !isKakaoPayCodeValid.state &&
            !isFirstInput.state && <WarningCheckedIcon width={24} />}
          {kakaoPayCode && (
            <div
              onClick={() => {
                kakaoPayCode &&
                  wishesAccountInputMethods.setValue('kakaoPayCode', '', {
                    shouldDirty: true,
                  });
              }}
              className="ml-5"
            >
              <CloseIcon color={kakaoPayCode ? 'main_blue' : 'gray2'} />
            </div>
          )}
        </InputText>
      </div>

      <AccountFormNotice changeNoticeAgreeState={noticeAgree.changeState} />
      {children}

      <ValidateLoadingModal isOpen={isLoading.state} success={isKakaoPayCodeValid.state} />
    </FormProvider>
  );
}
