'use client';

import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import {
  wishesAccountDataResolver,
  WishesAccountDataResolverType,
  WishesPhoneResolverType,
} from '@/validation/wishes.validate';
import InputForm from '@/components/UI/InputForm';
import { colors } from '@/styles/styles';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { PropsWithChildren, useEffect } from 'react';
import { UserAccountDataType } from '@/types/api/response';
import useToggle from '@/hooks/common/useToggle';
import DropDwonBox from '@/components/UI/DropDwonBox';
import Modal from '@/components/Common/Modal';
import BankModal from '@/components/Common/Modal/BankModal';
import { postVerifyAccount, putUserAccount } from '@/api/user';
import CheckBox from '@/components/UI/CheckBox';
import { useRouters } from '@/hooks/common/useRouters';
import { wishesAccountInputInit } from '@/constant/init';
import { yupResolver } from '@hookform/resolvers/yup';

export default function WishesAccountInputForm({
  savedUserAccountData,
}: {
  savedUserAccountData?: UserAccountDataType;
}) {
  const wishesAccountInputMethods = useForm<WishesAccountDataResolverType>({
    mode: 'onChange',
    defaultValues: {
      ...wishesAccountInputInit,
    },
    resolver: yupResolver(wishesAccountDataResolver),
  });

  const { state: accountVerifyBtnState, changeState: changeAccountVerifyBtnState } = useToggle();
  const { state: noticeAgree, changeState: changeNoticeAgreeState } = useToggle();

  const { register, reset } = wishesAccountInputMethods;

  useEffect(() => {
    if (savedUserAccountData) {
      reset({ ...savedUserAccountData.accountInfo });
    }
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

          <InputText placeholder="예금주명" register={register('name')} />
          <SelectBank />

          <AccountInput
            accountVerifyBtnState={accountVerifyBtnState}
            changeAccountVerifyBtnState={changeAccountVerifyBtnState}
          >
            <InputText placeholder="계좌번호를 입력해주세요" register={register('account')} />
          </AccountInput>
          <AccountFormNotice changeNoticeAgreeState={changeNoticeAgreeState} />
        </div>
        <WishesAccountSubmitButton disabled={!(noticeAgree && !accountVerifyBtnState)} />
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
  const { formState, watch } = useFormContext<WishesAccountDataResolverType>();
  const { isDirty, isValid } = formState;
  const { account, bank, name } = watch();

  useEffect(() => {
    changeAccountVerifyBtnState(isDirty);
  }, [isDirty]);

  function handleAccountCheck() {
    if (account && bank && name) {
      postVerifyAccount({ account: account, bank: bank, name: name }).then((response) => {
        // refactor : 어뷰징유저 하는거 확인해야합니다!
        changeAccountVerifyBtnState(response.success);
      });
    }

    //logic
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
            styles={{ fontSize: '14px' }}
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
    setValue('bank', input, { shouldDirty: true });
  }

  return (
    <>
      <DropDwonBox isOpen={false} handleState={handleChangeModalState} bgColor="dark_green">
        <input
          {...register('bank')}
          placeholder="은행 선택"
          className="w-full h-full font-galmuri text-[14px]"
          readOnly
          onClick={handleChangeModalState}
        />
      </DropDwonBox>

      {modalState && (
        <Modal isOpen={modalState} handleState={handleChangeModalState}>
          <BankModal changeBank={changeBank} handleState={handleChangeModalState} />
        </Modal>
      )}
    </>
  );
}

function AccountFormNotice({
  changeNoticeAgreeState,
}: {
  changeNoticeAgreeState: (state: boolean) => void;
}) {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl ">
      {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}
      <div className="flex justify-end w-full h-20">
        <CheckBox<WishesAccountDataResolverType>
          checkBoxText={'동의함'}
          changeCheckedState={changeNoticeAgreeState}
        />
      </div>
    </div>
  );
}

//이전 다음 이렇게 된 버튼을 컴포넌트로 만들어도 좋을듯
function WishesAccountSubmitButton({ disabled }: { disabled: boolean }) {
  const { handleBack, handleRouter } = useRouters();
  const { formState, watch } = useFormContext<WishesAccountDataResolverType>();
  // const { isValid, isDirty } = formState;

  function handleWishesCreateSubmit() {
    const { account, bank, name } = watch();

    if (account && bank && name) {
      putUserAccount({ account: account, bank: bank, name: name }).then((response) => {
        response.data.success && handleRouter('/wishes/create?step=preview');
      });
    }
  }

  return (
    <div className="flex justify-between gap-10">
      <Button fontColor="white" onClick={handleBack}>
        이전
      </Button>

      <Button type="submit" onClick={handleWishesCreateSubmit} disabled={disabled}>
        다음
      </Button>
    </div>
  );
}

// function
