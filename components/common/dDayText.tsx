import theme from '@/styles/theme';
import styled from 'styled-components';

interface DdayTextProps {
  days: number | string;
}

export default function DdayText(props: DdayTextProps) {
  const { days } = props;

  return (
    <Styled.DaysText>D-{days}</Styled.DaysText>
  );
}

const Styled = {
  DaysText: styled.span`
  ${theme.fonts.headline20};
  color: ${theme.colors.main_blue};
  `
};
