import InputContainer from '@/components/common/input/inputContainer';
import TextareaBox from '@/components/common/input/textareaBox';
import Image from 'next/image';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Button from '@/components/common/button';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/modal/modal';
import TermsModal from '@/components/common/modal/TermsModal';
import useModal from '@/hooks/common/useModal';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import { convertDateToString } from '@/utils/common/getDate';
import { useRecoilValue } from 'recoil';
import { WishesData } from '@/recoil/formPage/wishesData';
import Input from '@/components/common/input/input';
import { UseFormReturn } from 'react-hook-form';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import ImageBox from '@/components/common/box/imageBox';

interface PreviewProps {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  handleNextStep: () => void;
}

export default function Preview(props: PreviewProps) {
  const { methods, handleNextStep } = props;

  const wishesData = useRecoilValue(WishesData);
  const { isOpen, handleToggle } = useModal();
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    isAgreed && handleNextStep();
  }, [isAgreed]);

  const changeIsAgreed = (isChecked: boolean) => {
    setIsAgreed(isChecked);
  };

  return (
    <Styled.Container>
      <div>
        <Styled.Period>
          {convertDateToString(wishesData.startDate)}~{convertDateToString(wishesData.endDate)}
        </Styled.Period>

        <InputContainer title={wishesData.title}>
          <ImageBox boxType="imageBox--image" colorSystem="white_mainBlue">
            <Image
              src={wishesData.imageURL}
              fill={true}
              alt="선물이미지 미리보기"
              style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
            />
          </ImageBox>

          <Styled.PresentPrice>
            가격 : {convertMoneyText(String(wishesData.price))}
          </Styled.PresentPrice>
        </InputContainer>

        <InputContainer title="">
          <TextareaBox register={methods.register('hint')} readOnly />
        </InputContainer>

        <InputContainer title="선물의 초성">
          <Input register={methods.register('initial')} readOnly />
        </InputContainer>

        <Modal isOpen={isOpen} handleToggle={handleToggle}>
          <TermsModal handleToggle={handleToggle} changeIsAgreed={changeIsAgreed} />
        </Modal>
      </div>

      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={handleToggle}>
          링크 생성하기
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
  `,

  Period: styled.p`
    ${theme.fonts.body16};
    color: ${theme.colors.main_blue};
    margin: 0 0 1rem;
  `,

  PresentPrice: styled.p`
    ${theme.fonts.button18};
    color: ${theme.colors.main_blue};
    text-align: center;

    margin-top: 1rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
