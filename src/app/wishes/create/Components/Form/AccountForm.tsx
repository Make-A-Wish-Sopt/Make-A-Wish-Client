'use client';

import { postVerifyAccount, putUserAccount } from '@/api/user';
import Button from '@/components/Elements/Button';
import InputText from '@/components/Elements/Input/inputText';
import CheckBox from '@/components/UI/CheckBox';
import DropDwonBox from '@/components/UI/DropDwonBox';
import InputForm from '@/components/UI/InputForm';
import { BANK_LIST } from '@/constant/bankList';
import { useFunnelContext } from '@/Context/FunnelContext';
import useBoolean from '@/hooks/useBoolean';
import useModals from '@/hooks/useModals';
import { colors } from '@/styles/styles';
import Image from 'next/image';
import { useEffect } from 'react';
import { useFormState } from 'react-hook-form';
import { WishesFunnelStepType } from '../../page';
import { WishCreateFormMethodsType } from '../FunnelContainer';
import { Step } from '@/components/Modules/Funnel';
import ValidateLoadingModal from '@/components/Elements/Modal/ValidateLoadingModal';
import CheckedIcon from '@/components/Elements/Icon/CheckedIcon';
import { postWishes } from '@/api/wishes';

const AccountForm = () => {
  const isAccountValidToggle = useBoolean();
  const noticeAgreeToggle = useBoolean();

  return (
    <>
      <InputForm title="계좌번호 입력하기">
        <div className="flex flex-col gap-12">
          <DepositorNameInput />
          <SelectBankInput />
          <AccountNumberInput
            isAccountValid={isAccountValidToggle.state}
            onCheckAccountValid={isAccountValidToggle.changeState}
          />

          <계좌번호오기입안내사항동의여부 onCheck={noticeAgreeToggle.changeState} />
        </div>
      </InputForm>

      <Step.ButtonWrapper horizontal className="gap-10">
        <PrevButton />
        <NextButton
          isAccountValid={isAccountValidToggle.state}
          noticeAgree={noticeAgreeToggle.state}
        />
      </Step.ButtonWrapper>
    </>
  );
};

const 계좌번호오기입안내사항동의여부 = ({ onCheck }: { onCheck: (state: boolean) => void }) => {
  return (
    <div className="flex flex-col justify-between w-full h-98 bg-dark_green text-left mb-24 p-12  font-galmuri text-white text-[14px] rounded-xl">
      <p>{'※ 잘못된 계좌번호 기재로 발생되는 문제는 책임지지 않아요!ㅠㅠ'}</p>
      <div className="flex justify-end w-full h-20">
        <div className="flex justify-end">
          <CheckBox changeCheckedState={onCheck}>
            <span className="font-galmuri text-[14px] text-main_blue ml-8">{'동의함'}</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
};

const DepositorNameInput = () => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const accountFormInput = inputs.accountFormInput;
  const { register } = accountFormInput;

  return <InputText placeholder="예금주명" register={register('accountInfo.name')} />;
};

const 입력제한주의사항 = () => {
  return (
    <InputText
      value={'※ 4회 이상 틀리면, 서비스 이용이 제한됩니다.'}
      boxStyles={{
        backgroundColor: '#3C0F0F',
        color: colors.warning_red,
        marginBottom: '1.2rem',
      }}
      readOnly
    />
  );
};

