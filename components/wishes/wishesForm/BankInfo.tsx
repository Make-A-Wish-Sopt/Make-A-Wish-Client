import { editUserAccount, getUserAccount } from '@/api/wishes/wishesAPI';
import { useForm } from 'react-hook-form';
import InputContainer from '@/components/common/input/inputContainer';
import BankInput from '@/components/common/modal/BankInput';
import { QUERY_KEY } from '@/constant/queryKey';
import { useCreateWishesLink } from '@/hooks/queries/wishes/useCreateWishesLink';
import { BankInfoInputsType } from '@/types/common/input/wishesInput';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import CheckBox from '@/components/common/checkBox';
import useCheckBox from '@/hooks/common/useCheckBox';
import Input from '@/components/common/input/input';
import { StyledBox } from '@/components/common/box';
import WishesStepTitle from '../common/wishesStepTitle';
import WishesStepBtn from '../common/wishesStepBtn';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import theme from '@/styles/theme';
import { useEffect } from 'react';
import { validation } from '@/validation/input';
import AlertTextBox from '@/components/common/alertTextBox';

interface BankInfoProps {
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
  const { wishesStep } = props;
  const { data } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);

  const methods = useForm<BankInfoInputsType>({
    defaultValues: {
      phone: '',
      mobileCode: '',
      name: '',
      bankName: '',
      account: '',
    },
  });

  const { checkBoxState, handleChangeCheckBoxState } = useCheckBox();

  const { postWishesData } = useCreateWishesLink();

  const { mutate } = useMutation(() => editUserAccount(methods), {
    onSuccess: () => {
      router.push('/wishes/share');
    },
  });

  useEffect(() => {
    if (
      checkBoxState &&
      methods.getValues('name') &&
      methods.getValues('bankName') &&
      methods.getValues('account') &&
      methods.getValues('phone') &&
      validation.isCorrectPhoneNumber(methods.getValues('phone'))
    ) {
      wishesStep.changeNextState(true);
    } else {
      wishesStep.changeNextState(false);
    }
  }, [methods.watch()]);

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

            <InputContainer title="전화번호 입력하기">
              <Input
                placeholder="(-)없이 숫자만 입력해주세요"
                register={methods.register('phone')}
              />
              {!validation.isIncludeHyphen(methods.watch('phone')) ||
                (!validation.isCorrectPhoneNumber(methods.watch('phone')) &&
                  methods.watch('phone') !== '' && (
                    <AlertTextBox>{'올바른 연락처를 입력해주세요'}</AlertTextBox>
                  ))}
            </InputContainer>
          </InputContainer>
        </div>

        <WishesStepBtn wishesStep={wishesStep} handleClickFn={() => {}} />
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
