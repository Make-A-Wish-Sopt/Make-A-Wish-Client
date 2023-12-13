import { editUserAccount, getUserAccount } from '@/api/wishes/wishesAPI';
import { useForm } from 'react-hook-form';
import AlertTextBox from '@/components/common/alertTextBox';
import BasicBox from '@/components/common/box/BasicBox';
import Button from '@/components/common/button/button';
import InputBox from '@/components/common/input/inputBox';
import InputContainer from '@/components/common/input/inputContainer';
import BankInput from '@/components/common/modal/BankInput';
import { QUERY_KEY } from '@/constant/queryKey';
import useInput from '@/hooks/common/useInput';
import { useCreateWishesLink } from '@/hooks/queries/wishes/useCreateWishesLink';

import theme from '@/styles/theme';
import { BankInfoInputsType } from '@/types/common/input';
import { validation } from '@/validation/input';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled, { CSSProperties } from 'styled-components';
import Box from '@/components/common/box/Box';
import CheckBox from '@/components/common/checkBox';
import useCheckBox from '@/hooks/common/useCheckBox';
import Input from '@/components/common/input/input';
import InputBank from '@/components/common/input/inputBank';

export default function BankInfo() {
  const { data } = useQuery(QUERY_KEY.ITEM_DATA, getUserAccount);
  const [name, handleChangeName, setName] = useInput('');
  const [bankName, setBankName] = useState('');
  const [account, handleChangeAccount, setAccount] = useInput('');
  const { checkBoxState, handleChangeCheckBoxState } = useCheckBox();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<BankInfoInputsType>({
    defaultValues: {
      phone: '',
      mobileCode: '',
      name: '',
      bankName: '',
      account: '',
    },
  });

  useEffect(() => {
    setValue('phone', data?.data?.phone);
    setName(data?.data?.accountInfo?.name);
    setBankName(data?.data?.accountInfo?.bank);
    setAccount(data?.data?.accountInfo?.account);
  }, [data]);

  const changeBankName = (input: string) => {
    setBankName(input);
  };

  const [isAlertState, setIsAlertState] = useState(false);
  const { postWishesData } = useCreateWishesLink();

  const router = useRouter();

  const { mutate } = useMutation(
    () => editUserAccount({ name, bankName, account }, getValues('phone')),
    {
      onSuccess: () => {
        router.push('/wishes/share');
      },
    },
  );

  const uploadAccount = () => {
    if (name !== '' && bankName !== '' && account !== '' && !validation.isIncludeHyphen(account)) {
      postWishesData();
      mutate();
    } else {
      alert('계좌정보를 확인 해 주세요!');
    }
  };

  //react-hook-form validation 조건으로 변경예정

  // useEffect(() => {
  //   validation.isIncludeHyphen(phone) ? setIsAlertState(true) : setIsAlertState(false);
  //   validation.isCorrectPhoneNumber(phone) ? setIsAlertState(false) : setIsAlertState(true);
  // }, [phone]);

  return (
    <Styled.Container>
      <div>
        <Styled.GuideContentWrapper>
          {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}

          <Styled.GuideCheckBoxWrapper>
            <CheckBox
              checkBoxState={checkBoxState}
              checkBoxText={'동의함'}
              handleClickFn={handleChangeCheckBoxState}
            />
          </Styled.GuideCheckBoxWrapper>
        </Styled.GuideContentWrapper>

        <InputContainer title="계좌번호 입력하기">
          <BankInput register={register} />

          <InputContainer title="전화번호 입력하기">
            <Styled.InputWrapper>
              <Input placeholder="(-)없이 숫자만 입력해주세요" />

              <Button
                width={10.6}
                handleClick={() => console.log('기능추가해주세요!')}
                fontColor={'white'}
                font={'body14'}
              >
                {'인증번호 받기'}
              </Button>
            </Styled.InputWrapper>
            <Input placeholder="인증번호를 적어주세요" />
          </InputContainer>
        </InputContainer>
      </div>

      <Styled.ButtonWrapper>
        <BasicBox
          bgColor={
            !isAlertState && !validation.checkAccountLength(account) && bankName && name
              ? theme.colors.main_blue
              : theme.colors.gray1
          }
          fontColor={theme.colors.white}
          borderColor={'transparent'}
        >
          <Button handleClick={uploadAccount}>완료</Button>
        </BasicBox>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100svh;
  `,

  GuideContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 9.8rem;

    ${theme.fonts.body14};
    color: ${theme.colors.dark_blue};
    background-color: ${theme.colors.pastel_blue};

    padding: 1.2rem;

    border-radius: 1rem;

    text-align: left;
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

  InputWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    gap: 0.6rem;

    width: 100%;

    margin-bottom: 1.2rem;
  `,
};
