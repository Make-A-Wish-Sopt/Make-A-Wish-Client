'use client';

import CheckBox from '@/components/UI/CheckBox';
import { KakaoCodeGuideImg } from '@public/assets/images';
import Image from 'next/image';
import InputText from '@/components/Elements/Input/inputText';
import { DefaultResponseType } from '@/types/api/response';
import { memo, useEffect, useState } from 'react';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { FetchStatusType, useFetch } from '@/hooks/useFetch';
import CheckedIcon, { WarningCheckedIcon } from '@/components/Elements/Icon/CheckedIcon';
import { AccountFormSchemaType } from '@/Schema/wishes.schema';
import { LoadingCake } from '@/components/UI/Loading';

export function AccountAgreementCheckbox({ onCheck }: { onCheck: (state: boolean) => void }) {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12 font-galmuri text-white text-[14px] rounded-xl">
      <p>※ 잘못된 송금코드 링크 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ</p>
      <div className="flex justify-end w-full h-20">
        <div className="flex justify-end">
          <CheckBox changeCheckedState={onCheck}>
            <span className="font-galmuri text-[14px] text-main_blue ml-8">동의함</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
}

export const KakaopayCodeGuideImage = memo(() => {
  const onLinkKakaoApp = () => {
    window.location.href = 'kakaotalk://';
  };

  return (
    <button type="button" onClick={onLinkKakaoApp} aria-label="카카오톡 앱 실행">
      <Image
        src={KakaoCodeGuideImg}
        alt="카카오코드 가져오기 안내 이미지"
        style={{ cursor: 'pointer' }}
      />
    </button>
  );
});

async function validateKakaoCodeURL(codeData: string) {
  const response = await fetch('/api/kakao/paycode', {
    method: 'POST',
    body: JSON.stringify({ kakaoPayCode: codeData }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = (await response.json()) as DefaultResponseType;
  return result;
}

function getStatusIcon(
  status: FetchStatusType,
  isValid: boolean,
  hasError?: unknown,
): JSX.Element | null {
  if (status === 'idle') return null;

  if (status === 'success' && isValid) {
    return <CheckedIcon width={24} />;
  }

  if (!isValid || hasError) {
    return <WarningCheckedIcon width={24} />;
  }

  return null;
}

export function KakaopayCodeInput({
  isKakaoPayCodeValid,
  changeValidState,
}: {
  isKakaoPayCodeValid: boolean;
  changeValidState: (state: boolean) => void;
}) {
  const { register, getValues, control } = useFormContext<AccountFormSchemaType>();
  const kakaoPayCode = useWatch({ control, name: 'kakaoPayCode' });
  const { errors } = useFormState({ control });
  const { data: fetchData, status, delayFetchData, LoadingModal } = useFetch(validateKakaoCodeURL);
  const [validCode, setValidCode] = useState<string | null>(null);

  useEffect(() => {
    if (validCode === kakaoPayCode) {
      changeValidState(true);
      return;
    }
    changeValidState(false);
  }, [kakaoPayCode, validCode, changeValidState]);

  useEffect(() => {
    if (!fetchData) return;

    if (fetchData.success) {
      changeValidState(true);
      setValidCode(kakaoPayCode);
    } else {
      changeValidState(false);
    }
  }, [fetchData, kakaoPayCode, changeValidState]);

  const handleCheckKakaoPayCode = async () => {
    const kakaoPayCodeData = getValues('kakaoPayCode');

    if (!kakaoPayCodeData) return;
    if (errors.kakaoPayCode) return;
    if (kakaoPayCode === validCode) return;

    delayFetchData(800, kakaoPayCodeData);
  };

  return (
    <>
      <InputText
        register={register('kakaoPayCode')}
        placeholder="송금링크를 붙여 넣어주세요"
        onBlur={handleCheckKakaoPayCode}
        autoFocus
      >
        {getStatusIcon(status, isKakaoPayCodeValid, errors.kakaoPayCode)}
      </InputText>

      {errors.kakaoPayCode && (
        <p className="text-[14px] text-warning_red">{errors.kakaoPayCode.message}</p>
      )}

      <LoadingModal render={<LoadingCake text="검사 중" />} />
    </>
  );
}
