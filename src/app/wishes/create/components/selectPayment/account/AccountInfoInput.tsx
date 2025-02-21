'use client';

import InputText from '@/components/Common/Input/inputText';
import { WishesAccountDataResolverType } from '@/validation/wishes.validate';
import { useFormContext, useWatch } from 'react-hook-form';
import SelectBank from './SelectBank';
import Button from '@/components/Common/Button';
import { useAccountStore } from '@/stores/account';
import { useEffect, useState } from 'react';
import useToggle from '@/hooks/common/useToggle';
import ValidateLoadingModal from '@/components/Common/Modal/ValidateLoadingModal';
import { postVerifyAccount } from '@/api/user';
import { AxiosError } from 'axios';
import { DefaultResponseType } from '@/types/api/response';

export default function AccountInfoInput() {
  const { register } = useFormContext<WishesAccountDataResolverType>();

  return (
    <>
      <div className="flex flex-col gap-12" aria-labelledby="account-info-heading">
        <InputText
          id="account-name"
          placeholder="예금주명"
          register={register('accountInfo.name')}
        />
        <SelectBank />
        <AccountNumberInput />
      </div>
    </>
  );
}

function AccountNumberInput() {
  const { register, reset, formState, control, trigger } =
    useFormContext<WishesAccountDataResolverType>();

  const [accountInfo, forPayCode, kakaoPayCode] = useWatch({
    control,
    name: ['accountInfo', 'forPayCode', 'kakaoPayCode'],
  });

  const {
    verifyBtnState,
    isAccountValid,
    isInitialApiCall,
    changeIsAccountValid,
    changeIsInitialApiCall,
    changeVerifyBtnState,
  } = useAccountStore();

  const { isValid, isDirty, errors } = formState;
  const isLoading = useToggle();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    trigger('accountInfo.account');
  }, [accountInfo.account]);

  useEffect(() => {
    trigger('accountInfo.bank');
  }, [accountInfo.bank]);

  useEffect(() => {
    trigger('accountInfo.name');
  }, [accountInfo.name]);

  useEffect(() => {
    changeVerifyBtnState(false);

    if (!accountInfo.account || errors.accountInfo) return;
    if (!isInitialApiCall && !isDirty) return;

    if (
      (!isInitialApiCall && !errors.accountInfo && isDirty) ||
      (accountInfo.account && !errors.accountInfo)
    ) {
      changeVerifyBtnState(true);
    }
  }, [isValid, isDirty, errors.accountInfo]);

  function handleAccountCheck() {
    if (!verifyBtnState) return;

    isLoading.changeState(true);

    if (accountInfo.account && accountInfo.bank && accountInfo.name) {
      changeIsAccountValid(false);

      postVerifyAccount({
        account: accountInfo.account,
        bank: accountInfo.bank,
        name: accountInfo.name,
      })
        .then((response) => {
          changeIsAccountValid(response.success);
        })
        .catch((error: AxiosError) => {
          const errorData = error.response.data as DefaultResponseType;

          if (errorData.message) {
            setErrorMessage(errorData.message);
          }

          changeIsAccountValid(false);
        })
        .finally(() => {
          setTimeout(() => {
            isLoading.changeState(false);
          }, 1500);
          changeIsInitialApiCall(false);
          changeVerifyBtnState(false);

          reset({
            accountInfo,
            forPayCode,
            kakaoPayCode,
          });
        });
    }
  }

  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex-grow-3 w-full">
          <InputText
            id="account-number"
            placeholder="계좌번호를 입력해주세요"
            register={register('accountInfo.account')}
          />
        </div>

        <div className="flex-grow-1">
          <div className="w-115 h-50 font-galmuri">
            <Button
              onClick={handleAccountCheck}
              disabled={!verifyBtnState}
              fontColor="white"
              font="galmuri"
              style={{ fontSize: '14px' }}
            >
              계좌번호 확인
            </Button>
          </div>
        </div>
        {<ValidateLoadingModal isOpen={isLoading.state} success={isAccountValid} />}
      </div>
      {errorMessage && <p className="font-galmuri text-warning_red text-[12px] ">{errorMessage}</p>}
    </>
  );
}
