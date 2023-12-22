import TextareaBox from '../Common/input/textareaBox';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { LIMIT_TEXT } from '@/constant/limitText';
import SelectCakes from './SelectCakes';
import Button from '../Common/button';
import Input from '../Common/input/input';
import { UseFormReturn } from 'react-hook-form';
import InputContainer from '../Common/input/inputContainer';
import { CakesDataInputType } from '@/types/common/input/cakesInput';
import { StyledBox } from '../Common/box';
import BackBtn from '../Common/button/backBtn';
import { CakeListType } from '@/types/cakes/cakeListType';
import { useGetPublicWishes } from '@/hooks/queries/public';
import { UseMutateFunction } from 'react-query';

interface CakesFormProps {
  methods: UseFormReturn<CakesDataInputType, any, undefined>;
  selectedCake: CakeListType;
  selectedIndex: number;
  selectCake: (index: number) => void;
  wishesId: string | string[] | undefined;
  postPublicCakesData: UseMutateFunction<
    {
      cakeId: number;
      imageUrl: string;
      hint: string;
      initial: string;
      contribute: string;
      wisher: string;
    },
    unknown,
    void,
    unknown
  >;
}

export default function CakesForm(props: CakesFormProps) {
  const { methods, selectedCake, selectedIndex, selectCake, wishesId, postPublicCakesData } = props;

  const { publicWishesData } = useGetPublicWishes(wishesId);

  const handleClickFn = () => {
    postPublicCakesData();
  };

  return (
    <>
      <Styled.HeaderWrapper>
        <BackBtn />
        {`D-${publicWishesData?.dayCount}`}
      </Styled.HeaderWrapper>

      <Styled.Title>{publicWishesData?.title}</Styled.Title>

      <InputContainer title={`${publicWishesData?.name}님이 남긴 선물에 대한 힌트`}>
        <Styled.HintBox className={'pastelBlue_darkBlue'}>{publicWishesData?.hint}</Styled.HintBox>
        {/* <TextareaBox value={publicWishesData?.hint} readOnly /> */}
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
        <Button boxType="large" colorSystem="mainBlue_white" handleClickFn={handleClickFn}>
          {'케이크 주문하기'}
        </Button>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
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
    height: 12.6rem;

    ${theme.fonts.body14};

    padding: 1.2rem 1rem 1.2rem 1.2rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
