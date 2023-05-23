import theme from '@/styles/theme';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonBoxProps {
  children: ReactNode;
  backgroundColor: string;
  fontColor: string;
  onClick?: () => void;
}

export default function ButtonBox(props: ButtonBoxProps) {
  const { children, backgroundColor, fontColor, onClick } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container onClick={handleClick} backgroundColor={backgroundColor} fontColor={fontColor}>
      {children}
    </Container>
  );
}

const Container = styled.button<{ backgroundColor: string; fontColor: string }>`
  width: 100%;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  border-radius: 1rem;

  color: ${(props) => props.fontColor};
  ${theme.fonts.button16};
  background-color: ${(props) => props.backgroundColor};
  border-color: transparent;
`;