const SelectBankInput = () => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const accountFormInput = inputs.accountFormInput;
  const { register, setValue } = accountFormInput;

  const { Modal, modalState, openModal, closeModal } = useModals<['bank']>();

  const handleSelectBank = (bankName: string) => {
    setValue('accountInfo.bank', bankName, { shouldValidate: true });
    closeModal('bank');
  };

  return (
    <>
      <Modal
        modalKey="bank"
        Trigger={
          <div onClick={() => openModal('bank')}>
            <DropDwonBox
              isOpen={modalState.bank}
              changeOpenState={() => closeModal('bank')}
              bgColor="dark_green"
            >
              <input
                {...register('accountInfo.bank')}
                placeholder="은행 선택"
                className="w-full h-full font-galmuri text-[14px] cursor-pointer"
                readOnly
              />
            </DropDwonBox>
          </div>
        }
      >
        <Modal.ModalOverlay>
          <Modal.ModalLayout className="flex justify-center items-center">
            <Modal.ContentFrame bgColor="background" className="w-335 overflow-scroll">
              <Modal.ContentHeader>
                <h2 className="font-galmuri text-[16px] text-white mb-20">은행을 선택해주세요.</h2>
              </Modal.ContentHeader>
              <Modal.ContentBody className="max-h-[608px] overflow-scroll">
                <ul
                  id="bankList"
                  className="h-91.4% overflow-scroll scrollbar-hide mt-8 grid grid-cols-3 gap-8"
                >
                  {BANK_LIST.map((bank) => (
                    <li
                      id="bankItem"
                      className="w-90 h-66 py-10 bg-dark_green rounded-xl cursor-pointer"
                      onClick={() => handleSelectBank(bank.name)}
                      key={bank.name}
                    >
                      <div
                        id="bankItem-wrppaer"
                        className="flex flex-col w-full h-ful items-center"
                      >
                        <div
                          id="bankLogo-wrppaer"
                          className="flex justify-center items-center w-26 h-26 mx-auto"
                        >
                          <Image src={bank.logo} alt={`${bank.name} 로고`} />
                        </div>
                        <span
                          id="bankName"
                          className="font-galmuri text-white text-[12px] text-center mt-6"
                        >
                          {bank.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Modal.ContentBody>
            </Modal.ContentFrame>
          </Modal.ModalLayout>
        </Modal.ModalOverlay>
      </Modal>
    </>
  );
};

const AccountNumberInput = ({
  isAccountValid,
  onCheckAccountValid,
}: {
  isAccountValid: boolean;
  onCheckAccountValid: (state: boolean) => void;
}) => {
  const { inputs } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const accountFormInput = inputs.accountFormInput;
  const { register, trigger, control, getValues, reset } = accountFormInput;
  const isLoadingToggle = useBoolean();

  const { errors, isDirty } = useFormState({ control, name: ['accountInfo'] });

  useEffect(() => {
    trigger('accountInfo');
  }, []);

  const handleSubmit = async () => {
    const accountInfo = getValues('accountInfo');
    isLoadingToggle.changeState(true);

    const response = await postVerifyAccount({
      account: accountInfo.account,
      bank: accountInfo.bank,
      name: accountInfo.name,
    });

    if (response) {
      onCheckAccountValid(response.success);
    } else {
      onCheckAccountValid(false);
    }

    setTimeout(() => {
      isLoadingToggle.changeState(true);
      console.log('loading');
    }, 2000);

    console.log('hello');
    reset({ ...getValues() });
  };

  const getDisabledState = () => {
    if (!!errors.accountInfo) {
      console.log('error!!');
      return true;
    }

    if (isDirty === false) return true;
  };

  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex-grow-3 w-full">
          <InputText
            placeholder="계좌번호를 입력해주세요"
            register={register('accountInfo.account')}
          >
            {!errors && isAccountValid && <CheckedIcon width={24} />}
            {!errors && isAccountValid && <CheckedIcon width={24} />}
          </InputText>
        </div>

        <div className="flex-grow-1">
          <div className="w-115 h-50 font-galmuri">
            <Button
              disabled={getDisabledState()}
              fontColor="white"
              font="galmuri"
              onClick={handleSubmit}
              style={{ fontSize: '14px' }}
            >
              계좌번호 확인
            </Button>
          </div>
        </div>
        {<ValidateLoadingModal isOpen={isLoadingToggle.state} success={isAccountValid} />}
      </div>
    </>
  );
};

const PrevButton = () => {
  const { PrevButton } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();

  return <PrevButton />;
};

const NextButton = ({
  isAccountValid,
  noticeAgree,
}: {
  isAccountValid: boolean;
  noticeAgree: boolean;
}) => {
  const { inputs, nextStep } = useFunnelContext<WishesFunnelStepType, WishCreateFormMethodsType>();
  const accountFormInput = inputs.accountFormInput;
  const wishesFormInput = inputs.wishesFormInput;
  const { control, getValues } = accountFormInput;
  const { errors, isDirty } = useFormState({ control, name: ['accountInfo'] });

  const handleNextStep = async () => {
    const accountInfo = getValues();
    const 계좌등록요청 = await putUserAccount({ ...accountInfo });
    const 계좌등록요청성공 = 계좌등록요청.data.success;

    if (!계좌등록요청성공) return;

    const wishFormData = wishesFormInput.getValues();
    const 생일잔치등록요청 = await postWishes({ ...wishFormData });
    const 생일잔치등록요청성공 = 생일잔치등록요청.data.success;

    if (!생일잔치등록요청성공) return;

    nextStep();
  };

  // const getDisabledState = () => {
  //   if (errors.accountInfo) return true;
  //   if (isAccountValid === false) return true;
  //   if (noticeAgree === false) return true;

  //   return false;
  // };

  return <Button onClick={handleNextStep}>{'소원생성!'}</Button>;
};

export default AccountForm;
