import useModal from '@/hooks/common/useModal';
import Modal from './modal';
import BankModal from './BankModal';
import styled from 'styled-components';
import { ChangeEvent } from 'react';
import Button from '../button/button';
import { UseFormRegister } from 'react-hook-form';
import Input from '../input/input';
import InputBank from '../input/inputBank';
import { BankInfoInputsType } from '@/types/common/input';

interface BankInputProps {
  name: string;
  handleChangeName: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  bankName: string;
  changeBankName: (input: string) => void;
  account: string;
  handleChangeAccount: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  register?: UseFormRegister<BankInfoInputsType>;
}

export default function BankInput(props: BankInputProps) {
  const { register } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <Styled.Container>
      <Styled.ItemWrapper>
        <Input placeholder="예금주명" />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper onClick={handleToggle}>
        <InputBank placeholder="은행 선택" />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <Styled.InputWrapper>
          <Input placeholder="계좌번호를 입력해주세요" />

          <Button
            width={10.6}
            handleClick={() => console.log('기능추가해주세요!')}
            fontColor={'white'}
            font={'body14'}
          >
            {'계좌번호 확인'}
          </Button>
        </Styled.InputWrapper>
      </Styled.ItemWrapper>
      {/* 기능구현 이후 수정해야하는 부분 */}

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
