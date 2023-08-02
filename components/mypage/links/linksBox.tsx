import theme from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowLinkIc } from '@/public/assets/icons';

interface LinksBoxProps {
  title: string;
  date: string;
  handleClick: () => void;
}

export default function LinksBox(props: LinksBoxProps) {
  const { title, date, handleClick } = props;

  const handleCheckbox = () => {
  };

  return (
    <Styled.Container onClick={handleClick}>
      <Styled.Checkbox onChange={handleCheckbox} />
      <Styled.TextContainer>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Date>{date}</Styled.Date>
      </Styled.TextContainer>

      <Styled.ButtonContainer>
        <Image src={ArrowLinkIc} alt="화살표" />
      </Styled.ButtonContainer>

    </Styled.Container>
  );
}

const Styled = {
  Container: styled.button`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0rem 1.5rem;
  border-radius: 1rem;
  background-color: ${theme.colors.pastel_blue};
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

  ButtonContainer: styled.div`
    margin-left: auto;
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