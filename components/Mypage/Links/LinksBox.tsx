import theme from '@/styles/theme';
import styled from 'styled-components';

interface LinksBoxProps {
  title: string;
  date: string;
  handleCheckbox: () => void;
  isChecked?: boolean;
  handleMovePage: () => void;
}

export default function LinksBox(props: LinksBoxProps) {
  const { title, date, handleCheckbox, isChecked, handleMovePage } = props;


  return (
    <Styled.Container >
      <Styled.Checkbox checked={isChecked} onChange={handleCheckbox} />
      <Styled.TextContainer>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Date>{date}</Styled.Date>
      </Styled.TextContainer>

      <Styled.ButtonContainer onClick={handleMovePage}>
        {'>'}
      </Styled.ButtonContainer>

    </Styled.Container>
  );
}

const Styled = {
  Container: styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0rem 1.5rem;
  border-radius: 1rem;
  background-color: ${theme.colors.pastel_blue};
  margin: 0 0 1rem;
`,

  TextContainer: styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 1rem;
  `,

  Title: styled.div`
  margin: 0 0 0.5rem;
  ${theme.fonts.button16_2};
  color: ${theme.colors.main_blue};
`,

  Date: styled.div`
  ${theme.fonts.body12_2};
  color: ${theme.colors.main_blue};
`,

  ButtonContainer: styled.button`
    margin-left: auto;
    color: ${theme.colors.main_blue};
    ${theme.fonts.button16_2};
`,

  Checkbox: styled.input.attrs({ type: 'checkbox' })`
  width: 1.7rem;
  height: 1.7rem;
  border: 0.4px solid ${theme.colors.main_blue};
  border-radius: 20%;
  background-color: ${theme.colors.white};
  cursor: pointer;
  &:checked {
  background-image: url('/assets/icons/checkIc.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${theme.colors.main_blue};
}
appearance: none;
`,

};