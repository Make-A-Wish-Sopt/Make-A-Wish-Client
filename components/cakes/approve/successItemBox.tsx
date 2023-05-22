import { postPayApprove } from '@/api/cakes/postPayApprove';
import InputLargeBox from '@/components/common/input/inputLargeBox';
import { QUERY_KEY } from '@/constant/queryKey';
import { CakesDataType } from '@/types/cakes/cakesDataType';
import Image from 'next/image';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import TestImage from '../../../public/assets/testImage.jpeg';
import theme from '@/styles/theme';
import styled from 'styled-components';

interface SuccessItemBoxProps {
  cakesData: CakesDataType | undefined;
}

export default function SuccessItemBox(props: SuccessItemBoxProps) {
  const { cakesData } = props;

  useEffect(() => {
    cakesData?.pgToken && mutate();
  }, [cakesData?.pgToken]);

  const { data, mutate } = useMutation(
    QUERY_KEY.payReady,
    () => postPayApprove(cakesData?.pgToken, cakesData),
    {},
  );

  return (
    <>
      {cakesData?.selectedCake.cakeNumber === 1 ? (
        <Styled.Box>
          <InputLargeBox bgColor={theme.colors.pastel_blue}>
            <Styled.HintWrapper>
              ~선물 초성힌트~
              {/* <Styled.HintText>{data?.hint1}</Styled.HintText> */}
              <Styled.HintText>ㅇㅍㅇㅊ</Styled.HintText>
            </Styled.HintWrapper>
          </InputLargeBox>
          <Styled.WishText>사실 내가 갖고 싶었던 건...비밀이야❤</Styled.WishText>
        </Styled.Box>
      ) : (
        <Styled.Box>
          <InputLargeBox bgColor={theme.colors.white}>
            <Image src={TestImage} width={100} height={100} alt="실제 선물 이미지" />
          </InputLargeBox>
          <Styled.WishText>사실 내가 갖고 싶었던 건...이거야❤</Styled.WishText>
        </Styled.Box>
      )}
    </>
  );
}

const Styled = {
  Box: styled.section`
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
