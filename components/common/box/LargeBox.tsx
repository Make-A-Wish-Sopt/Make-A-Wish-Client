import theme from '@/styles/theme';
import styled from 'styled-components';

interface InputLargeBoxProps {
  bgColor?: string;
  fontColor?: string;
  font?: string;
  borderColor?: string;
  children: React.ReactNode;
  borderRadius?: string;
}

export default function LargeBox(props: InputLargeBoxProps) {
  const { bgColor, fontColor, font, borderColor, children } = props;

  return (
    <Styled.Container bgColor={bgColor} fontColor={fontColor} font={font} borderColor={borderColor}>
      {children}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div<{
    bgColor: string | undefined;
    fontColor: string | undefined;
    font: string | undefined;
    borderColor: string | undefined;
  }>`
    width: 33.1rem;
    height: 15rem;

    padding: 1.4rem 1.2rem;

    border: 0.1rem solid ${theme.colors.main_blue};
    border-radius: 1rem;

    ${(props) => props.font};
    color: ${(props) => props.fontColor};
    background-color: ${(props) => props.bgColor};
  `,
};
