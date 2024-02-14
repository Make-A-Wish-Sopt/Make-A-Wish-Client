import TextareaBox from '../Common/Input/TextareaBox';
import styled from 'styled-components';
import { LIMIT_TEXT } from '@/constant/limitText';
import SelectCakes from './SelectCakes';
import Button from '../Common/Button';
import Input from '../Common/Input/Input';
import { UseFormReturn } from 'react-hook-form';
import InputContainer from '../Common/Input/InputContainer';
import { CakesDataInputType } from '@/types/common/input/cakesInput';
import { StyledBox } from '../Common/Box';
import BackBtn from '../Common/Button/BackBtn';
import { CakeListType } from '@/types/cakes/cakeListType';
import { useGetPublicWishes } from '@/hooks/queries/public';
import { UseMutateFunction } from 'react-query';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';

interface CakesFormProps {
  methods: UseFormReturn<CakesDataInputType, any, undefined>;
  selectedCake: CakeListType;
  selectedIndex: number;
  selectCake: (index: number) => void;
  wishesId: string | string[] | undefined;
  handleNextStep: () => void;
}

export default function CakesForm(props: CakesFormProps) {
  const { methods, selectedCake, selectedIndex, selectCake, wishesId, handleNextStep } = props;

  const { publicWishesData } = useGetPublicWishes(wishesId);
  const [btnState, setBtnState] = useState(false);

  const handleClickFn = () => {
    if (!btnState) return;
    handleNextStep();
  };

  useEffect(() => {
    if (
      methods.watch('letter') !== '' &&
      methods.watch('letter').length <= 300 &&
      methods.watch('giverName')
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [methods.watch()]);

  return (
    <Styled.SectionContainer>
      <Styled.HeaderWrapper>
        <BackBtn />
        <span>{`D-${publicWishesData?.dayCount}`}</span>
      </Styled.HeaderWrapper>

      <Styled.Title>{publicWishesData?.title}</Styled.Title>

      <InputContainer title={`${publicWishesData?.name}님이 남긴 선물에 대한 힌트`}>
        <Styled.HintBox className={'pastelBlue_darkBlue'}>{publicWishesData?.hint}</Styled.HintBox>
      </InputContainer>

      <InputContainer title={'본인의 실명 작성하기'}>
        <Input
          placeholder="이름을 정확하게 작성해주세요. ex. 홍길동"
          register={methods.register('giverName')}
        />
      </InputContainer>

      <SelectCakes
        selectedCake={selectedCake}
        selectedIndex={selectedIndex}
        selectCake={selectCake}
      />

      <InputContainer title={'친구에게 편지 남기기'}>
        <TextareaBox
          placeholder={`ex. 너 도대체 원하는 게 모야?\n나 넘 궁금해. 일단 몸보신 한우 케이크 보태겠어`}
          inputLength={methods.watch('letter').length}
          limitLength={LIMIT_TEXT.DESCRIPTION}
          register={methods.register('letter')}
        ></TextareaBox>
      </InputContainer>

      <Styled.ButtonWrapper>
        <Button
          boxType="large"
          colorSystem={btnState ? 'mainBlue_white' : 'gray1_gray2'}
          handleClickFn={handleClickFn}
          gaTagId={selectedCake.name}
        >
          {'케이크 주문하기'}
        </Button>
      </Styled.ButtonWrapper>
    </Styled.SectionContainer>
  );
}

const Styled = {
  SectionContainer: styled.section`
    width: 100%;
    height: 100%;
  `,

  HeaderWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    color: ${theme.colors.main_blue};
    ${theme.fonts.headline20};
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};
    margin: 2.4rem 0 3rem;
  `,

  HintBox: styled(StyledBox)`
    width: 100%;
    min-height: 12.6rem;
    max-height: 16rem;

    overflow: scroll;

    ${theme.fonts.body14};

    padding: 1.2rem 1rem 1.2rem 1.2rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
