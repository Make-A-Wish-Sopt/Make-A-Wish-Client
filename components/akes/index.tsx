import useWishesStep from '@/hooks/wishes/useWisehsStep';
import CakesForm from './akesForm';
import styled from 'styled-components';
import theme from '@/styles/theme';
import CakesPay from './akesPay';
import { useForm } from 'react-hook-form';
import { CakesDataInputType } from '@/types/common/input/cakesInput';
import useSelectCakes from '@/hooks/cakes/useSelectCakes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CakesResult from './akesResult';
import { usePostPublicCakes } from '@/hooks/queries/public';

export default function CakesContainer() {
  const wishesStep = { ...useWishesStep() };
  const { selectedCake, selectedIndex, selectCake } = useSelectCakes();
  const [wishesId, setWishesId] = useState<string | string[] | undefined>('');

  const router = useRouter();

  const methods = useForm<CakesDataInputType>({
    defaultValues: {
      giverName: '',
      letter: '',
    },
  });

  const { postPublicCakesData, cakesResultData, isSuccess } = usePostPublicCakes({
    name: methods.getValues('giverName'),
    wishId: wishesId,
    cakeId: selectedCake.cakeNumber,
    message: methods.getValues('letter'),
  });

  useEffect(() => {
    isSuccess && wishesStep.handleNextStep();
  }, [isSuccess]);

  useEffect(() => {
    if (!router.isReady) return;
    setWishesId(router.query.id);
  }, [router.isReady]);

  return (
    <Styled.Container>
      {
        {
          1: (
            <CakesForm
              methods={methods}
              selectedCake={selectedCake}
              selectedIndex={selectedIndex}
              selectCake={selectCake}
              wishesId={wishesId}
              postPublicCakesData={postPublicCakesData}
            />
          ),
          2: (
            <CakesPay
              handlePrevStep={wishesStep.handlePrevStep}
              handleNextStep={wishesStep.handleNextStep}
              selectedCake={selectedCake}
              wishesId={wishesId}
            />
          ),
          3: <CakesResult cakesResultData={cakesResultData} selectedCake={selectedCake} />,
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

    height: 100svh;
  `,

  Header: styled.header`
    display: flex;
    justify-content: space-between;

    width: 100%;

    color: ${theme.colors.main_blue};
    ${theme.fonts.headline20};
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,
};
