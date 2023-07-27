import useModal from '@/hooks/common/useModal';
import InputBox from '../input/inputBox';
import Modal from '../modal';
import BankModal from './BankModal';
import styled from 'styled-components';
import { validation } from '@/validation/input';
import AlertTextBox from '../alertTextBox';
import { ChangeEvent } from 'react';

interface BankInputProps {
  bankName: string;
  handleChangeBankName: (input: string) => void;
  account: string;
  handleChangeAccount: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default function BankInput(props: BankInputProps) {
  const { bankName, handleChangeBankName, account, handleChangeAccount } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <>
      <Styled.ItemWrapper>
        <InputBox placeholder="예금주명" />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <div onClick={handleToggle}>
          <InputBox placeholder="은행 선택" value={bankName} readOnly dropDown={true} />
        </div>
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <InputBox
          placeholder="계좌번호는 (-)없이 입력해주세요"
          handleChangeValue={handleChangeAccount}
          value={account}
        />
      </Styled.ItemWrapper>
      {validation.isIncludeHyphen(account) && (
        <AlertTextBox> 계좌번호는 (-)없이 입력해주세요</AlertTextBox>
      )}

      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <BankModal handleToggle={handleToggle} changeBankName={handleChangeBankName} />
        </Modal>
      )}
    </>
  );
}

const Styled = {
  ItemWrapper: styled.div`
    margin-top: 1.2rem;
  `,
};
