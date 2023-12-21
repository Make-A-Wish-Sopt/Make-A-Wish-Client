import useModal from '@/hooks/common/useModal';
import Modal from '.';
import BankModal from './BankModal';
import styled from 'styled-components';
import Button from '../button';
import { UseFormReturn } from 'react-hook-form';
import Input from '../input/input';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { ArrowDownIc } from '@/public/assets/icons';
import Image from 'next/image';
import { StyledBox } from '../box';
import theme from '@/styles/theme';
import AlertTextBox from '../alertTextBox';

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
        <Input placeholder="은행 선택" register={methods.register('bank')} readOnly>
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
};
