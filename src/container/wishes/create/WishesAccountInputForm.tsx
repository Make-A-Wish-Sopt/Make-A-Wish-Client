'use client';

import { FormProvider, useForm, UseFormReturn, useWatch } from 'react-hook-form';
import InputForm from '@/components/UI/InputForm';
import { useEffect, useState } from 'react';
import Button from '@/components/Common/Button';
import { AccountInfoType } from '@/types/wishesType';
import InputText from '@/components/Common/Input/inputText';
import CheckBox from '@/components/UI/CheckBox';
import BankModal from '@/components/Common/Modal/BankModal';
import useToggle from '@/hooks/common/useToggle';
import Modal from '@/components/Common/Modal';
import { colors } from '@/styles/styles';
import { WishesAccountDataType, WishesLinkDataType } from '@/types/input';
import { useRouter } from 'next/navigation';
import { postVerifyAccount } from '@/api/user';

export default function WishesAccountInput({
  accountData,
  phone,
  methods,
}: {
  accountData?: AccountInfoType;
  phone?: string;
  methods: UseFormReturn<WishesAccountDataType, any, undefined>;
}) {
  const { toggleState: checkBoxState, handleToggle: handleChangeCheckBoxState } = useToggle();
  const [btnDisalbed, setBtnDisabled] = useState(true);

  const { toggleState: modalState, handleToggle } = useToggle();

  const router = useRouter();

  const control = methods.control;
  const [accountWatch, nameWatch, bankWatch] = useWatch({
    control,
    name: ['account', 'name', 'bank'],
  });

  useEffect(() => {
    // if (isAbused) {
    //   setBtnDisabled(true);
    //   return;
    // }

    if (
      accountWatch === accountData?.account &&
      nameWatch === accountData?.name &&
      bankWatch === accountData?.bank
    ) {
      setBtnDisabled(true);
      return;
    }

    if (
      methods.formState.errors.account ||
      methods.formState.errors.bank ||
      methods.formState.errors.name
    ) {
      setBtnDisabled(true);
      return;
    }

    // if (isSuccess) {
    //   setBtnDisabled(true);
    // } else {
    //   setBtnDisabled(false);
    // }

    if (methods.formState.isDirty) {
      setBtnDisabled(false);
    }
  }, [methods.formState]);

  useEffect(() => {
    if (accountData) {
      methods.setValue('account', accountData.account, { shouldValidate: true });
      methods.setValue('bank', accountData.bank, { shouldValidate: true });
      methods.setValue('name', accountData.name, { shouldValidate: true });
    }

    if (phone) {
      methods.setValue('phone', phone, { shouldValidate: true });
    }
  }, [accountData, phone]);

  useEffect(() => {
    if (accountData) {
      if (methods.formState.isValid && checkBoxState) {
        // changeNextBtnDisabledState(false);
      } else {
        // changeNextBtnDisabledState(true);
      }
    } else {
      // if (methods.formState.isValid && isSuccess && !isAbused && checkBoxState) {
      if (methods.formState.isValid && checkBoxState) {
        // changeNextBtnDisabledState(false);
      } else {
        // changeNextBtnDisabledState(true);
      }
    }

    if (methods.formState.isValid && checkBoxState) {
      // changeNextBtnDisabledState(false);
    } else {
      // changeNextBtnDisabledState(true);
    }
  }, [methods.formState.isValid, checkBoxState]);

  const handleClick = () => {
    if (btnDisalbed) return;

    const accountInfo: AccountInfoType = {
      account: accountWatch,
      bank: bankWatch,
      name: nameWatch,
    };
    postVerifyAccount(accountInfo);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <InputForm title="계좌번호 입력하기">
          <div className="flex flex-col gap-12">
            <InputText
              value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
              boxStyles={{ backgroundColor: '#3C0F0F' }}
              styles={{ color: colors.warning_red }}
              readOnly
            />
            <InputText placeholder="예금주명" register={methods.register('name')} />

            <InputText
              placeholder="은행선택"
              register={methods.register('bank')}
              onClick={handleToggle}
              readOnly
            />

            <div className="flex justify-between gap-6">
              <div className="flex-grow-3">
                <InputText
                  placeholder="계좌번호를 입력해주세요"
                  register={methods.register('account')}
                />
              </div>
              <div className="flex-grow-1">
                <div className="w-115 h-50 font-galmuri">
                  <Button
                    bgColor="main_blue"
                    fontColor="white"
                    font="galmuri"
                    onClick={handleClick}
                    disabled={btnDisalbed}
                    styles={{ fontSize: '14px' }}
                  >
                    계좌번호 확인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </InputForm>

        <InputForm title="휴대폰번호 입력하기">
          <div className="flex flex-col gap-24">
            <InputText register={methods.register('phone')} />

            <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl ">
              {
                '※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'
              }
              <div className="flex justify-end w-full h-20">
                <CheckBox<Pick<WishesAccountDataType, 'noticeAgree'>>
                  checkBoxText={'동의함'}
                  registerName={'noticeAgree'}
                />
              </div>
            </div>
          </div>
        </InputForm>

        <div className="flex justify-between gap-10">
          <Button
            bgColor="main_blue"
            fontColor="white"
            onClick={() => {
              router.back();
            }}
          >
            이전
          </Button>

          <Button
            type="submit"
            bgColor="main_blue"
            fontColor="white"
            onClick={() => {}}
            // disabled={nextBtnDisabled}
          >
            다음
          </Button>
        </div>

        {modalState && (
          <Modal isOpen={modalState} handleToggle={handleToggle}>
            <BankModal methods={methods} handleToggle={handleToggle} />
          </Modal>
        )}
      </form>
    </FormProvider>
  );
}
