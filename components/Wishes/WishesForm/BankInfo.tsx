import { UseFormReturn } from 'react-hook-form';
import InputContainer from '@/components/Common/Input/InputContainer';
import BankInput from '@/components/Common/Modal/BankInput';
import { WishesDataInputType } from '@/types/wishesType';
import styled from 'styled-components';
import CheckBox from '@/components/Common/CheckBox';
import useCheckBox from '@/hooks/common/useCheckBox';
import Input from '@/components/Common/Input/Input';
import { StyledBox } from '@/components/Common/Box';
import WishesStepTitle from '../Common/WishesStepTitle';
import WishesStepBtn from '../Common/WishesStepBtn';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import theme from '@/styles/theme';
import { useEffect } from 'react';
import { validation } from '@/validation/input';
import AlertTextBox from '@/components/Common/AlertTextBox';
import { useGetUserAccount, usePutUserAccount } from '@/hooks/queries/user';
import { usePostWishes } from '@/hooks/queries/wishes';

interface BankInfoProps {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  wishesStep: {
    stepIndex: number;
    prevState: boolean;
    nextState: boolean;
    changePrevState: (state: boolean) => void;
    changeNextState: (state: boolean) => void;
    handleNextStep: () => void;
    handlePrevStep: () => void;
    getNextBtnColor: (state: boolean) => ColorSystemType;
    getPrevBtnColor: (state: boolean) => ColorSystemType;
  };
}

export default function BankInfo(props: BankInfoProps) {
  const { methods, wishesStep } = props;
  const { userAccountData } = useGetUserAccount();
  const { checkBoxState, handleChangeCheckBoxState } = useCheckBox();
  const { handlePutUserAccount, isSuccess } = usePutUserAccount(methods);
  const { handlePostWishes } = usePostWishes(methods);

  useEffect(() => {
    isSuccess && handlePostWishes();
  }, [isSuccess]);

  useEffect(() => {
    if (
      checkBoxState &&
      methods.getValues('name') &&
      methods.getValues('bank') &&
      methods.getValues('account') &&
      methods.getValues('phone') &&
      validation.isCorrectPhoneNumber(methods.getValues('phone'))
    ) {
      wishesStep.changeNextState(true);
    } else {
      wishesStep.changeNextState(false);
    }
  }, [methods.watch()]);

  useEffect(() => {
    if (userAccountData) {
      methods.setValue('name', userAccountData.accountInfo.name);
      methods.setValue('bank', userAccountData.accountInfo.bank);
      methods.setValue('account', userAccountData.accountInfo.account);
      methods.setValue('phone', userAccountData.phone);
    }
  }, [userAccountData]);

  return (
    <>
      <WishesStepTitle title="계좌번호 및 전화번호 입력하기" />
      <Styled.Container>
        <div>
          <GuideBox className="pastelBlue_darkBlue">
            {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}

            <Styled.GuideCheckBoxWrapper>
              <CheckBox
                checkBoxState={checkBoxState}
                checkBoxText={'동의함'}
                handleClickFn={handleChangeCheckBoxState}
              />
            </Styled.GuideCheckBoxWrapper>
          </GuideBox>

          <InputContainer title="계좌번호 입력하기">
            <BankInput methods={methods} />

            <InputContainer title="휴대폰번호 입력하기">
              <Input
                inputType="number"
                placeholder="(-)없이 숫자만 입력해주세요"
                register={methods.register('phone')}
              />

              {methods.watch('phone') !== '' &&
                !validation.isCorrectPhoneNumber(methods.watch('phone')) && (
                  <AlertTextBox>{'올바른 연락처를 입력해주세요'}</AlertTextBox>
                )}
            </InputContainer>
          </InputContainer>
        </div>

        <WishesStepBtn
          wishesStep={wishesStep}
          handleClickFn={() => {
            handlePutUserAccount();
          }}
        />
      </Styled.Container>
    </>
  );
}

const GuideBox = styled(StyledBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 9.8rem;

  ${theme.fonts.body14};
  text-align: left;

  margin-bottom: 2.4rem;
  padding: 1.2rem;
`;

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100svh;
  `,

  GuideCheckBoxWrapper: styled.div`
    display: flex;
    justify-content: right;

    width: 100%;
    height: 2rem;
  `,

  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 4.6rem;
  `,
};
