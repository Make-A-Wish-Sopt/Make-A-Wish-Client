'use client';

import InputText from '@/components/Common/Input/inputText';
import { WishesAccountDataResolverType } from '@/validation/wishes.validate';
import { useFormContext, useWatch } from 'react-hook-form';
import Image from 'next/image';
import { KakaoCodeGuideImg } from '@assets/images';
import { validateKakaoCodeURL } from './validateKakaopayCode';
import CheckedIcon, { WarningCheckedIcon } from '@/components/Common/Icon/CheckedIcon';
import { useKakaopayCodeStore } from '@/stores/account';

export default function KakaoPayCodeInput() {
  const { register, formState, control } = useFormContext<WishesAccountDataResolverType>();
  const { isDirty, errors } = formState;
  const kakaopayCode = useWatch({
    control,
    name: 'kakaoPayCode',
  });

  const { isInitialApiCall, isKakaopayCodeValid, isLoading } = useKakaopayCodeStore();

  async function handleCheckKakaoPayCode(kakaoPayCode: string) {
    if (!errors.kakaoPayCode) {
      await validateKakaoCodeURL(kakaoPayCode);
    }
  }

  function successIconCondition() {
    if (!kakaopayCode) return;
    if (errors.kakaoPayCode) return;
    if (!isKakaopayCodeValid) return;
    if (isDirty) return;

    return <CheckedIcon width={24} />;
  }

  function warningIconCondition() {
    if (!kakaopayCode) return;
    if (isInitialApiCall) return;
    if (!isInitialApiCall && !errors.kakaoPayCode && isDirty) return;
    if (errors.kakaoPayCode) {
      return <WarningCheckedIcon width={24} />;
    }

    if (isKakaopayCodeValid) {
      return;
    } else {
      return <WarningCheckedIcon width={24} />;
    }
  }

  return (
    <>
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
            handleCheckKakaoPayCode(kakaopayCode);
          }}
          keyPrevent
        >
          {!isLoading && successIconCondition()}
          {!isLoading && warningIconCondition()}
        </InputText>
      </div>
    </>
  );
}
