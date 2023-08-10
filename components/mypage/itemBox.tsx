import theme from '@/styles/theme';
import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemBoxProps {
  children: ReactNode;
  handleClick: () => void;
  backgroundColor?: string;
  color?: string;
}

export default function ItemBox(props: ItemBoxProps) {
  const { children, handleClick, backgroundColor, color } = props;

  return (
    <Styled.Container onClick={handleClick} backgroundColor={backgroundColor} color={color}>
      {children}
      <Styled.ButtonContainer color={color}>
        {'>'}
      </Styled.ButtonContainer>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.button<ItemBoxProps>`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0rem 1.5rem;
  border-radius: 1rem;
  margin: 0 0 1rem;
  ${theme.fonts.button16_2};
  background-color: ${(props) => props.backgroundColor || theme.colors.pastel_blue};
  color: ${(props) => props.color || theme.colors.main_blue};
`,

  ButtonContainer: styled.div<ItemBoxProps>`
    margin-left: auto;
    color: ${(props) => props.color || theme.colors.main_blue};
`,

};