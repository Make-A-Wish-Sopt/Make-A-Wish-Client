import { editUserAccount, getUserAccount } from '@/api/wishes/wishesAPI';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/button';
import InputContainer from '@/components/common/input/inputContainer';
import BankInput from '@/components/common/modal/BankInput';
import { QUERY_KEY } from '@/constant/queryKey';
import { useCreateWishesLink } from '@/hooks/queries/wishes/useCreateWishesLink';
import { BankInfoInputsType } from '@/types/common/input';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import styled, { CSSProperties } from 'styled-components';
import CheckBox from '@/components/common/checkBox';
import useCheckBox from '@/hooks/common/useCheckBox';
import Input from '@/components/common/input/input';
import Box from '@/components/common/box';

export default function BankInfo() {
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

  const router = useRouter();

  // const { mutate } = useMutation(
  //   () => editUserAccount({ name, bankName, account }, getValues('phone')),
  //   {
  //     onSuccess: () => {
  //       router.push('/wishes/share');
  //     },
  //   },
  // );

  const uploadAccount = () => {};

  return (
    <Styled.Container>
      <div>
        <Box boxStyled={BoxStyled} colorSystem="pastelBlue_darkBlue">
          {'※ 계좌번호, 연락처에 대한 허위기재와 오기로 인해 발생되는 문제는 책임지지 않습니다.'}

          <Styled.GuideCheckBoxWrapper>
            <CheckBox
              checkBoxState={checkBoxState}
              checkBoxText={'동의함'}
              handleClickFn={handleChangeCheckBoxState}
            />
          </Styled.GuideCheckBoxWrapper>
        </Box>

        <InputContainer title="계좌번호 입력하기">
          <BankInput methods={methods} />

          <InputContainer title="전화번호 입력하기">
            <Input placeholder="(-)없이 숫자만 입력해주세요" register={methods.register('phone')} />
          </InputContainer>
        </InputContainer>
      </div>

      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={uploadAccount}>
          소원링크 생성 완료
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

const BoxStyled: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  width: '100%',
  height: '9.8rem',
  padding: '1.2rem',

  fontSize: '14px',
  fontFamily: 'Galmuri11',
  lineHeight: '140%',

  textAlign: 'left',

  marginBottom: '2.4rem',
};

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
