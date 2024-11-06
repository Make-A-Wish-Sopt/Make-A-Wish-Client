'use client';

import { FormProvider, useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import {
  WishesAccountDataResolverType,
  wishesPhoneResolver,
  WishesPhoneResolverType,
} from '@/validation/wishes.validate';
import InputForm from '@/components/UI/InputForm';
import { colors } from '@/styles/styles';
import InputText from '@/components/Common/Input/inputText';
import Button from '@/components/Common/Button';
import { PropsWithChildren, useEffect, useState } from 'react';
import { UserAccountDataType } from '@/types/api/response';
import useToggle from '@/hooks/common/useToggle';
import DropDwonBox from '@/components/UI/DropDwonBox';
import Modal from '@/components/Common/Modal';
import BankModal from '@/components/Common/Modal/BankModal';
import { getUserAccount } from '@/api/user';
import CheckBox from '@/components/UI/CheckBox';
import { useRouters } from '@/hooks/common/useRouters';
import { yupResolver } from '@hookform/resolvers/yup';

export default function WishesAccountInputForm({
  methods,
}: {
  methods: UseFormReturn<WishesAccountDataResolverType, any, undefined>;
} & PropsWithChildren) {
  const { register, reset, setValue, formState, handleSubmit } = methods;

  const wishesPhoneMethods = useForm<WishesPhoneResolverType>({
    defaultValues: {
      phone: '',
    },
    resolver: yupResolver(wishesPhoneResolver),
  });

  const [savedAccountData, setSavedAccountData] = useState<UserAccountDataType | null>(null);

  //부모의 상태에 따라 리렌더링 되는거 최적화 해보기
  const { state: noticeAgree, changeState: changeNoticeAgreeState } = useToggle();
  const { state, changeState } = useToggle();

  const { isValid } = formState;

  useEffect(() => {
    if (isValid && wishesPhoneMethods.formState.isValid && noticeAgree) {
      changeState(true);
    } else {
      changeState(false);
    }
  }, [isValid, wishesPhoneMethods.formState.isValid, noticeAgree]);

  useEffect(() => {
    getUserAccount().then((response) => {
      setSavedAccountData({
        ...response,
      });
    });
  }, []);

  useEffect(() => {
    if (savedAccountData) {
      reset({ ...savedAccountData.accountInfo });

      wishesPhoneMethods.reset({
        phone: savedAccountData.phone,
      });
    }
  }, [savedAccountData]);

  function changeBank(input: string) {
    setValue('bank', input, { shouldDirty: true });
  }

  function handleWishesCreateSubmit() {
    console.log('helo');
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleWishesCreateSubmit)}>
        <InputForm title="계좌번호 입력하기">
          <div className="flex flex-col gap-12">
            <InputText
              value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
              boxStyles={{ backgroundColor: '#3C0F0F', color: colors.warning_red }}
              readOnly
            />

            <InputText placeholder="예금주명" register={register('name')} />

            <SelectBank changeBank={changeBank} />

            <AccountInput>
              <InputText placeholder="계좌번호를 입력해주세요" register={register('account')} />
            </AccountInput>
          </div>
        </InputForm>

        <InputForm title="휴대폰번호 입력하기">
          <div className="flex flex-col gap-24">
            <InputText
              placeholder="(-)없이 숫자만 입력해주세요"
              register={wishesPhoneMethods.register('phone')}
            />

            <AccountFormNotice>
              <CheckBox<WishesAccountDataResolverType>
                checkBoxText={'동의함'}
                changeCheckedState={changeNoticeAgreeState}
              />
            </AccountFormNotice>
          </div>
        </InputForm>

        <WishesAccountSubmitButton disabled={!state} />
      </form>
    </FormProvider>
  );
}

function AccountInput({ children }: PropsWithChildren) {
  const { formState } = useFormContext<WishesAccountDataResolverType>();
  const { isDirty, isValid } = formState;

  function handleAccountCheck() {
    //logic
  }

  return (
    <div className="flex justify-between gap-6">
      <div className="flex-grow-3">{children}</div>
      <div className="flex-grow-1">
        <div className="w-115 h-50 font-galmuri">
          <Button
            fontColor="white"
            font="galmuri"
            onClick={handleAccountCheck}
            styles={{ fontSize: '14px' }}
            disabled={!(isValid && isDirty)}
          >
            계좌번호 확인
          </Button>
        </div>
      </div>
    </div>
  );
}

function SelectBank({ changeBank }: { changeBank: (input: string) => void }) {
  const { state: modalState, handleState: handleChangeModalState } = useToggle();
  const { register } = useFormContext<WishesAccountDataResolverType>();
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

function AccountFormNotice({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl ">
      {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}
      <div className="flex justify-end w-full h-20">{children}</div>
    </div>
  );
}

//이전 다음 이렇게 된 버튼을 컴포넌트로 만들어도 좋을듯
function WishesAccountSubmitButton({ disabled }: { disabled: boolean }) {
  const { handleBack } = useRouters();

  return (
    <div className="flex justify-between gap-10">
      <Button fontColor="white" onClick={handleBack}>
        이전
      </Button>

      <Button type="submit" fontColor="white" disabled={disabled}>
        다음
      </Button>
    </div>
  );
}
