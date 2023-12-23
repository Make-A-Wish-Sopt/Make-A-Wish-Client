import useModal from '@/hooks/common/useModal';
import Modal from '.';
import BankModal from './BankModal';
import styled from 'styled-components';

import { UseFormReturn } from 'react-hook-form';

import { WishesDataInputType } from '@/types/wishesType';
import { ArrowDownIc } from '@/public/assets/icons';
import Image from 'next/image';

import theme from '@/styles/theme';
import Input from '../Input/Input';
import { StyledBtnBox } from '../Button';
import { StyledBox } from '../Box';
import AlertTextBox from '../AlertTextBox';
import { validation } from '@/validation/input';

interface BankInputProps {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
}

export default function BankInput(props: BankInputProps) {
  const { methods } = props;
  const { isOpen, handleToggle } = useModal();

  return (
    <Styled.Container>
      <Styled.GuideBox className={'lightRed_warningRed'}>
        ※ 4회 이상 틀리면, 서비스 이용이 제한됩니다
      </Styled.GuideBox>

      <Styled.ItemWrapper>
        <Input placeholder="예금주명" register={methods.register('name')} />
      </Styled.ItemWrapper>

      <Styled.ItemWrapper onClick={handleToggle}>
        <Input
          boxType="inputBox--large"
          placeholder="은행 선택"
          register={methods.register('bank')}
          readOnly
        >
          <Image src={ArrowDownIc} alt="더 보기" />
        </Input>
      </Styled.ItemWrapper>

      <Styled.ItemWrapper>
        <Styled.InputWrapper>
          <Input
            width="calc(100% - 10.6rem)"
            inputType="number"
            placeholder="계좌번호를 입력해주세요"
            register={methods.register('account')}
          />
          <Styled.AccountAuthButton className="mainBlue_white">
            {'계좌번호 확인'}
          </Styled.AccountAuthButton>
        </Styled.InputWrapper>
        {validation.isIncludeHyphen(methods.watch('account')) && (
          <AlertTextBox>{'(-)없이 숫자만 입력해주세요'}</AlertTextBox>
        )}

        {/* 조건 기능 추가  */}
        {/* {<AlertTextBox>{true ? '정상 계좌입니다' : '존재하지 않는 계좌번호입니다'}</AlertTextBox>} */}
      </Styled.ItemWrapper>

      {isOpen && (
        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <BankModal handleToggle={handleToggle} methods={methods} />
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

    gap: 0.6rem;

    width: 100%;
  `,

  GuideBox: styled(StyledBox)`
    width: 100%;
    height: 4.4rem;

    padding: 1.2rem;

    ${theme.fonts.body14};
    line-height: 140%;
  `,

  AccountAuthButton: styled(StyledBtnBox)`
    width: 10.6rem;

    ${theme.fonts.body14};
  `,
};
