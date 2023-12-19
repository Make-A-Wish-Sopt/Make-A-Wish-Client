import WishesStep1 from './WishesStep1';
import styled from 'styled-components';
import theme from '@/styles/theme';
import useWishesStep from '@/hooks/wishes/useWisehsStep';
import WishesStep2 from './WisehsStep2';
import Preview from './Preview';
import BankInfo from './BankInfo';

import { useForm } from 'react-hook-form';
import { WishesDataInputType } from '@/types/common/input/wishesInput';
import { getDate } from '@/utils/common/getDate';

export default function WishesFormContainer() {
  const wishesStep = { ...useWishesStep() };

  const methods = useForm<WishesDataInputType>({
    defaultValues: {
      linkURL: '',
      imageURL: '',
      price: '',
      initial: '',
      title: '',
      hint: '',
      startDate: new Date(),
      endDate: getDate(new Date(), 7),
    },
  });

  return (
    <Styled.Container>
      {
        {
          1: <WishesStep1 methods={methods} wishesStep={wishesStep} />,
          2: <WishesStep2 methods={methods} wishesStep={wishesStep} />,
          3: <Preview methods={methods} wishesStep={wishesStep} />,
          4: <BankInfo wishesStep={wishesStep} />,
        }[wishesStep.stepIndex]
      }
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
  `,

  Title: styled.h1`
    ${theme.fonts.headline24_100};
    color: ${theme.colors.main_blue};

    margin-left: 1rem;
  `,

  TitleWrapper: styled.div`
    display: flex;

    height: 2.4rem;

    margin: 2.4rem 0 2rem;
  `,
};
