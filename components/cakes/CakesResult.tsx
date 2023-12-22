import theme from '@/styles/theme';
import styled from 'styled-components';
import ImageBox from '@/components/common/box/imageBox';
import ItemImageBox from '@/components/common/box/itemImageBox';
import Contribution from './Result/contribution';
import { CakeListType } from '@/types/cakes/cakeListType';
import { useGetPublicWishes } from '@/hooks/queries/public';
import Image from 'next/image';
import Button from '../common/button';
import { StyledBox } from '../common/box';
import router from 'next/router';

interface CakesResultProps {
  cakesResultData:
    | {
        cakeId: number;
        imageUrl: string;
        hint: string;
        initial: string;
        contribute: string;
        wisher: string;
      }
    | undefined;
  selectedCake: CakeListType;
}

export default function CakesResult(props: CakesResultProps) {
  const { cakesResultData, selectedCake } = props;

  const handleMoveHome = () => {
    router.push('/');
  };

  return (
    <>
      <Styled.Container>
        <Styled.TextWrapper>
          <span>{cakesResultData?.wisher}님께</span>
          <Styled.ImageWrapper>
            <Image
              src={selectedCake.thanksImage.src}
              width={selectedCake.thanksImage.width}
              height={selectedCake.thanksImage.height}
              alt="케이크 감사 이미지"
            />
          </Styled.ImageWrapper>
          <Styled.CakeText>{selectedCake.name}</Styled.CakeText>
          <span>선물이 완료 되었어요!</span>
        </Styled.TextWrapper>
        {cakesResultData?.cakeId === 1 ? (
          <>
            <Styled.HintBox>
              <Styled.HintWrapper>
                ~선물 초성힌트~
                <Styled.HintText>{cakesResultData?.initial}</Styled.HintText>
              </Styled.HintWrapper>
            </Styled.HintBox>
            <Styled.WishText>사실 내가 갖고 싶었던 건...비밀이야❤</Styled.WishText>
          </>
        ) : (
          <>
            <ItemImageBox src={cakesResultData?.imageUrl} alt="실제 선물 이미지" />
            <Styled.WishText>사실 내가 갖고 싶었던 건...이거야❤</Styled.WishText>
          </>
        )}
        {cakesResultData && (
          <Contribution percent={Number(cakesResultData?.contribute)} vertical={false} />
        )}
      </Styled.Container>
      <Styled.ButtonWrapper>
        <Button boxType="btn--large" colorSystem="mainBlue_white" handleClickFn={handleMoveHome}>
          {'당신도 받고 싶은 선물이 있나요?'}
        </Button>
      </Styled.ButtonWrapper>
    </>
  );
}

const Styled = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 5rem;
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

    margin-top: 1.4rem;
  `,

  HintText: styled.div`
    ${theme.fonts.headline30};
    margin-top: 3.4rem;
  `,

  CakeText: styled.span`
    ${theme.fonts.headline30};
    color: ${theme.colors.main_blue};
  `,

  ImageWrapper: styled.div`
    margin: 1.3rem 0 2.1rem;
  `,

  TextWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${theme.fonts.headline30};

    margin-bottom: 3.6rem;
  `,

  ButtonWrapper: styled.div`
    padding-bottom: 4.6rem;
  `,

  HintBox: styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 16rem;

    border-radius: 1.6rem;

    border: 1px solid ${theme.colors.main_blue};
    background-color: ${theme.colors.pastel_blue};
  `,
};
