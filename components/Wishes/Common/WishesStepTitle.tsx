import { WishesFormPresentIc } from '@/public/assets/icons';
import theme from '@/styles/theme';
import Image from 'next/image';
import styled from 'styled-components';

interface WishesStepTitleProps {
  title: string;
}

export default function WishesStepTitle(props: WishesStepTitleProps) {
  const { title } = props;
  return (
    <Styled.TitleWrapper>
      <Image src={WishesFormPresentIc} alt="선물 이미지" />
      <Styled.Title>{title}</Styled.Title>,
    </Styled.TitleWrapper>
  );
}

const Styled = {
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
