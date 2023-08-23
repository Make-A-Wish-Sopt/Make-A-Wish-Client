import { requestPayApprove } from '@/api/cakes/requestPayApprove';
import InputLargeBox from '@/components/common/input/inputLargeBox';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import theme from '@/styles/theme';
import styled from 'styled-components';
import Contribution from '../contribution';
import { useRecoilValue } from 'recoil';
import { CakesData } from '@/recoil/cakes/cakesData';
import ItemImageBox from '@/components/wishes/wishesForm/itemImageBox';

export default function SuccessItemBox() {
  const cakesData = useRecoilValue(CakesData);

  useEffect(() => {
    console.log(cakesData);
    if (cakesData.selectedCake.cakeNumber === 1 || cakesData.pgToken !== '') {
      mutate();
    }
  }, [cakesData]);

  const { data, mutate, isSuccess } = useMutation(() => requestPayApprove(cakesData));

  return (
    <>
      {cakesData?.selectedCake.cakeNumber === 1 ? (
        <Styled.Container>
          <InputLargeBox bgColor={theme.colors.pastel_blue}>
            <Styled.HintWrapper>
              ~선물 초성힌트~
              <Styled.HintText>{data?.initial}</Styled.HintText>
            </Styled.HintWrapper>
          </InputLargeBox>
          <Styled.WishText>사실 내가 갖고 싶었던 건...비밀이야❤</Styled.WishText>
        </Styled.Container>
      ) : (
        <Styled.Container>
          <ItemImageBox imageURL={data?.imageUrl} />

          <Styled.WishText>사실 내가 갖고 싶었던 건...이거야❤</Styled.WishText>
        </Styled.Container>
      )}
      {isSuccess && <Contribution percent={Number(data.contribute)} vertical={false} />}
    </>
  );
}

const Styled = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  WishText: styled.div`
    color: ${theme.colors.main_blue};
    ${theme.fonts.body16};

    margin-top: 1.4rem;
  `,

  HintWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${theme.colors.main_blue};
    ${theme.fonts.body16};
  `,

  HintText: styled.div`
    ${theme.fonts.headline30};
    margin-top: 3.4rem;
  `,

  ImageWrapper: styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    object-fit: fill;
  `,
};
