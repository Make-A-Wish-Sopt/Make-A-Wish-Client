import theme from '@/styles/theme';
import styled from 'styled-components';

interface CakeListTextProps {
  cakeName: string;
  cakeNum: number;
  fonts: string;
}

export default function CakeListText(props: CakeListTextProps) {
  const { fonts, cakeName, cakeNum } = props;

  return (
    <Styled.Container fonts={fonts}>
      {cakeName} X <Styled.NumText> {cakeNum}개</Styled.NumText>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.span<{ fonts: string }>`
  ${(props) => props.fonts}
  `,

  NumText: styled.span`
  color: ${theme.colors.main_blue};
  `
};
