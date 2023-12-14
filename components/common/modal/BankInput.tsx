import useModal from '@/hooks/common/useModal';
import Modal from './modal';
import BankModal from './BankModal';
import styled, { CSSProperties } from 'styled-components';
import { ChangeEvent } from 'react';
import Button from '../button';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import Input from '../input/input';
import { WishesDataInputType } from '@/types/common/input';
import { ArrowDownIc } from '@/public/assets/icons';
import Image from 'next/image';
import Box from '../box';

interface BankInputProps {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
}

export default function BankInput(props: BankInputProps) {
  const { methods } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <Styled.Container>
      <Box boxStyled={BoxStyled} colorSystem="lightRed_warningRed">
        ※ 4회 이상 틀리면, 서비스 이용이 제한됩니다
      </Box>

      <Styled.ItemWrapper>
        <Input placeholder="예금주명" />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper onClick={handleToggle}>
        <Input placeholder="은행 선택" register={methods.register('name')} readOnly>
          <Image src={ArrowDownIc} alt="더 보기" />
        </Input>
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <Styled.InputWrapper>
          <Input
            width="calc(100% - 10.6rem)"
            boxType="inputBox--custom"
            placeholder="계좌번호를 입력해주세요"
            register={methods.register('account')}
          />
          <Button width={10.6} boxType="btn--custom" colorSystem="mainBlue_white">
            {'계좌번호 확인'}
          </Button>
        </Styled.InputWrapper>
      </Styled.ItemWrapper>
      {/* 기능구현 이후 수정해야하는 부분 */}

      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <BankModal handleToggle={handleToggle} reister={methods.register('bankName')} />
        </Modal>
      )}
    </Styled.Container>
  );
}

const BoxStyled: CSSProperties = {
  width: '100%',
  height: '4.4rem',
  padding: '1.2rem',

  fontSize: '14px',
  fontFamily: 'Galmuri11',
  lineHeight: '140%',
};

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

    gap: 0.6rem;

    width: 100%;
  `,
};
