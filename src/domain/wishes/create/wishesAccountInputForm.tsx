'use client';

import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  WishesLinkDataResolverType,
} from '@/validation/wishes.validate';
import InputForm from '@/components/UI/InputForm';
import { colors } from '@/styles/styles';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { PropsWithChildren, useEffect } from 'react';
import useToggle from '@/hooks/common/useToggle';
import DropDwonBox from '@/components/UI/DropDwonBox';
import Modal from '@/components/Common/Modal';
import BankModal from '@/components/Common/Modal/BankModal';
import { getUserAccount, postVerifyAccount } from '@/api/user';
import CheckBox from '@/components/UI/CheckBox';
import { wishesAccountInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';

export default function WishesAccountInputForm({
  changeNoticeAgreeState,
  children,
}: {
  changeNoticeAgreeState: (state: boolean) => void;
} & PropsWithChildren) {
  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
      forPayCode: false,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });
  const savedWishesLinkDataMethods = useFormContext<WishesLinkDataResolverType>();

  const { state: accountVerifyBtnState, changeState: changeAccountVerifyBtnState } = useToggle();

  const { register, reset } = wishesAccountInputMethods;

  useEffect(() => {
    getUserAccount().then((response) => {
      response.transferInfo &&
        reset({
          ...response.transferInfo,
        });
    });
  }, []);

  return (
    <FormProvider {...wishesAccountInputMethods}>
      <InputForm title="계좌번호 입력하기">
        <div className="flex flex-col gap-12">
          <InputText
            value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
            boxStyles={{ backgroundColor: '#3C0F0F', color: colors.warning_red }}
            readOnly
          />

          <InputText placeholder="예금주명" register={register('accountInfo.name')} />
          <SelectBank />

          <AccountInput
            accountVerifyBtnState={accountVerifyBtnState}
            changeAccountVerifyBtnState={changeAccountVerifyBtnState}
          >
            <InputText
              placeholder="계좌번호를 입력해주세요"
              register={register('accountInfo.account')}
            />
          </AccountInput>
          <AccountFormNotice changeNoticeAgreeState={changeNoticeAgreeState} />
        </div>

        {/* Submit Button */}
        {children}
      </InputForm>
    </FormProvider>
  );
}

function AccountInput({
  accountVerifyBtnState,
  changeAccountVerifyBtnState,
  children,
}: {
  accountVerifyBtnState: boolean;
  changeAccountVerifyBtnState: (state: boolean) => void;
} & PropsWithChildren) {
  const { formState, watch, reset } = useFormContext<WishesAccountDataResolverType>();
  const { isDirty, isValid } = formState;
  const { accountInfo, forPayCode, kakaoPayCode } = watch();

  useEffect(() => {
    if (isValid) {
      changeAccountVerifyBtnState(true);
    }

    if (!accountInfo) {
      changeAccountVerifyBtnState(isDirty);
    }
  }, [isDirty, isValid]);

  function handleAccountCheck() {
    if ((accountInfo.account && accountInfo.bank, accountInfo.name)) {
      postVerifyAccount({
        account: accountInfo.account,
        bank: accountInfo.bank,
        name: accountInfo.name,
      }).then((response) => {
        reset({
          accountInfo,
          forPayCode,
          kakaoPayCode,
        });
        // refactor : 어뷰징유저 하는거 확인해야합니다!
        changeAccountVerifyBtnState(!response.success);
      });
    }
  }

  return (
    <div className="flex justify-between gap-6">
      <div className="flex-grow-3 w-full">{children}</div>
      <div className="flex-grow-1">
        <div className="w-115 h-50 font-galmuri">
          <Button
            fontColor="white"
            font="galmuri"
            onClick={handleAccountCheck}
            style={{ fontSize: '14px' }}
            disabled={!(isValid && isDirty) || !accountVerifyBtnState}
          >
            계좌번호 확인
          </Button>
        </div>
      </div>
    </div>
  );
}

function SelectBank() {
  const { state: modalState, handleState: handleChangeModalState } = useToggle();
  const { register, setValue } = useFormContext<WishesAccountDataResolverType>();

  function changeBank(input: string) {
    setValue('accountInfo.bank', input, { shouldDirty: true });
  }

  return (
    <>
      <DropDwonBox isOpen={false} handleState={handleChangeModalState} bgColor="dark_green">
        <input
          {...register('accountInfo.bank')}
          placeholder="은행 선택"
          className="w-full h-full font-galmuri text-[14px]"
          readOnly
          onClick={handleChangeModalState}
        />
      </DropDwonBox>

      {modalState && (
        <Modal isOpen={modalState} handleState={handleChangeModalState}>
          <div className="flex justify-center items-center  w-full h-full">
            <BankModal changeBank={changeBank} handleState={handleChangeModalState} />
          </div>
        </Modal>
      )}
    </>
  );
}

export function AccountFormNotice({
  changeNoticeAgreeState,
}: {
  changeNoticeAgreeState: (state: boolean) => void;
}) {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl">
      {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}
      <div className="flex justify-end w-full h-20">
        <div className="flex justify-end">
          <CheckBox changeCheckedState={changeNoticeAgreeState}>
            <span className="font-galmuri text-[14px] text-main_blue ml-8">{'동의함'}</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
}
