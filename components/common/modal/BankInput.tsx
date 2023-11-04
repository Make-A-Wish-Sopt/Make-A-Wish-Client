import useModal from '@/hooks/common/useModal';
import InputBox from '../input/inputBox';
import Modal from './modal';
import BankModal from './BankModal';
import styled from 'styled-components';
import { validation } from '@/validation/input';
import AlertTextBox from '../alertTextBox';
import { ChangeEvent } from 'react';
import { ALERT_ACCOUNT_LENGTH } from '@/constant/alertMessage';
import Box from '../box/Box';
import Button from '../button/button';
import { UseFormRegister } from 'react-hook-form';
import { InputsType } from '@/types/common/input';

interface BankInputProps {
  name: string;
  handleChangeName: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  bankName: string;
  changeBankName: (input: string) => void;
  account: string;
  handleChangeAccount: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  register: UseFormRegister<InputsType>;
}

export default function BankInput(props: BankInputProps) {
  const {
    name,
    handleChangeName,
    bankName,
    changeBankName,
    account,
    handleChangeAccount,
    register,
  } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <Styled.Container>
      <Styled.ItemWrapper>
        <InputBox placeholder="예금주명" value={name || ''} handleChangeValue={handleChangeName} />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper onClick={handleToggle}>
        <InputBox placeholder="은행 선택" value={bankName || ''} readOnly dropDown={true} />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <Styled.InputWrapper>
          <InputBox
            boxType={'twoThree'}
            placeholder="계좌번호를 입력해주세요"
            {...register('phone')}
          />
          {/* {phone && isAlertState && <AlertTextBox>올바른 연락처를 입력해주세요</AlertTextBox>} */}
          <Box boxType={'oneThree'} bgColor={'main_blue'}>
            <Button
              handleClick={() => console.log('기능추가해주세요!')}
              fontColor={'white'}
              font={'body14'}
            >
              {'계좌번호 확인'}
            </Button>
          </Box>
        </Styled.InputWrapper>
      </Styled.ItemWrapper>
      {/* 기능구현 이후 수정해야하는 부분 */}

      {/* {validation.checkAccountLength(account) && (
        <AlertTextBox> {ALERT_ACCOUNT_LENGTH}</AlertTextBox>
      )} */}

      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <BankModal handleToggle={handleToggle} changeBankName={changeBankName} />
        </Modal>
      )}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    margin-bottom: 2.4rem;
  `,

  ItemWrapper: styled.div`
    margin-top: 1.2rem;
  `,

  InputWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
  `,
};
