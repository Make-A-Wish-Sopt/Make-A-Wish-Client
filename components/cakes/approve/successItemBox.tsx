import { useEffect } from 'react';
import theme from '@/styles/theme';
import styled from 'styled-components';
import Contribution from './contribution';
import { useRecoilValue } from 'recoil';
import { CakesData } from '@/recoil/cakes/cakesData';

import ImageBox from '@/components/common/box/imageBox';
import ItemImageBox from '@/components/common/box/itemImageBox';

export default function SuccessItemBox() {
  const cakesData = useRecoilValue(CakesData);

  useEffect(() => {
    // if (cakesData.selectedCake.cakeNumber === 1 || cakesData.pgToken !== '') {
    // }
  }, [cakesData]);

  return (
    <>
      {cakesData?.selectedCake.cakeNumber === 1 ? (
        <Styled.Container>
          <ImageBox boxType="imageBox--image">
            <Styled.HintWrapper>
              ~선물 초성힌트~
              <Styled.HintText>{data?.initial}</Styled.HintText>
            </Styled.HintWrapper>
          </ImageBox>
          <Styled.WishText>사실 내가 갖고 싶었던 건...비밀이야❤</Styled.WishText>
        </Styled.Container>
      ) : (
        <Styled.Container>
          <ItemImageBox src={data?.imageUrl} alt="실제 선물 이미지" />
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
};
