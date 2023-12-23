import InputContainer from '@/components/Common/Input/InputContainer';
import TextareaBox from '@/components/Common/Input/TextareaBox';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { convertMoneyText } from '@/utils/common/convertMoneyText';
import { convertDateToString } from '@/utils/common/getDate';
import Input from '@/components/Common/Input/Input';
import { UseFormReturn } from 'react-hook-form';
import { WishesDataInputType } from '@/types/wishesType';
import ItemImageBox from '@/components/Common/Box/ItemImageBox';
import WishesStepTitle from '../Common/WishesStepTitle';
import WishesStepBtn from '../Common/WishesStepBtn';
import { ColorSystemType } from '@/types/common/box/boxStyleType';
import { useEffect } from 'react';
import { usePostWishes } from '@/hooks/queries/wishes';

interface PreviewProps {
  methods: UseFormReturn<WishesDataInputType, any, undefined>;
  wishesStep: {
    stepIndex: number;
    prevState: boolean;
    nextState: boolean;
    changePrevState: (state: boolean) => void;
    changeNextState: (state: boolean) => void;
    handleNextStep: () => void;
    handlePrevStep: () => void;
    getNextBtnColor: (state: boolean) => ColorSystemType;
    getPrevBtnColor: (state: boolean) => ColorSystemType;
  };
}

export default function Preview(props: PreviewProps) {
  const { methods, wishesStep } = props;

  const { postWishesData } = usePostWishes(methods);

  useEffect(() => {
    wishesStep.changeNextState(true);
  }, []);

  return (
    <>
      <WishesStepTitle title="소원링크 화면 미리보기" />
      <Styled.Container>
        <div>
          <Styled.Period>
            {convertDateToString(methods.getValues('startDate'))}~
            {convertDateToString(methods.getValues('endDate'))}
          </Styled.Period>

          <InputContainer title={methods.getValues('title')}>
            <ItemImageBox src={methods.getValues('imageUrl')} alt="선물이미지 미리보기" />
            <Styled.PresentPrice>
              가격 : {convertMoneyText(methods.getValues('price').toString())}원
            </Styled.PresentPrice>
          </InputContainer>

          <InputContainer>
            <TextareaBox register={methods.register('hint')} readOnly />
          </InputContainer>

          <InputContainer title="선물의 초성">
            <Input register={methods.register('initial')} readOnly />
          </InputContainer>
        </div>

        <WishesStepBtn
          wishesStep={wishesStep}
          handleClickFn={() => {
            postWishesData();
          }}
        />
      </Styled.Container>
    </>
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
