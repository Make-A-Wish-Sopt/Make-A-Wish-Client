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
import CheckedIcon, { WarningCheckedIcon } from '@/components/Common/Icon/CheckedIcon';
import ValidateLoadingModal from '@/components/Common/Modal/ValidateLoadingModal';
import { KakaoCodeGuideImg } from '../../../../public/assets/images';

export default function WishesKakaopayInputForm({
  isKakaoPayCodeValid,
  noticeAgree,
  submitBtnActiveState,
  isLoading,
  children,
}: {
  isKakaoPayCodeValid: ToggleHookType;
  noticeAgree: ToggleHookType;
  isLoading: ToggleHookType;
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
  const { isDirty, errors } = formState;
  const { kakaoPayCode } = watch();
  const isInitialApiCall = useToggle(true);
  const kakaoPayValidator = wishesAccountDataResolver.pick(['kakaoPayCode']);


  //데이터베이스에서 가져온 정보들이 유효한지 체크 후 초기화
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserAccount();
        if (response.transferInfo) {
          // 📌 Yup 유효성 검사 실행
          await kakaoPayValidator.validate({ kakaoPayCode: response.transferInfo.kakaoPayCode });
          await handleCheckKakaoPayCode(response.transferInfo.kakaoPayCode);

          // ✅ 유효성 검사를 통과하면 reset 실행
          reset({ ...response.transferInfo });
        }
      } catch (error) {
        console.error('초기 데이터 유효성 검사 실패:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      noticeAgree.state &&
      kakaoPayCode &&
      successIconCondition() !== undefined &&
      !isLoading.state
    ) {
      submitBtnActiveState.changeState(true);
    } else {
      submitBtnActiveState.changeState(false);
    }
  }, [noticeAgree, kakaoPayCode, isKakaoPayCodeValid.state, isLoading]);

  async function handleCheckKakaoPayCode(kakaoPayCode: string) {
    if (!errors.kakaoPayCode) {
      await validateKakaoCodeURL(kakaoPayCode);
    }
  }

  async function validateKakaoCodeURL(kakaoPayCode: string) {
    try {
      const response = await fetch('/api/kakao/paycode', {
        method: 'POST',
        body: JSON.stringify({ kakaoPayCode: kakaoPayCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = (await response.json()) as DefaultResponseType;

      setTimeout(() => {
        isKakaoPayCodeValid.changeState(data.success);
      }, 1500);

      isLoading.changeState(true);
    } catch (error) {
      isKakaoPayCodeValid.changeState(false);
      return;
    } finally {
      reset({ ...watch(), kakaoPayCode: kakaoPayCode });
      setTimeout(() => {
        isLoading.changeState(false);
      }, 2000);
      isInitialApiCall.changeState(false);
    }
  }

  function warningIconCondition() {
    if (!kakaoPayCode) return;
    if (isInitialApiCall.state) return;
    if (!isInitialApiCall.state && !errors.kakaoPayCode && isDirty) return;
    if (errors.kakaoPayCode) {
      return <WarningCheckedIcon width={24} />;
    }

    if (isKakaoPayCodeValid.state) {
      return;
    } else {
      return <WarningCheckedIcon width={24} />;
    }
  }

  function successIconCondition() {
    if (!kakaoPayCode) return;
    if (errors.kakaoPayCode) return;
    if (!isKakaoPayCodeValid.state) return;
    if (isDirty) return;

    return <CheckedIcon width={24} />;
  }

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
          onBlur={() => {
            handleCheckKakaoPayCode(kakaoPayCode);
          }}
          keyPrevent
        >
          {!isLoading.state && successIconCondition()}
          {!isLoading.state && warningIconCondition()}
        </InputText>
      </div>

      <AccountFormNotice changeNoticeAgreeState={noticeAgree.changeState} />
      {children}

      <ValidateLoadingModal isOpen={isLoading.state} success={isKakaoPayCodeValid.state} />
    </FormProvider>
  );
}
