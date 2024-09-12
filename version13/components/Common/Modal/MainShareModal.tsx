import theme from '@/styles/theme';
import styled from 'styled-components';
import ShareContent from './ShareContent';
import { useGetMainProgressData, useGetWishesProgress } from '@/hooks/queries/wishes';
import Image from 'next/image';
import { MainCakeImg, MainWishChatImg } from '@/public/assets/images';
import { CloseWhiteIc } from '@/public/assets/icons';
import { convertMoneyText } from '@/utils/common/convertMoneyText';

interface MainShareModalProps {
  handleToggle: () => void;
}

export default function MainShareModal(props: MainShareModalProps) {
  const { handleToggle } = props;
  const { wishesProgressData } = useGetWishesProgress();
  const { progressData } = useGetMainProgressData();

  return (
    <>
      <Styled.ButtonContainer onClick={handleToggle}>
        <Image src={CloseWhiteIc} alt="닫기" />
      </Styled.ButtonContainer>

      <Styled.Container>
        <Styled.Title>{wishesProgressData?.title}</Styled.Title>
        <Image src={MainWishChatImg} alt="말풍선" />
        <Image src={MainCakeImg} alt="메인 케이크 이미지" width={219} />
        <Styled.PriceTextWrapper>
          {'예상 케이크 금액\n'}
          <Styled.PriceText>{`총 ${convertMoneyText(
            progressData?.price.toString() || '0',
          )}원`}</Styled.PriceText>
        </Styled.PriceTextWrapper>

        <Styled.DivisionLine />
        <Styled.LogoText>{'조물주보다\n생일선물주'}</Styled.LogoText>
        <ShareContent />
      </Styled.Container>
    </>
  );
}

const Styled = {
  ButtonContainer: styled.div`
    display: flex;
    flex-direction: row-reverse;

    position: relative;
    margin: 2.3rem 0rem 2.9rem;
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 31.6rem;

    background-color: ${theme.colors.pastel_blue};

    border-radius: 1.6rem;
  `,

  IconContainer: styled.div`
    position: absolute;
    top: 20%;
    right: 5%;
    transform: translate(-50%, -50%);
  `,

  DivisionLine: styled.hr`
    width: 31.2rem;
    height: 0.1rem;
    border-top: 0.3rem dashed ${theme.colors.main_blue};

    margin: 2.2rem 0 2.7rem;
  `,

  Title: styled.h2`
    ${theme.fonts.headline20};
    color: ${theme.colors.main_blue};

    margin: 3rem 0 1.6rem;
  `,

  PriceTextWrapper: styled.div`
    ${theme.fonts.headline24_130};
    color: ${theme.colors.main_blue};

    white-space: pre-line;
    text-align: center;

    margin-top: -0.4rem;
  `,
  PriceText: styled.span`
    color: ${theme.colors.black};
  `,

  LogoText: styled.span`
    ${theme.fonts.headline20};
    color: ${theme.colors.main_blue};

    line-height: 100%;

    white-space: pre-line;
    text-align: center;
  `,
};
