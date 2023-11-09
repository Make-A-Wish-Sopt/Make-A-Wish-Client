import PresentBox from '@/components/common/box/PresentBox';
import theme from '@/styles/theme';
import Image from 'next/image';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface ItemImageBoxProps {
  imageURL: string;
  children?: ReactNode;
}

export default function ItemImageBox(props: ItemImageBoxProps) {
  const { imageURL, children } = props;

  return (
    <Styled.PresentWrapper>
      <PresentBox>
        <Styled.ImageWrapper>
          <Image
            src={imageURL}
            fill={true}
            alt="선물"
            style={{ borderRadius: '1.6rem', objectFit: 'cover' }}
          />
        </Styled.ImageWrapper>
      </PresentBox>
      <Styled.PresentPrice>{children}</Styled.PresentPrice>
    </Styled.PresentWrapper>
  );
}

const Styled = {
  PresentWrapper: styled.div`
    margin-top: 1.2rem;
  `,

  ImageWrapper: styled.div`
    position: relative;

    width: 100%;
    height: 100%;

    object-fit: fill;
  `,

  PresentPrice: styled.div`
    ${theme.fonts.button16};
    color: ${theme.colors.main_blue};
    text-align: center;

    margin-top: 1rem;
  `,
};
