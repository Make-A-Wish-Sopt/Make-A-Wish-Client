import Image from 'next/image';
import styled from 'styled-components';
import VerticalProgressBar from '../common/verticalProgressBar';
import { MainCakeImg, MainChatImg, MainEndChatImg, MainWishChatImg } from '@/public/assets/images';
import theme from '@/styles/theme';
import { useGetMainProgressData } from '@/hooks/queries/wishes';

export default function MainCenterContent() {
  const { progressData } = useGetMainProgressData();

  const ChatImg = () => {
    if (!progressData) {
      return MainChatImg;
    }

    if (progressData?.status === 'BEFORE' || progressData?.status === 'WHILE') {
      return MainWishChatImg;
    }

    if (progressData?.status === 'END') {
      return MainEndChatImg;
    }
  };

  return (
    <Styled.Container>
      <Styled.CenterContentWrapper>
        <Styled.ImageWrapper>
          <Image src={ChatImg()} alt="말풍선" />
          <Styled.CakeImageWrapper>
            <Image src={MainCakeImg} alt="메인 케이크 이미지" width={219} />
          </Styled.CakeImageWrapper>
        </Styled.ImageWrapper>
        <Styled.ProgressBarWrapper>
          <VerticalProgressBar percent={progressData?.percent || 0} />
        </Styled.ProgressBarWrapper>
      </Styled.CenterContentWrapper>
      <Styled.CakeTextWrapper>
        {progressData === undefined || progressData.status === 'BEFORE' ? (
          <>
            {'모인 케이크\n'}
            <Styled.CakeText>총 ???개</Styled.CakeText>
          </>
        ) : (
          <>
            {'예상 케이크 금액 >\n'}
            <Styled.CakeText>{`총 ${progressData.price}원`}</Styled.CakeText>
          </>
        )}
      </Styled.CakeTextWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  ImageWrapper: styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
  `,

  CakeImageWrapper: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -1rem;
    margin-left: 2rem;
  `,

  CenterContentWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    margin-top: 10rem;
    padding-right: 2.2rem;
  `,

  CakeTextWrapper: styled.div`
    text-align: center;

    ${theme.fonts.headline24_130};
    color: ${theme.colors.main_blue};

    margin-top: -5.8rem;

    white-space: pre-line;
  `,

  CakeText: styled.span`
    color: ${theme.colors.black};
  `,

  ProgressBarWrapper: styled.div`
    display: flex;

    margin-top: 3.4rem;
  `,
};
