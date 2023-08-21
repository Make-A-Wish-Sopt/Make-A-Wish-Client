import theme from '@/styles/theme';
import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';


interface CakeListButtonProps {
  image: string;
  children: React.ReactNode;
  backgroundColor: string;
  fontColor: string;
  handleClick?: () => void;
}

export default function CakeListButton(props: CakeListButtonProps) {
  const { image, children, backgroundColor, fontColor, handleClick } = props;
  return (
    <Container backgroundColor={backgroundColor} fontColor={fontColor} onClick={handleClick}>
      {image && (
        <Image src={image} alt="케이크 이미지" width={35} height={35} />
      )}
      <Styled.TextContainer>{children}</Styled.TextContainer>
    </Container>
  );
}

const Container = styled.button<{ backgroundColor: string; fontColor: string }>`
  width: 100%;
  height: 6rem;

  display: flex;
  justify-content: left;
  align-items: center;

  padding: 0 2rem 0;
  border-radius: 1rem;

  color: ${(props) => props.fontColor};
  ${theme.fonts.button16};
  background-color: ${(props) => props.backgroundColor};
  border-color: transparent;
  margin: 0 0 1rem;
`;

const Styled = {
  DaysText: styled.span`
  ${theme.fonts.headline20};
  color: ${theme.colors.main_blue};
  `,

  TextContainer: styled.div`
  padding: 0.2rem 0.5rem 0 1rem;
  `
};