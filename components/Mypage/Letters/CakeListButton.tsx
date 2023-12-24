import theme from '@/styles/theme';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

interface CakeListButtonProps {
  image?: string | StaticImageData;
  backgroundColor: string;
  fontColor: string;
  fonts: string;
  handleClick?: () => void;
  cakeName?: string;
  cakeNum?: number;
}

export default function CakeListButton(props: CakeListButtonProps) {
  const { image, backgroundColor, fonts, fontColor, handleClick, cakeName, cakeNum } = props;
  return (
    <Styled.Container backgroundColor={backgroundColor} onClick={handleClick}>
      {image && <Image src={image} alt="케이크 이미지" width={35} height={35} />}

      <Styled.TextContainer fonts={fonts} fontColor={fontColor}>
        {cakeName} X <Styled.NumText> {cakeNum}개</Styled.NumText>
      </Styled.TextContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.button<{ backgroundColor: string }>`
    width: 100%;
    height: 6rem;

    display: flex;
    justify-content: left;
    align-items: center;

    padding: 0 2rem 0;
    border-radius: 1rem;

    color: ${theme.colors.gray4};
    background-color: ${(props) => props.backgroundColor};
    border-color: transparent;
    margin: 0 0 1rem;
  `,

  TextContainer: styled.div<{ fonts: string; fontColor: string }>`
    width: 30rem;
    padding: 0.2rem 0.5rem 0 1rem;
    ${theme.fonts.button18}
  `,

  NumText: styled.span`
    color: ${theme.colors.main_blue};
  `,
};
