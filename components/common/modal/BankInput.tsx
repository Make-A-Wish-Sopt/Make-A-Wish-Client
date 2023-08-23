import useModal from '@/hooks/common/useModal';
import InputBox from '../input/inputBox';
import Modal from '../modal';
import BankModal from './BankModal';
import styled from 'styled-components';
import { validation } from '@/validation/input';
import AlertTextBox from '../alertTextBox';
import { ChangeEvent } from 'react';

interface BankInputProps {
  name: string;
  handleChangeName: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  bankName: string;
  changeBankName: (input: string) => void;
  account: string;
  handleChangeAccount: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default function BankInput(props: BankInputProps) {
  const { name, handleChangeName, bankName, changeBankName, account, handleChangeAccount } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <Styled.Container>
      <Styled.ItemWrapper>
        <InputBox placeholder="예금주명" value={name || ''} handleChangeValue={handleChangeName} />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <div onClick={handleToggle}>
          <InputBox placeholder="은행 선택" value={bankName || ''} readOnly dropDown={true} />
        </div>
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <InputBox
          placeholder="계좌번호는 (-)없이 입력해주세요"
          handleChangeValue={handleChangeAccount}
          value={account || ''}
        />
      </Styled.ItemWrapper>
      {validation.isIncludeHyphen(account) && (
        <AlertTextBox> 계좌번호는 (-)없이 입력해주세요</AlertTextBox>
      )}

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
};
