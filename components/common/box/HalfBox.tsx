import styled from 'styled-components';

interface InputLargeBoxProps {
  bgColor?: string;
  fontColor?: string;
  font?: string;
  borderColor?: string;
  children: React.ReactNode;
}

export default function HalfBox(props: InputLargeBoxProps) {
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
    display: flex;
    align-items: center;

    width: 16rem;
    height: 5rem;

    padding: 1rem 1rem 1rem 1.2rem;

    border-radius: 1rem;
    border: 0.1rem solid ${(props) => props.borderColor};

    ${(props) => props.font};
    color: ${(props) => props.fontColor};
    background-color: ${(props) => props.bgColor};
  `,
};
